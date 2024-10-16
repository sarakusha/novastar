import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { BaudRateTypeEnum } from '../BaudRateType';
import makeOutDeviceBytes from '../../lib/common/makeOutDeviceBytes';

declare module '@novastar/codec' {
  interface API {
    FuncCard_SetOutDevice_2(
      addr: number,
      bBroadcast: boolean,
      outDeviceAddr: number,
      baudType: BaudRateTypeEnum,
      otherDeviceProtocol: number[] | Buffer
    ): Promise<void>;
    tryFuncCard_SetOutDevice_2(
      addr: number,
      outDeviceAddr: number,
      baudType: BaudRateTypeEnum,
      otherDeviceProtocol: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createFuncCard_SetOutDevice_2<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  outDeviceAddr: number,
  baudType: BaudRateTypeEnum,
  otherDeviceProtocol: number[] | Buffer
): Request<Broadcast> {
  const $data = makeOutDeviceBytes(outDeviceAddr, baudType, otherDeviceProtocol);
  const req = new Request($data, bBroadcast, 'FuncCard_SetOutDevice_2');
  req.destination = addr;
  req.address = AddressMapping.FuncCard_WriteOutDeviceAddr;
  return req;
}
Session.prototype.FuncCard_SetOutDevice_2 = async function FuncCard_SetOutDevice_2(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  outDeviceAddr: number,
  baudType: BaudRateTypeEnum,
  otherDeviceProtocol: number[] | Buffer
): Promise<void> {
  const req = createFuncCard_SetOutDevice_2(
    addr,
    bBroadcast,
    outDeviceAddr,
    baudType,
    otherDeviceProtocol
  );
  await this.connection.send(req);
};
Session.prototype.tryFuncCard_SetOutDevice_2 = async function tryFuncCard_SetOutDevice_2(
  this: Session,
  addr: number,
  outDeviceAddr: number,
  baudType: BaudRateTypeEnum,
  otherDeviceProtocol: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createFuncCard_SetOutDevice_2(
    addr,
    false,
    outDeviceAddr,
    baudType,
    otherDeviceProtocol
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
