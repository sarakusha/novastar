import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetStoreNoSignalLogoImage(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      storeNoSignalLogoImage: number
    ): Promise<void>;
    trySetStoreNoSignalLogoImage(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      storeNoSignalLogoImage: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetStoreNoSignalLogoImage<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  storeNoSignalLogoImage: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    storeNoSignalLogoImage,
    AddressMapping.StoreNoSignalLogoImageOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetStoreNoSignalLogoImage');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.StoreNoSignalLogoImageAddr;
  return req;
}
Session.prototype.SetStoreNoSignalLogoImage = async function SetStoreNoSignalLogoImage(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  storeNoSignalLogoImage: number
): Promise<void> {
  const req = createSetStoreNoSignalLogoImage(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    storeNoSignalLogoImage
  );
  await this.connection.send(req);
};
Session.prototype.trySetStoreNoSignalLogoImage = async function trySetStoreNoSignalLogoImage(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  storeNoSignalLogoImage: number
): Promise<ErrorType | null> {
  const req = createSetStoreNoSignalLogoImage(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    storeNoSignalLogoImage
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
