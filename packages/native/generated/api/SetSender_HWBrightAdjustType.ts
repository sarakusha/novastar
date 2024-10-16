import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { HWBrightAdjustTypeEnum } from '../HWBrightAdjustType';

declare module '@novastar/codec' {
  interface API {
    SetSender_HWBrightAdjustType(
      addr: number,
      bBroadcast: boolean,
      enableAutoData: HWBrightAdjustTypeEnum
    ): Promise<void>;
    trySetSender_HWBrightAdjustType(
      addr: number,
      enableAutoData: HWBrightAdjustTypeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSender_HWBrightAdjustType<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  enableAutoData: HWBrightAdjustTypeEnum
): Request<Broadcast> {
  const req = new Request(
    enableAutoData === HWBrightAdjustTypeEnum.HWAutoBright
      ? [125]
      : enableAutoData === HWBrightAdjustTypeEnum.HWProgram
        ? [91]
        : [255],
    bBroadcast,
    'SetSender_HWBrightAdjustType'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_HWBrightAdjustTypeAddr;
  return req;
}
Session.prototype.SetSender_HWBrightAdjustType = async function SetSender_HWBrightAdjustType(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  enableAutoData: HWBrightAdjustTypeEnum
): Promise<void> {
  const req = createSetSender_HWBrightAdjustType(addr, bBroadcast, enableAutoData);
  await this.connection.send(req);
};
Session.prototype.trySetSender_HWBrightAdjustType = async function trySetSender_HWBrightAdjustType(
  this: Session,
  addr: number,
  enableAutoData: HWBrightAdjustTypeEnum
): Promise<ErrorType | null> {
  const req = createSetSender_HWBrightAdjustType(addr, false, enableAutoData);
  return (await this.connection.trySend(req))?.ack ?? null;
};
