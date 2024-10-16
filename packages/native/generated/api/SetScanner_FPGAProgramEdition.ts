import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScanner_FPGAProgramEdition(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      scanner_FPGAProgramEdition: number
    ): Promise<void>;
    trySetScanner_FPGAProgramEdition(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      scanner_FPGAProgramEdition: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanner_FPGAProgramEdition<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  scanner_FPGAProgramEdition: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    scanner_FPGAProgramEdition,
    AddressMapping.Scanner_FPGAProgramEditionOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetScanner_FPGAProgramEdition');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_FPGAProgramEditionAddr;
  return req;
}
Session.prototype.SetScanner_FPGAProgramEdition = async function SetScanner_FPGAProgramEdition(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  scanner_FPGAProgramEdition: number
): Promise<void> {
  const req = createSetScanner_FPGAProgramEdition(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    scanner_FPGAProgramEdition
  );
  await this.connection.send(req);
};
Session.prototype.trySetScanner_FPGAProgramEdition =
  async function trySetScanner_FPGAProgramEdition(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    scanner_FPGAProgramEdition: number
  ): Promise<ErrorType | null> {
    const req = createSetScanner_FPGAProgramEdition(
      addr,
      portAddr,
      scanBoardAddr,
      false,
      scanner_FPGAProgramEdition
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
