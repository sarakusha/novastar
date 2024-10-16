import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetFPGAGoldenProgramStore(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      FPGAGoldenProgramStore: number
    ): Promise<void>;
    trySetFPGAGoldenProgramStore(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      FPGAGoldenProgramStore: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetFPGAGoldenProgramStore<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  FPGAGoldenProgramStore: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    FPGAGoldenProgramStore,
    AddressMapping.FPGAGoldenProgramStoreOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetFPGAGoldenProgramStore');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.FPGAGoldenProgramStoreAddr;
  return req;
}
Session.prototype.SetFPGAGoldenProgramStore = async function SetFPGAGoldenProgramStore(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  FPGAGoldenProgramStore: number
): Promise<void> {
  const req = createSetFPGAGoldenProgramStore(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    FPGAGoldenProgramStore
  );
  await this.connection.send(req);
};
Session.prototype.trySetFPGAGoldenProgramStore = async function trySetFPGAGoldenProgramStore(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  FPGAGoldenProgramStore: number
): Promise<ErrorType | null> {
  const req = createSetFPGAGoldenProgramStore(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    FPGAGoldenProgramStore
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
