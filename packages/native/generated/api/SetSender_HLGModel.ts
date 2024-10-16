import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { HLGModelEnum } from '../HLGModel';

declare module '@novastar/codec' {
  interface API {
    SetSender_HLGModel(addr: number, bBroadcast: boolean, hLGModel: HLGModelEnum): Promise<void>;
    trySetSender_HLGModel(addr: number, hLGModel: HLGModelEnum): Promise<ErrorType | null>;
  }
}
export default function createSetSender_HLGModel<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  hLGModel: HLGModelEnum
): Request<Broadcast> {
  const $data = encodeUIntLE(hLGModel, AddressMapping.HLGModelOccupancy);
  const req = new Request($data, bBroadcast, 'SetSender_HLGModel');
  req.destination = addr;
  req.address = AddressMapping.HLGModelAddr;
  return req;
}
Session.prototype.SetSender_HLGModel = async function SetSender_HLGModel(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  hLGModel: HLGModelEnum
): Promise<void> {
  const req = createSetSender_HLGModel(addr, bBroadcast, hLGModel);
  await this.connection.send(req);
};
Session.prototype.trySetSender_HLGModel = async function trySetSender_HLGModel(
  this: Session,
  addr: number,
  hLGModel: HLGModelEnum
): Promise<ErrorType | null> {
  const req = createSetSender_HLGModel(addr, false, hLGModel);
  return (await this.connection.trySend(req))?.ack ?? null;
};
