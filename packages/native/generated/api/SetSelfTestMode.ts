import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { TestModeEnum } from '../TestMode';

declare module '@novastar/codec' {
  interface API {
    SetSelfTestMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      selfTestMode: TestModeEnum
    ): Promise<void>;
    trySetSelfTestMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      selfTestMode: TestModeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSelfTestMode<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  selfTestMode: TestModeEnum
): Request<Broadcast> {
  const $data = encodeUIntLE(selfTestMode, AddressMapping.SelfTestModeOccupancy);
  const req = new Request($data, bBroadcast, 'SetSelfTestMode');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.SelfTestModeAddr;
  return req;
}
Session.prototype.SetSelfTestMode = async function SetSelfTestMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  selfTestMode: TestModeEnum
): Promise<void> {
  const req = createSetSelfTestMode(addr, portAddr, scanBoardAddr, bBroadcast, selfTestMode);
  await this.connection.send(req);
};
Session.prototype.trySetSelfTestMode = async function trySetSelfTestMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  selfTestMode: TestModeEnum
): Promise<ErrorType | null> {
  const req = createSetSelfTestMode(addr, portAddr, scanBoardAddr, false, selfTestMode);
  return (await this.connection.trySend(req))?.ack ?? null;
};
