import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetDoubleCardEaraseState(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      EaraseTag: number
    ): Promise<void>;
    trySetDoubleCardEaraseState(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      EaraseTag: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetDoubleCardEaraseState<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  EaraseTag: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    EaraseTag,
    AddressMapping.DoubleModelCardSpaceNandFlashEaraseOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetDoubleCardEaraseState');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DoubleModelCardSpaceNandFlashEarase;
  return req;
}
Session.prototype.SetDoubleCardEaraseState = async function SetDoubleCardEaraseState(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  EaraseTag: number
): Promise<void> {
  const req = createSetDoubleCardEaraseState(addr, portAddr, scanBoardAddr, bBroadcast, EaraseTag);
  await this.connection.send(req);
};
Session.prototype.trySetDoubleCardEaraseState = async function trySetDoubleCardEaraseState(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  EaraseTag: number
): Promise<ErrorType | null> {
  const req = createSetDoubleCardEaraseState(addr, portAddr, scanBoardAddr, false, EaraseTag);
  return (await this.connection.trySend(req))?.ack ?? null;
};
