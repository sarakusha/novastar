import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetBrightDarkLineCoefsErase(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      coefficientErase: number
    ): Promise<void>;
    trySetBrightDarkLineCoefsErase(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      coefficientErase: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetBrightDarkLineCoefsErase<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  coefficientErase: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    coefficientErase,
    AddressMapping.BrightDarkLineCoefsInSpiFlashEraseOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetBrightDarkLineCoefsErase');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.BrightDarkLineCoefsInSpiFlashEraseAddr;
  return req;
}
Session.prototype.SetBrightDarkLineCoefsErase = async function SetBrightDarkLineCoefsErase(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  coefficientErase: number
): Promise<void> {
  const req = createSetBrightDarkLineCoefsErase(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    coefficientErase
  );
  await this.connection.send(req);
};
Session.prototype.trySetBrightDarkLineCoefsErase = async function trySetBrightDarkLineCoefsErase(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  coefficientErase: number
): Promise<ErrorType | null> {
  const req = createSetBrightDarkLineCoefsErase(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    coefficientErase
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
