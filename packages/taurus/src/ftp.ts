import net, { type Socket } from 'net';

// cspell:ignore EPSV RNDIS

export const TAURUS_FTP_PORT = 16602;

export interface TaurusFtpUploadOptions {
  host: string;
  password: string;
  remotePath: string;
  data: Uint8Array;
  port?: number;
  timeout?: number;
  username?: string;
  onProgress?: (sent: number, total: number) => void;
}

type FtpReply = { code: number; message: string };
type PendingReply = {
  resolve: (reply: FtpReply) => void;
  reject: (error: Error) => void;
};

class FtpReplyReader {
  readonly #queue: FtpReply[] = [];
  readonly #pending: PendingReply[] = [];
  #buffer = '';
  #multilineCode: number | undefined;
  #multiline: string[] = [];
  #error: Error | undefined;

  constructor(socket: Socket) {
    socket.on('data', (chunk) => this.#onData(chunk.toString('utf8')));
    socket.once('error', (error) => this.#fail(error));
    socket.once('close', () => this.#fail(new Error('Taurus FTP connection closed')));
  }

  read(): Promise<FtpReply> {
    const reply = this.#queue.shift();
    if (reply) return Promise.resolve(reply);
    if (this.#error) return Promise.reject(this.#error);
    return new Promise<FtpReply>((resolve, reject) => this.#pending.push({ resolve, reject }));
  }

  #onData(chunk: string): void {
    this.#buffer += chunk;
    const lines = this.#buffer.split(/\r?\n/);
    this.#buffer = lines.pop() ?? '';
    lines.forEach((line) => this.#onLine(line));
  }

  #onLine(line: string): void {
    if (this.#multilineCode !== undefined) {
      this.#multiline.push(line);
      if (line.startsWith(`${this.#multilineCode} `)) {
        this.#emit({ code: this.#multilineCode, message: this.#multiline.join('\n') });
        this.#multilineCode = undefined;
        this.#multiline = [];
      }
      return;
    }
    const match = /^(\d{3})([ -])(.*)$/.exec(line);
    if (!match) return;
    const code = Number(match[1]);
    if (match[2] === '-') {
      this.#multilineCode = code;
      this.#multiline = [line];
    } else {
      this.#emit({ code, message: line });
    }
  }

  #emit(reply: FtpReply): void {
    const pending = this.#pending.shift();
    if (pending) pending.resolve(reply);
    else this.#queue.push(reply);
  }

  #fail(error: Error): void {
    if (this.#error) return;
    this.#error = error;
    this.#pending.splice(0).forEach((pending) => pending.reject(error));
  }
}

const connect = (host: string, port: number, timeout: number): Promise<Socket> =>
  new Promise((resolve, reject) => {
    const socket = net.connect({ host, port });
    const fail = (error: Error): void => {
      socket.destroy();
      reject(error);
    };
    socket.setTimeout(timeout, () => fail(new Error(`Taurus FTP connection timed out`)));
    socket.once('error', fail);
    socket.once('connect', () => {
      socket.off('error', fail);
      resolve(socket);
    });
  });

const expectReply = (reply: FtpReply, codes: number[], operation: string): void => {
  if (!codes.includes(reply.code)) {
    throw new Error(`Taurus FTP ${operation} failed (${reply.code}): ${reply.message}`);
  }
};

const writeCommand = (socket: Socket, command: string): void => {
  socket.write(`${command}\r\n`);
};

const splitRemotePath = (remotePath: string): { directories: string[]; filename: string } => {
  const parts = remotePath.replaceAll('\\', '/').split('/').filter(Boolean);
  if (!parts.length || parts.some((part) => part === '.' || part === '..' || /[\r\n]/.test(part))) {
    throw new RangeError('Invalid Taurus FTP remote path');
  }
  const filename = parts.pop();
  if (!filename) throw new RangeError('Taurus FTP remote filename is required');
  return { directories: parts, filename };
};

/** Uploads a file through the FTP service exposed by Taurus over LAN or USB RNDIS. */
export const uploadTaurusFile = async (options: TaurusFtpUploadOptions): Promise<void> => {
  const {
    host,
    password,
    remotePath,
    data,
    port = TAURUS_FTP_PORT,
    timeout = 10_000,
    username = 'admin',
    onProgress,
  } = options;
  if (!password) throw new RangeError('Taurus FTP password is required');
  const { directories, filename } = splitRemotePath(remotePath);
  const socket = await connect(host, port, timeout);
  const replies = new FtpReplyReader(socket);
  const command = async (value: string): Promise<FtpReply> => {
    writeCommand(socket, value);
    return replies.read();
  };
  try {
    expectReply(await replies.read(), [220], 'greeting');
    const userReply = await command(`USER ${username}`);
    if (userReply.code === 331) expectReply(await command(`PASS ${password}`), [230], 'login');
    else expectReply(userReply, [230], 'login');
    expectReply(await command('TYPE I'), [200], 'binary mode');
    expectReply(await command('CWD /'), [250], 'root directory');
    for (const directory of directories) {
      const cwd = await command(`CWD ${directory}`);
      if (cwd.code !== 250) {
        expectReply(await command(`MKD ${directory}`), [257], `create directory ${directory}`);
        expectReply(await command(`CWD ${directory}`), [250], `open directory ${directory}`);
      }
    }
    const passive = await command('EPSV');
    expectReply(passive, [229], 'passive mode');
    const passiveMatch = /\(\|\|\|(\d+)\|\)/.exec(passive.message);
    if (!passiveMatch) throw new Error(`Invalid Taurus FTP passive response: ${passive.message}`);
    const dataSocket = await connect(host, Number(passiveMatch[1]), timeout);
    const stored = await command(`STOR ${filename}`);
    expectReply(stored, [125, 150], 'upload start');
    onProgress?.(0, data.byteLength);
    dataSocket.end(Buffer.from(data));
    await new Promise<void>((resolve, reject) => {
      dataSocket.once('close', resolve);
      dataSocket.once('error', reject);
    });
    expectReply(await replies.read(), [226, 250], 'upload');
    onProgress?.(data.byteLength, data.byteLength);
    expectReply(await command('QUIT'), [221], 'quit');
  } finally {
    socket.destroy();
  }
};
