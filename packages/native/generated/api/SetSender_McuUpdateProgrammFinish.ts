import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_McuUpdateProgrammFinish(
      addr: number,
      bBroadcast: boolean,
      updateFinishData: number
    ): Promise<void>;
    trySetSender_McuUpdateProgrammFinish(
      addr: number,
      updateFinishData: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSender_McuUpdateProgrammFinish<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  updateFinishData: number
): Request<Broadcast> {
  const req = new Request([updateFinishData], bBroadcast, 'SetSender_McuUpdateProgrammFinish');
  req.destination = addr;
  req.port = 255;
  req.rcvIndex = 255;
  req.address = AddressMapping.Sender_McuUpdateProgrammFinishAddr;
  return req;
}
Session.prototype.SetSender_McuUpdateProgrammFinish =
  async function SetSender_McuUpdateProgrammFinish(
    this: Session,
    addr: number,
    bBroadcast: boolean,
    updateFinishData: number
  ): Promise<void> {
    const req = createSetSender_McuUpdateProgrammFinish(addr, bBroadcast, updateFinishData);
    await this.connection.send(req);
  };
Session.prototype.trySetSender_McuUpdateProgrammFinish =
  async function trySetSender_McuUpdateProgrammFinish(
    this: Session,
    addr: number,
    updateFinishData: number
  ): Promise<ErrorType | null> {
    const req = createSetSender_McuUpdateProgrammFinish(addr, false, updateFinishData);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
