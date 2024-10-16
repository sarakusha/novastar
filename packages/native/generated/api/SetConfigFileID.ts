import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetConfigFileID(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      configFileID: number
    ): Promise<void>;
    trySetConfigFileID(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      configFileID: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetConfigFileID<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  configFileID: number
): Request<Broadcast> {
  const $data = encodeUIntLE(configFileID, AddressMapping.ScannerConfigFileIDOccupancy);
  const req = new Request($data, bBroadcast, 'SetConfigFileID');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScannerConfigFileIDAddr;
  return req;
}
Session.prototype.SetConfigFileID = async function SetConfigFileID(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  configFileID: number
): Promise<void> {
  const req = createSetConfigFileID(addr, portAddr, scanBoardAddr, bBroadcast, configFileID);
  await this.connection.send(req);
};
Session.prototype.trySetConfigFileID = async function trySetConfigFileID(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  configFileID: number
): Promise<ErrorType | null> {
  const req = createSetConfigFileID(addr, portAddr, scanBoardAddr, false, configFileID);
  return (await this.connection.trySend(req))?.ack ?? null;
};
