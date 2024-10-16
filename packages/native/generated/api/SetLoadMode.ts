import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { SourceSelectLoadModeEnum } from '../SourceSelectLoadMode';

declare module '@novastar/codec' {
  interface API {
    SetLoadMode(
      addr: number,
      bBroadcast: boolean,
      loadMode: SourceSelectLoadModeEnum
    ): Promise<void>;
    trySetLoadMode(addr: number, loadMode: SourceSelectLoadModeEnum): Promise<ErrorType | null>;
  }
}
export default function createSetLoadMode<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  loadMode: SourceSelectLoadModeEnum
): Request<Broadcast> {
  const $data = encodeUIntLE(loadMode, AddressMapping.LoadModeOccupancy);
  const req = new Request($data, bBroadcast, 'SetLoadMode');
  req.destination = addr;
  req.address = AddressMapping.LoadModeAddr;
  return req;
}
Session.prototype.SetLoadMode = async function SetLoadMode(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  loadMode: SourceSelectLoadModeEnum
): Promise<void> {
  const req = createSetLoadMode(addr, bBroadcast, loadMode);
  await this.connection.send(req);
};
Session.prototype.trySetLoadMode = async function trySetLoadMode(
  this: Session,
  addr: number,
  loadMode: SourceSelectLoadModeEnum
): Promise<ErrorType | null> {
  const req = createSetLoadMode(addr, false, loadMode);
  return (await this.connection.trySend(req))?.ack ?? null;
};
