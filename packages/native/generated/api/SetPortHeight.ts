import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetPortHeight(
      addr: number,
      bBroadcast: boolean,
      portHeight: number,
      index: number
    ): Promise<void>;
    trySetPortHeight(addr: number, portHeight: number, index: number): Promise<ErrorType | null>;
  }
}
export default function createSetPortHeight<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  portHeight: number,
  index: number
): Request<Broadcast> {
  const $data = encodeUIntLE(portHeight, AddressMapping.PortHeightOccupancy);
  const req = new Request($data, bBroadcast, 'SetPortHeight');
  req.destination = addr;
  req.address = 0;
  if (index >= AddressMapping.New32PortOccupancy) {
    req.address =
      AddressMapping.PortHeightNew32Addr +
      AddressMapping.PortOccupancy * (index - AddressMapping.New32PortOccupancy);
  } else if (index >= AddressMapping.New16PortOccupancy) {
    req.address =
      AddressMapping.PortHeightNew16Addr +
      AddressMapping.PortOccupancy * (index - AddressMapping.New16PortOccupancy);
  } else if (index >= AddressMapping.NewPortOccupancy) {
    req.address =
      AddressMapping.PortHeightNewAddr +
      AddressMapping.PortOccupancy * (index - AddressMapping.NewPortOccupancy);
  } else {
    req.address = AddressMapping.PortHeightAddr + AddressMapping.PortOccupancy * index;
  }
  return req;
}
Session.prototype.SetPortHeight = async function SetPortHeight(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  portHeight: number,
  index: number
): Promise<void> {
  const req = createSetPortHeight(addr, bBroadcast, portHeight, index);
  await this.connection.send(req);
};
Session.prototype.trySetPortHeight = async function trySetPortHeight(
  this: Session,
  addr: number,
  portHeight: number,
  index: number
): Promise<ErrorType | null> {
  const req = createSetPortHeight(addr, false, portHeight, index);
  return (await this.connection.trySend(req))?.ack ?? null;
};
