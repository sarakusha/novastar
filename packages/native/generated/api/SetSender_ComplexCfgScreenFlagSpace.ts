import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_ComplexCfgScreenFlagSpace(
      addr: number,
      bBroadcast: boolean,
      IsComplexCfgScreen: boolean
    ): Promise<void>;
    trySetSender_ComplexCfgScreenFlagSpace(
      addr: number,
      IsComplexCfgScreen: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSender_ComplexCfgScreenFlagSpace<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  IsComplexCfgScreen: boolean
): Request<Broadcast> {
  const req = new Request(
    IsComplexCfgScreen ? [1] : [0],
    bBroadcast,
    'SetSender_ComplexCfgScreenFlagSpace'
  );
  req.destination = addr;
  req.address = AddressMapping.ComplexCfgScreenFlagAddr;
  return req;
}
Session.prototype.SetSender_ComplexCfgScreenFlagSpace =
  async function SetSender_ComplexCfgScreenFlagSpace(
    this: Session,
    addr: number,
    bBroadcast: boolean,
    IsComplexCfgScreen: boolean
  ): Promise<void> {
    const req = createSetSender_ComplexCfgScreenFlagSpace(addr, bBroadcast, IsComplexCfgScreen);
    await this.connection.send(req);
  };
Session.prototype.trySetSender_ComplexCfgScreenFlagSpace =
  async function trySetSender_ComplexCfgScreenFlagSpace(
    this: Session,
    addr: number,
    IsComplexCfgScreen: boolean
  ): Promise<ErrorType | null> {
    const req = createSetSender_ComplexCfgScreenFlagSpace(addr, false, IsComplexCfgScreen);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
