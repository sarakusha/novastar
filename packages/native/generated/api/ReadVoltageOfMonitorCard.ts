import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadVoltageOfMonitorCard(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      readCountOfValtage: number,
      beginIdnexOfValtage: number
    ): Promise<Buffer>;
    tryReadVoltageOfMonitorCard(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      readCountOfValtage: number,
      beginIdnexOfValtage: number
    ): Promise<Packet | null>;
  }
}
export default function createReadVoltageOfMonitorCard(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readCountOfValtage: number,
  beginIdnexOfValtage: number
): Request {
  const req = new Request(
    AddressMapping.Scanner_VoltageOfMonitorCardOccupancy * readCountOfValtage,
    'ReadVoltageOfMonitorCard'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address =
    AddressMapping.Scanner_VoltageOfMonitorCardAddr +
    AddressMapping.Scanner_VoltageOfMonitorCardOccupancy * beginIdnexOfValtage;
  return req;
}
Session.prototype.ReadVoltageOfMonitorCard = async function ReadVoltageOfMonitorCard(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readCountOfValtage: number,
  beginIdnexOfValtage: number
): Promise<Buffer> {
  const req = createReadVoltageOfMonitorCard(
    addr,
    portAddr,
    scanBoardAddr,
    readCountOfValtage,
    beginIdnexOfValtage
  );
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadVoltageOfMonitorCard = async function tryReadVoltageOfMonitorCard(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readCountOfValtage: number,
  beginIdnexOfValtage: number
): Promise<Packet | null> {
  const req = createReadVoltageOfMonitorCard(
    addr,
    portAddr,
    scanBoardAddr,
    readCountOfValtage,
    beginIdnexOfValtage
  );
  return this.connection.trySend(req);
};
