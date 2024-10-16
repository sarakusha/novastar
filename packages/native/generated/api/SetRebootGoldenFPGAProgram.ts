import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetRebootGoldenFPGAProgram(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      rebootGoldenFPGAProgram: number
    ): Promise<void>;
    trySetRebootGoldenFPGAProgram(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      rebootGoldenFPGAProgram: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetRebootGoldenFPGAProgram<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  rebootGoldenFPGAProgram: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    rebootGoldenFPGAProgram,
    AddressMapping.RebootGoldenFPGAProgramOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetRebootGoldenFPGAProgram');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.RebootGoldenFPGAProgramAddr;
  return req;
}
Session.prototype.SetRebootGoldenFPGAProgram = async function SetRebootGoldenFPGAProgram(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  rebootGoldenFPGAProgram: number
): Promise<void> {
  const req = createSetRebootGoldenFPGAProgram(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    rebootGoldenFPGAProgram
  );
  await this.connection.send(req);
};
Session.prototype.trySetRebootGoldenFPGAProgram = async function trySetRebootGoldenFPGAProgram(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  rebootGoldenFPGAProgram: number
): Promise<ErrorType | null> {
  const req = createSetRebootGoldenFPGAProgram(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    rebootGoldenFPGAProgram
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
