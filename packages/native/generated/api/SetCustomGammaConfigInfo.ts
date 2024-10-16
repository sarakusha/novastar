import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetCustomGammaConfigInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      customGammaConfigInfo: number
    ): Promise<void>;
    trySetCustomGammaConfigInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      customGammaConfigInfo: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetCustomGammaConfigInfo<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  customGammaConfigInfo: number
): Request<Broadcast> {
  const $data = encodeUIntLE(customGammaConfigInfo, AddressMapping.GammaConfigInfoOccupancy);
  const req = new Request($data, bBroadcast, 'SetCustomGammaConfigInfo');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.CustomGammaConfigInfoAddr;
  return req;
}
Session.prototype.SetCustomGammaConfigInfo = async function SetCustomGammaConfigInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  customGammaConfigInfo: number
): Promise<void> {
  const req = createSetCustomGammaConfigInfo(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    customGammaConfigInfo
  );
  await this.connection.send(req);
};
Session.prototype.trySetCustomGammaConfigInfo = async function trySetCustomGammaConfigInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  customGammaConfigInfo: number
): Promise<ErrorType | null> {
  const req = createSetCustomGammaConfigInfo(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    customGammaConfigInfo
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
