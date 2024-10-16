import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSingleChipMicyocoSpace(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      singleChipMicyocoSpace: number
    ): Promise<void>;
    trySetSingleChipMicyocoSpace(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      singleChipMicyocoSpace: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSingleChipMicyocoSpace<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  singleChipMicyocoSpace: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    singleChipMicyocoSpace,
    AddressMapping.ConnectRelayTemperatureOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetSingleChipMicyocoSpace');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.SingleChipMicyocoSpaceAddr;
  return req;
}
Session.prototype.SetSingleChipMicyocoSpace = async function SetSingleChipMicyocoSpace(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  singleChipMicyocoSpace: number
): Promise<void> {
  const req = createSetSingleChipMicyocoSpace(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    singleChipMicyocoSpace
  );
  await this.connection.send(req);
};
Session.prototype.trySetSingleChipMicyocoSpace = async function trySetSingleChipMicyocoSpace(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  singleChipMicyocoSpace: number
): Promise<ErrorType | null> {
  const req = createSetSingleChipMicyocoSpace(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    singleChipMicyocoSpace
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
