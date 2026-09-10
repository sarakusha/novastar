import dgram from 'dgram';
import { type NetworkInterfaceInfo, networkInterfaces } from 'os';

import { decodeTaurusPacket, encodeTaurusDiscoveryRequest, TAURUS_DISCOVERY } from './packet';

// cspell:ignore logined sysset

export const TAURUS_DISCOVERY_PORT = 16601;

export interface TaurusPlayerInfo {
  address: string;
  aliasName: string;
  encodeType: number;
  height: number;
  modelId: number;
  platform: string;
  privacy: boolean;
  productName: string;
  rotation: number;
  sn: string;
  tcpPort: number;
  width: number;
  ftpPort?: number;
  key?: string;
  logined?: boolean;
  loginedUsernames?: string[];
  syssetFtpPort?: number;
  syssetTcpPort?: number;
  terminalEntrancePortHttps?: number;
  terminalEntrancePortWebSocket?: number;
}

const ipv4ToUint32 = (address: string): number =>
  address.split('.').reduce((result, octet) => (result << 8) | Number(octet), 0) >>> 0;

const getBroadcastAddress = (address: string, netmask: string): string => {
  const broadcast = (ipv4ToUint32(address) | ~ipv4ToUint32(netmask)) >>> 0;
  return [24, 16, 8, 0].map((shift) => (broadcast >>> shift) & 0xff).join('.');
};

export const parseTaurusDiscoveryResponse = (
  message: Uint8Array,
  address: string,
): TaurusPlayerInfo | undefined => {
  try {
    const packet = decodeTaurusPacket(message);
    if (packet.packetType !== TAURUS_DISCOVERY || packet.what !== 1) return undefined;
    const value = JSON.parse(packet.body.toString('utf8')) as Partial<TaurusPlayerInfo>;
    if (typeof value.sn !== 'string' || typeof value.tcpPort !== 'number') return undefined;
    return { ...value, address } as TaurusPlayerInfo;
  } catch {
    return undefined;
  }
};

const discoverFromInterface = (
  { address, netmask }: NetworkInterfaceInfo,
  timeout: number,
  destination?: string,
): Promise<TaurusPlayerInfo[]> =>
  new Promise((resolve) => {
    const socket = dgram.createSocket('udp4');
    const players = new Map<string, TaurusPlayerInfo>();
    let completed = false;
    const complete = (): void => {
      if (completed) return;
      completed = true;
      try {
        socket.close();
      } catch {
        // The socket may already be closed after an error.
      }
      resolve([...players.values()]);
    };
    socket.once('error', complete);
    socket.on('message', (message, remote) => {
      const player = parseTaurusDiscoveryResponse(message, remote.address);
      if (player) players.set(player.sn, player);
    });
    socket.bind(0, address, () => {
      socket.setBroadcast(true);
      const target = destination ?? getBroadcastAddress(address, netmask);
      socket.send(encodeTaurusDiscoveryRequest(), TAURUS_DISCOVERY_PORT, target, (error) => {
        if (error) complete();
      });
      setTimeout(complete, timeout).unref();
    });
  });

export const discoverTaurusPlayers = async (
  destination?: string,
  timeout = 1000,
): Promise<TaurusPlayerInfo[]> => {
  const interfaces = Object.values(networkInterfaces())
    .flat()
    .filter((info): info is NetworkInterfaceInfo =>
      Boolean(info && !info.internal && info.family === 'IPv4'),
    );
  const results = await Promise.all(
    interfaces.map((info) => discoverFromInterface(info, timeout, destination)),
  );
  return [
    ...results
      .flat()
      .reduce(
        (players, player) => players.set(player.sn, player),
        new Map<string, TaurusPlayerInfo>(),
      )
      .values(),
  ];
};
