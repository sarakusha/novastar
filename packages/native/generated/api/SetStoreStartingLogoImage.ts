import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetStoreStartingLogoImage(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      storeStartingLogoImage: number
    ): Promise<void>;
    trySetStoreStartingLogoImage(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      storeStartingLogoImage: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetStoreStartingLogoImage<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  storeStartingLogoImage: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    storeStartingLogoImage,
    AddressMapping.StoreStartingLogoImageOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetStoreStartingLogoImage');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.StoreStartingLogoImageAddr;
  return req;
}
Session.prototype.SetStoreStartingLogoImage = async function SetStoreStartingLogoImage(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  storeStartingLogoImage: number
): Promise<void> {
  const req = createSetStoreStartingLogoImage(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    storeStartingLogoImage
  );
  await this.connection.send(req);
};
Session.prototype.trySetStoreStartingLogoImage = async function trySetStoreStartingLogoImage(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  storeStartingLogoImage: number
): Promise<ErrorType | null> {
  const req = createSetStoreStartingLogoImage(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    storeStartingLogoImage
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
