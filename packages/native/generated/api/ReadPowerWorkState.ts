import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadPowerWorkState(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      powerBackNumber: number
    ): Promise<Buffer>;
    tryReadPowerWorkState(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      powerBackNumber: number
    ): Promise<Packet | null>;
  }
}
export default function createReadPowerWorkState(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  powerBackNumber: number
): Request {
  const req = new Request(powerBackNumber, 'ReadPowerWorkState');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.PowerWorkStateAddr;
  return req;
}
Session.prototype.ReadPowerWorkState = async function ReadPowerWorkState(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  powerBackNumber: number
): Promise<Buffer> {
  const req = createReadPowerWorkState(addr, portAddr, scanBoardAddr, powerBackNumber);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadPowerWorkState = async function tryReadPowerWorkState(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  powerBackNumber: number
): Promise<Packet | null> {
  const req = createReadPowerWorkState(addr, portAddr, scanBoardAddr, powerBackNumber);
  return this.connection.trySend(req);
};
