import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSUM2033GammaSwitchState(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      readLength: number
    ): Promise<Buffer>;
    tryReadSUM2033GammaSwitchState(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      readLength: number
    ): Promise<Packet | null>;
  }
}
export default function createReadSUM2033GammaSwitchState(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readLength: number
): Request {
  const req = new Request(readLength, 'ReadSUM2033GammaSwitchState');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.SUM2033WriteGammaSwitchStateAddr;
  return req;
}
Session.prototype.ReadSUM2033GammaSwitchState = async function ReadSUM2033GammaSwitchState(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readLength: number
): Promise<Buffer> {
  const req = createReadSUM2033GammaSwitchState(addr, portAddr, scanBoardAddr, readLength);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadSUM2033GammaSwitchState = async function tryReadSUM2033GammaSwitchState(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  readLength: number
): Promise<Packet | null> {
  const req = createReadSUM2033GammaSwitchState(addr, portAddr, scanBoardAddr, readLength);
  return this.connection.trySend(req);
};
