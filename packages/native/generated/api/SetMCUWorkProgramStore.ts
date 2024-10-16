import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetMCUWorkProgramStore(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      MCUWorkProgramStore: number
    ): Promise<void>;
    trySetMCUWorkProgramStore(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      MCUWorkProgramStore: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetMCUWorkProgramStore<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  MCUWorkProgramStore: number
): Request<Broadcast> {
  const $data = encodeUIntLE(MCUWorkProgramStore, AddressMapping.MCUWorkProgramStoreOccupancy);
  const req = new Request($data, bBroadcast, 'SetMCUWorkProgramStore');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.MCUWorkProgramStoreAddr;
  return req;
}
Session.prototype.SetMCUWorkProgramStore = async function SetMCUWorkProgramStore(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  MCUWorkProgramStore: number
): Promise<void> {
  const req = createSetMCUWorkProgramStore(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    MCUWorkProgramStore
  );
  await this.connection.send(req);
};
Session.prototype.trySetMCUWorkProgramStore = async function trySetMCUWorkProgramStore(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  MCUWorkProgramStore: number
): Promise<ErrorType | null> {
  const req = createSetMCUWorkProgramStore(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    MCUWorkProgramStore
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
