import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetCheckModuleFlashCmd(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      checkModuleFlashCmd: number
    ): Promise<void>;
    trySetCheckModuleFlashCmd(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      checkModuleFlashCmd: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetCheckModuleFlashCmd<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  checkModuleFlashCmd: number
): Request<Broadcast> {
  const $data = encodeUIntLE(checkModuleFlashCmd, AddressMapping.CheckModuleFlashCmdOccupancy);
  const req = new Request($data, bBroadcast, 'SetCheckModuleFlashCmd');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.CheckModuleFlashCmdAddr;
  return req;
}
Session.prototype.SetCheckModuleFlashCmd = async function SetCheckModuleFlashCmd(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  checkModuleFlashCmd: number
): Promise<void> {
  const req = createSetCheckModuleFlashCmd(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    checkModuleFlashCmd
  );
  await this.connection.send(req);
};
Session.prototype.trySetCheckModuleFlashCmd = async function trySetCheckModuleFlashCmd(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  checkModuleFlashCmd: number
): Promise<ErrorType | null> {
  const req = createSetCheckModuleFlashCmd(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    checkModuleFlashCmd
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
