import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetCoefficientReloadFromIIcFlash(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      coefficientReloadFromIIcFlash: number
    ): Promise<void>;
    trySetCoefficientReloadFromIIcFlash(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      coefficientReloadFromIIcFlash: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetCoefficientReloadFromIIcFlash<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  coefficientReloadFromIIcFlash: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    coefficientReloadFromIIcFlash,
    AddressMapping.CoefficientReloadFromIIcFlashOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetCoefficientReloadFromIIcFlash');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.CoefficientReloadFromIIcFlashAddr;
  return req;
}
Session.prototype.SetCoefficientReloadFromIIcFlash =
  async function SetCoefficientReloadFromIIcFlash(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    coefficientReloadFromIIcFlash: number
  ): Promise<void> {
    const req = createSetCoefficientReloadFromIIcFlash(
      addr,
      portAddr,
      scanBoardAddr,
      bBroadcast,
      coefficientReloadFromIIcFlash
    );
    await this.connection.send(req);
  };
Session.prototype.trySetCoefficientReloadFromIIcFlash =
  async function trySetCoefficientReloadFromIIcFlash(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    coefficientReloadFromIIcFlash: number
  ): Promise<ErrorType | null> {
    const req = createSetCoefficientReloadFromIIcFlash(
      addr,
      portAddr,
      scanBoardAddr,
      false,
      coefficientReloadFromIIcFlash
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
