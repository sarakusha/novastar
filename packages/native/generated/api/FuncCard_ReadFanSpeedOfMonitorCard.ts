import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadFanSpeedOfMonitorCard(
      addr: number,
      readCountOfFan: number,
      beginIdnexOfFan: number
    ): Promise<Buffer>;
    tryFuncCard_ReadFanSpeedOfMonitorCard(
      addr: number,
      readCountOfFan: number,
      beginIdnexOfFan: number
    ): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadFanSpeedOfMonitorCard(
  addr: number,
  readCountOfFan: number,
  beginIdnexOfFan: number
): Request {
  const req = new Request(
    AddressMapping.FuncCard_FanSpeedOfMonitorCardOccupancy * readCountOfFan,
    'FuncCard_ReadFanSpeedOfMonitorCard'
  );
  req.destination = addr;
  req.address =
    AddressMapping.FuncCard_FanSpeedOfMonitorCardAddr +
    AddressMapping.FuncCard_FanSpeedOfMonitorCardOccupancy * beginIdnexOfFan;
  return req;
}
Session.prototype.FuncCard_ReadFanSpeedOfMonitorCard =
  async function FuncCard_ReadFanSpeedOfMonitorCard(
    this: Session,
    addr: number,
    readCountOfFan: number,
    beginIdnexOfFan: number
  ): Promise<Buffer> {
    const req = createFuncCard_ReadFanSpeedOfMonitorCard(addr, readCountOfFan, beginIdnexOfFan);
    return (await this.connection.send(req)).data;
  };
Session.prototype.tryFuncCard_ReadFanSpeedOfMonitorCard =
  async function tryFuncCard_ReadFanSpeedOfMonitorCard(
    this: Session,
    addr: number,
    readCountOfFan: number,
    beginIdnexOfFan: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadFanSpeedOfMonitorCard(addr, readCountOfFan, beginIdnexOfFan);
    return this.connection.trySend(req);
  };
