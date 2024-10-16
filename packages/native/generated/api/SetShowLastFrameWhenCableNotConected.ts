import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { ShowTypeWhenPortDisconnectedEnum } from '../ShowTypeWhenPortDisconnected';

declare module '@novastar/codec' {
  interface API {
    SetShowLastFrameWhenCableNotConected(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      showMode: ShowTypeWhenPortDisconnectedEnum
    ): Promise<void>;
    trySetShowLastFrameWhenCableNotConected(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      showMode: ShowTypeWhenPortDisconnectedEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createSetShowLastFrameWhenCableNotConected<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  showMode: ShowTypeWhenPortDisconnectedEnum
): Request<Broadcast> {
  const $data = encodeUIntLE(showMode, AddressMapping.ShowLastFrameWhenCableNotConectedOccupancy);
  const req = new Request($data, bBroadcast, 'SetShowLastFrameWhenCableNotConected');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ShowLastFrameWhenCableNotConectedAddr;
  return req;
}
Session.prototype.SetShowLastFrameWhenCableNotConected =
  async function SetShowLastFrameWhenCableNotConected(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    showMode: ShowTypeWhenPortDisconnectedEnum
  ): Promise<void> {
    const req = createSetShowLastFrameWhenCableNotConected(
      addr,
      portAddr,
      scanBoardAddr,
      bBroadcast,
      showMode
    );
    await this.connection.send(req);
  };
Session.prototype.trySetShowLastFrameWhenCableNotConected =
  async function trySetShowLastFrameWhenCableNotConected(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    showMode: ShowTypeWhenPortDisconnectedEnum
  ): Promise<ErrorType | null> {
    const req = createSetShowLastFrameWhenCableNotConected(
      addr,
      portAddr,
      scanBoardAddr,
      false,
      showMode
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
