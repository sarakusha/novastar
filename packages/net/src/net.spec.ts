import { COMPUTER, IO, Packet } from '@novastar/codec';
import { Buffer } from 'buffer';
import * as fs from 'fs';
import os from 'os';
import path from 'path';
import net, { findNetDevices, NetSession } from './net';

afterAll(() => net.release());

// Wireshark parser
type DumpPacket = {
  _source: {
    layers: {
      data: {
        'data.data': string;
        'data.len': number;
      };
    };
  };
};

describe('LAN', () => {
  const sessionPromise = new Promise<NetSession>((resolve, reject) => {
    findNetDevices().then(([host]) => {
      if (host) {
        resolve(net.open(host));
      } else {
        reject(new Error('Novastar device not found'));
      }
    });
  });

  test('decode dump', async () => {
    const dumpPath = path.join(os.homedir(), 'Documents/dump1.json');
    const buffer = await fs.promises.readFile(dumpPath);
    const dump = JSON.parse(buffer.toString()) as DumpPacket[];
    const packets = dump
      .map(
        ({
          _source: {
            layers: {
              data: { 'data.data': data },
            },
          },
        }) => data
      )
      .map(data => Buffer.from(data.replace(/:/g, ''), 'hex'))
      .filter(raw => raw.length >= Packet.baseSize)
      .map(raw => new Packet(raw));
    packets.forEach(({ source, destination, deviceType, port, io, address, data }) => {
      console.log(
        `${
          source !== COMPUTER ? '<<<' : '>>>'
        } SRC: ${source}\t DST: ${destination}\t DT: ${deviceType}\tP: ${port}\t${
          io === IO.Write ? 'W' : 'R'
        }\t${address.toString(16).padStart(8, '0')}\t${data.toString('hex')}\n${
          data.length ? data.toString('latin1') : '\n'
        }\n`
      );
    });
  });
});
