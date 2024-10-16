import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetVirtualWindowBmpTimeoutSet(
      addr: number,
      bBroadcast: boolean,
      virtuaWindowBmpTimeoutSet: number
    ): Promise<void>;
    trySetVirtualWindowBmpTimeoutSet(
      addr: number,
      virtuaWindowBmpTimeoutSet: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetVirtualWindowBmpTimeoutSet<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  virtuaWindowBmpTimeoutSet: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    virtuaWindowBmpTimeoutSet,
    AddressMapping.VirtualWindowBmpTimeoutSetOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetVirtualWindowBmpTimeoutSet');
  req.destination = addr;
  req.address = AddressMapping.VirtualWindowBmpTimeoutSetAddr;
  return req;
}
Session.prototype.SetVirtualWindowBmpTimeoutSet = async function SetVirtualWindowBmpTimeoutSet(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  virtuaWindowBmpTimeoutSet: number
): Promise<void> {
  const req = createSetVirtualWindowBmpTimeoutSet(addr, bBroadcast, virtuaWindowBmpTimeoutSet);
  await this.connection.send(req);
};
Session.prototype.trySetVirtualWindowBmpTimeoutSet =
  async function trySetVirtualWindowBmpTimeoutSet(
    this: Session,
    addr: number,
    virtuaWindowBmpTimeoutSet: number
  ): Promise<ErrorType | null> {
    const req = createSetVirtualWindowBmpTimeoutSet(addr, false, virtuaWindowBmpTimeoutSet);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
