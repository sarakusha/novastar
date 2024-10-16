import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetPortOffsetX(
      addr: number,
      bBroadcast: boolean,
      portOffsetX: number,
      index: number
    ): Promise<void>;
    trySetPortOffsetX(addr: number, portOffsetX: number, index: number): Promise<ErrorType | null>;
  }
}
export default function createSetPortOffsetX<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  portOffsetX: number,
  index: number
): Request<Broadcast> {
  const $data = encodeUIntLE(portOffsetX, AddressMapping.PortOffsetXOccupancy);
  const req = new Request($data, bBroadcast, 'SetPortOffsetX');
  req.destination = addr;
  req.address = 0;
  if (index >= AddressMapping.New32PortOccupancy) {
    req.address =
      AddressMapping.PortOffsetXNew32Addr +
      AddressMapping.PortOccupancy * (index - AddressMapping.New32PortOccupancy);
  } else if (index >= AddressMapping.New16PortOccupancy) {
    req.address =
      AddressMapping.PortOffsetXNew16Addr +
      AddressMapping.PortOccupancy * (index - AddressMapping.New16PortOccupancy);
  } else if (index >= AddressMapping.NewPortOccupancy) {
    req.address =
      AddressMapping.PortOffsetXNewAddr +
      AddressMapping.PortOccupancy * (index - AddressMapping.NewPortOccupancy);
  } else {
    req.address = AddressMapping.PortOffsetXAddr + AddressMapping.PortOccupancy * index;
  }
  return req;
}
Session.prototype.SetPortOffsetX = async function SetPortOffsetX(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  portOffsetX: number,
  index: number
): Promise<void> {
  const req = createSetPortOffsetX(addr, bBroadcast, portOffsetX, index);
  await this.connection.send(req);
};
Session.prototype.trySetPortOffsetX = async function trySetPortOffsetX(
  this: Session,
  addr: number,
  portOffsetX: number,
  index: number
): Promise<ErrorType | null> {
  const req = createSetPortOffsetX(addr, false, portOffsetX, index);
  return (await this.connection.trySend(req))?.ack ?? null;
};
