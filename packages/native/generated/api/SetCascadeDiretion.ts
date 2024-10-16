import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { ModuleCascadeDiretionEnum } from '../ModuleCascadeDiretion';

declare module '@novastar/codec' {
  interface API {
    SetCascadeDiretion(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      cascadeDiretion: ModuleCascadeDiretionEnum
    ): Promise<void>;
    trySetCascadeDiretion(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      cascadeDiretion: ModuleCascadeDiretionEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createSetCascadeDiretion<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  cascadeDiretion: ModuleCascadeDiretionEnum
): Request<Broadcast> {
  const $data = encodeUIntLE(cascadeDiretion, AddressMapping.CascadeDiretionOccupancy);
  const req = new Request($data, bBroadcast, 'SetCascadeDiretion');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.CascadeDiretionAddr;
  return req;
}
Session.prototype.SetCascadeDiretion = async function SetCascadeDiretion(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  cascadeDiretion: ModuleCascadeDiretionEnum
): Promise<void> {
  const req = createSetCascadeDiretion(addr, portAddr, scanBoardAddr, bBroadcast, cascadeDiretion);
  await this.connection.send(req);
};
Session.prototype.trySetCascadeDiretion = async function trySetCascadeDiretion(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  cascadeDiretion: ModuleCascadeDiretionEnum
): Promise<ErrorType | null> {
  const req = createSetCascadeDiretion(addr, portAddr, scanBoardAddr, false, cascadeDiretion);
  return (await this.connection.trySend(req))?.ack ?? null;
};
