import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadVoltageOfMonitorCard(
      addr: number,
      readCountOfValtage: number,
      beginIdnexOfValtage: number
    ): Promise<Buffer>;
    tryFuncCard_ReadVoltageOfMonitorCard(
      addr: number,
      readCountOfValtage: number,
      beginIdnexOfValtage: number
    ): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadVoltageOfMonitorCard(
  addr: number,
  readCountOfValtage: number,
  beginIdnexOfValtage: number
): Request {
  const req = new Request(
    AddressMapping.FuncCard_VoltageOfMonitorCardOccupancy * readCountOfValtage,
    'FuncCard_ReadVoltageOfMonitorCard'
  );
  req.destination = addr;
  req.address =
    AddressMapping.FuncCard_VoltageOfMonitorCardAddr +
    AddressMapping.FuncCard_VoltageOfMonitorCardOccupancy * beginIdnexOfValtage;
  return req;
}
Session.prototype.FuncCard_ReadVoltageOfMonitorCard =
  async function FuncCard_ReadVoltageOfMonitorCard(
    this: Session,
    addr: number,
    readCountOfValtage: number,
    beginIdnexOfValtage: number
  ): Promise<Buffer> {
    const req = createFuncCard_ReadVoltageOfMonitorCard(
      addr,
      readCountOfValtage,
      beginIdnexOfValtage
    );
    return (await this.connection.send(req)).data;
  };
Session.prototype.tryFuncCard_ReadVoltageOfMonitorCard =
  async function tryFuncCard_ReadVoltageOfMonitorCard(
    this: Session,
    addr: number,
    readCountOfValtage: number,
    beginIdnexOfValtage: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadVoltageOfMonitorCard(
      addr,
      readCountOfValtage,
      beginIdnexOfValtage
    );
    return this.connection.trySend(req);
  };
