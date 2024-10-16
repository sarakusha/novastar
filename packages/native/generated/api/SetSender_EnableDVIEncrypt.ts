import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { DVIEncryptTypeEnum } from '../DVIEncryptType';

declare module '@novastar/codec' {
  interface API {
    SetSender_EnableDVIEncrypt(
      addr: number,
      bBroadcast: boolean,
      encryptType: DVIEncryptTypeEnum
    ): Promise<void>;
    trySetSender_EnableDVIEncrypt(
      addr: number,
      encryptType: DVIEncryptTypeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSender_EnableDVIEncrypt<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  encryptType: DVIEncryptTypeEnum
): Request<Broadcast> {
  const req = new Request(
    encryptType === DVIEncryptTypeEnum.EnableEncrypt
      ? [72]
      : encryptType === DVIEncryptTypeEnum.DisableEncrypt
        ? [139]
        : encryptType === DVIEncryptTypeEnum.None
          ? [255]
          : [0],
    bBroadcast,
    'SetSender_EnableDVIEncrypt'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_EnableDVIEncryptAddr;
  return req;
}
Session.prototype.SetSender_EnableDVIEncrypt = async function SetSender_EnableDVIEncrypt(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  encryptType: DVIEncryptTypeEnum
): Promise<void> {
  const req = createSetSender_EnableDVIEncrypt(addr, bBroadcast, encryptType);
  await this.connection.send(req);
};
Session.prototype.trySetSender_EnableDVIEncrypt = async function trySetSender_EnableDVIEncrypt(
  this: Session,
  addr: number,
  encryptType: DVIEncryptTypeEnum
): Promise<ErrorType | null> {
  const req = createSetSender_EnableDVIEncrypt(addr, false, encryptType);
  return (await this.connection.trySend(req))?.ack ?? null;
};
