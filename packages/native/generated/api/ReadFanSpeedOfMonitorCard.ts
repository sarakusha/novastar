import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadFanSpeedOfMonitorCard(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      readCountOfFan: number,
      beginIdnexOfFan: number
    ): Promise<Buffer>;
    tryReadFanSpeedOfMonitorCard(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      readCountOfFan: number,
      beginIdnexOfFan: number
    ): Promise<Packet | null>;
  }
}
export default function createReadFanSpeedOfMonitorCard(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readCountOfFan: number,
  beginIdnexOfFan: number
): Request {
  const req = new Request(
    AddressMapping.Scanner_FanSpeedOfMonitorCardOccupancy * readCountOfFan,
    'ReadFanSpeedOfMonitorCard'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address =
    AddressMapping.Scanner_FanSpeedOfMonitorCardAddr +
    AddressMapping.Scanner_FanSpeedOfMonitorCardOccupancy * beginIdnexOfFan;
  return req;
}
Session.prototype.ReadFanSpeedOfMonitorCard = async function ReadFanSpeedOfMonitorCard(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readCountOfFan: number,
  beginIdnexOfFan: number
): Promise<Buffer> {
  const req = createReadFanSpeedOfMonitorCard(
    addr,
    portAddr,
    scanBoardAddr,
    readCountOfFan,
    beginIdnexOfFan
  );
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadFanSpeedOfMonitorCard = async function tryReadFanSpeedOfMonitorCard(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readCountOfFan: number,
  beginIdnexOfFan: number
): Promise<Packet | null> {
  const req = createReadFanSpeedOfMonitorCard(
    addr,
    portAddr,
    scanBoardAddr,
    readCountOfFan,
    beginIdnexOfFan
  );
  return this.connection.trySend(req);
};
