import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetRebootWorkMCUProgram(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      rebootWorkMCUProgram: number
    ): Promise<void>;
    trySetRebootWorkMCUProgram(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      rebootWorkMCUProgram: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetRebootWorkMCUProgram<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  rebootWorkMCUProgram: number
): Request<Broadcast> {
  const $data = encodeUIntLE(rebootWorkMCUProgram, AddressMapping.RebootWorkMCUProgramOccupancy);
  const req = new Request($data, bBroadcast, 'SetRebootWorkMCUProgram');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.RebootWorkMCUProgramAddr;
  return req;
}
Session.prototype.SetRebootWorkMCUProgram = async function SetRebootWorkMCUProgram(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  rebootWorkMCUProgram: number
): Promise<void> {
  const req = createSetRebootWorkMCUProgram(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    rebootWorkMCUProgram
  );
  await this.connection.send(req);
};
Session.prototype.trySetRebootWorkMCUProgram = async function trySetRebootWorkMCUProgram(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  rebootWorkMCUProgram: number
): Promise<ErrorType | null> {
  const req = createSetRebootWorkMCUProgram(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    rebootWorkMCUProgram
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
