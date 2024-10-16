import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetRebootWorkFPGAProgram(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      rebootWorkFPGAProgram: number
    ): Promise<void>;
    trySetRebootWorkFPGAProgram(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      rebootWorkFPGAProgram: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetRebootWorkFPGAProgram<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  rebootWorkFPGAProgram: number
): Request<Broadcast> {
  const $data = encodeUIntLE(rebootWorkFPGAProgram, AddressMapping.RebootWorkFPGAProgramOccupancy);
  const req = new Request($data, bBroadcast, 'SetRebootWorkFPGAProgram');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.RebootWorkFPGAProgramAddr;
  return req;
}
Session.prototype.SetRebootWorkFPGAProgram = async function SetRebootWorkFPGAProgram(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  rebootWorkFPGAProgram: number
): Promise<void> {
  const req = createSetRebootWorkFPGAProgram(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    rebootWorkFPGAProgram
  );
  await this.connection.send(req);
};
Session.prototype.trySetRebootWorkFPGAProgram = async function trySetRebootWorkFPGAProgram(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  rebootWorkFPGAProgram: number
): Promise<ErrorType | null> {
  const req = createSetRebootWorkFPGAProgram(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    rebootWorkFPGAProgram
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
