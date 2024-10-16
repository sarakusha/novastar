import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadFanSpeedOfMonitorCard_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      readCountOfFan: number,
      beginIdnexOfFan: number
    ): Promise<Buffer>;
    tryFuncCard_ReadFanSpeedOfMonitorCard_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      readCountOfFan: number,
      beginIdnexOfFan: number
    ): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadFanSpeedOfMonitorCard_1(
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  readCountOfFan: number,
  beginIdnexOfFan: number
): Request {
  const req = new Request(
    AddressMapping.FuncCard_FanSpeedOfMonitorCardOccupancy * readCountOfFan,
    'FuncCard_ReadFanSpeedOfMonitorCard_1'
  );
  req.destination = addr;
  req.deviceType = 2;
  req.port = portAddr;
  req.rcvIndex = funcCardAddr;
  req.address =
    AddressMapping.FuncCard_FanSpeedOfMonitorCardAddr +
    AddressMapping.FuncCard_FanSpeedOfMonitorCardOccupancy * beginIdnexOfFan;
  return req;
}
Session.prototype.FuncCard_ReadFanSpeedOfMonitorCard_1 =
  async function FuncCard_ReadFanSpeedOfMonitorCard_1(
    this: Session,
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    readCountOfFan: number,
    beginIdnexOfFan: number
  ): Promise<Buffer> {
    const req = createFuncCard_ReadFanSpeedOfMonitorCard_1(
      addr,
      portAddr,
      funcCardAddr,
      readCountOfFan,
      beginIdnexOfFan
    );
    return (await this.connection.send(req)).data;
  };
Session.prototype.tryFuncCard_ReadFanSpeedOfMonitorCard_1 =
  async function tryFuncCard_ReadFanSpeedOfMonitorCard_1(
    this: Session,
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    readCountOfFan: number,
    beginIdnexOfFan: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadFanSpeedOfMonitorCard_1(
      addr,
      portAddr,
      funcCardAddr,
      readCountOfFan,
      beginIdnexOfFan
    );
    return this.connection.trySend(req);
  };
