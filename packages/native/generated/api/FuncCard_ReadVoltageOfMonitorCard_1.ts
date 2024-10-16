import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadVoltageOfMonitorCard_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      readCountOfValtage: number,
      beginIdnexOfValtage: number
    ): Promise<Buffer>;
    tryFuncCard_ReadVoltageOfMonitorCard_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      readCountOfValtage: number,
      beginIdnexOfValtage: number
    ): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadVoltageOfMonitorCard_1(
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  readCountOfValtage: number,
  beginIdnexOfValtage: number
): Request {
  const req = new Request(
    AddressMapping.FuncCard_VoltageOfMonitorCardOccupancy * readCountOfValtage,
    'FuncCard_ReadVoltageOfMonitorCard_1'
  );
  req.destination = addr;
  req.deviceType = 2;
  req.port = portAddr;
  req.rcvIndex = funcCardAddr;
  req.address =
    AddressMapping.FuncCard_VoltageOfMonitorCardAddr +
    AddressMapping.FuncCard_VoltageOfMonitorCardOccupancy * beginIdnexOfValtage;
  return req;
}
Session.prototype.FuncCard_ReadVoltageOfMonitorCard_1 =
  async function FuncCard_ReadVoltageOfMonitorCard_1(
    this: Session,
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    readCountOfValtage: number,
    beginIdnexOfValtage: number
  ): Promise<Buffer> {
    const req = createFuncCard_ReadVoltageOfMonitorCard_1(
      addr,
      portAddr,
      funcCardAddr,
      readCountOfValtage,
      beginIdnexOfValtage
    );
    return (await this.connection.send(req)).data;
  };
Session.prototype.tryFuncCard_ReadVoltageOfMonitorCard_1 =
  async function tryFuncCard_ReadVoltageOfMonitorCard_1(
    this: Session,
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    readCountOfValtage: number,
    beginIdnexOfValtage: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadVoltageOfMonitorCard_1(
      addr,
      portAddr,
      funcCardAddr,
      readCountOfValtage,
      beginIdnexOfValtage
    );
    return this.connection.trySend(req);
  };
