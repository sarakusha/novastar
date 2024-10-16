import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetFreeVirtualNetworkPort(
      addr: number,
      bBroadcast: boolean,
      number: number,
      portIndex: number
    ): Promise<void>;
    trySetFreeVirtualNetworkPort(
      addr: number,
      number: number,
      portIndex: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetFreeVirtualNetworkPort<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  number: number,
  portIndex: number
): Request<Broadcast> {
  const $data = encodeUIntLE(number, AddressMapping.NumberOfCardOrBoardInPortOccupancy);
  const req = new Request($data, bBroadcast, 'SetFreeVirtualNetworkPort');
  req.destination = addr;
  req.address = AddressMapping.FreeVirtualNetPortAddr + portIndex * 2;
  return req;
}
Session.prototype.SetFreeVirtualNetworkPort = async function SetFreeVirtualNetworkPort(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  number: number,
  portIndex: number
): Promise<void> {
  const req = createSetFreeVirtualNetworkPort(addr, bBroadcast, number, portIndex);
  await this.connection.send(req);
};
Session.prototype.trySetFreeVirtualNetworkPort = async function trySetFreeVirtualNetworkPort(
  this: Session,
  addr: number,
  number: number,
  portIndex: number
): Promise<ErrorType | null> {
  const req = createSetFreeVirtualNetworkPort(addr, false, number, portIndex);
  return (await this.connection.trySend(req))?.ack ?? null;
};
