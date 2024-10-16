import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetFPGAWorkProgramStore(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      FPGAWorkProgramStore: number
    ): Promise<void>;
    trySetFPGAWorkProgramStore(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      FPGAWorkProgramStore: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetFPGAWorkProgramStore<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  FPGAWorkProgramStore: number
): Request<Broadcast> {
  const $data = encodeUIntLE(FPGAWorkProgramStore, AddressMapping.FPGAWorkProgramStoreOccupancy);
  const req = new Request($data, bBroadcast, 'SetFPGAWorkProgramStore');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.FPGAWorkProgramStoreAddr;
  return req;
}
Session.prototype.SetFPGAWorkProgramStore = async function SetFPGAWorkProgramStore(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  FPGAWorkProgramStore: number
): Promise<void> {
  const req = createSetFPGAWorkProgramStore(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    FPGAWorkProgramStore
  );
  await this.connection.send(req);
};
Session.prototype.trySetFPGAWorkProgramStore = async function trySetFPGAWorkProgramStore(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  FPGAWorkProgramStore: number
): Promise<ErrorType | null> {
  const req = createSetFPGAWorkProgramStore(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    FPGAWorkProgramStore
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
