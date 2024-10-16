import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetCoefficientReloadFromSpiFlash(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      coefficientReloadFromSpiFlash: number
    ): Promise<void>;
    trySetCoefficientReloadFromSpiFlash(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      coefficientReloadFromSpiFlash: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetCoefficientReloadFromSpiFlash<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  coefficientReloadFromSpiFlash: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    coefficientReloadFromSpiFlash,
    AddressMapping.CoefficientReloadFromSpiFlashOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetCoefficientReloadFromSpiFlash');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.CoefficientReloadFromSpiFlashAddr;
  return req;
}
Session.prototype.SetCoefficientReloadFromSpiFlash =
  async function SetCoefficientReloadFromSpiFlash(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    coefficientReloadFromSpiFlash: number
  ): Promise<void> {
    const req = createSetCoefficientReloadFromSpiFlash(
      addr,
      portAddr,
      scanBoardAddr,
      bBroadcast,
      coefficientReloadFromSpiFlash
    );
    await this.connection.send(req);
  };
Session.prototype.trySetCoefficientReloadFromSpiFlash =
  async function trySetCoefficientReloadFromSpiFlash(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    coefficientReloadFromSpiFlash: number
  ): Promise<ErrorType | null> {
    const req = createSetCoefficientReloadFromSpiFlash(
      addr,
      portAddr,
      scanBoardAddr,
      false,
      coefficientReloadFromSpiFlash
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
