import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadAdjustMatrixAndEnable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadAdjustMatrixAndEnable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadAdjustMatrixAndEnable(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.ColorAdjustEnableOccupancy, 'ReadAdjustMatrixAndEnable');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ColorAdjustMatrixAndEnableAddr;
  return req;
}
Session.prototype.ReadAdjustMatrixAndEnable = async function ReadAdjustMatrixAndEnable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadAdjustMatrixAndEnable(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadAdjustMatrixAndEnable = async function tryReadAdjustMatrixAndEnable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadAdjustMatrixAndEnable(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
