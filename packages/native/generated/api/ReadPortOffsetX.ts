import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadPortOffsetX(addr: number, index: number): Promise<number>;
    tryReadPortOffsetX(addr: number, index: number): Promise<Packet | null>;
  }
}
export default function createReadPortOffsetX(addr: number, index: number): Request {
  const req = new Request(AddressMapping.PortOffsetXOccupancy, 'ReadPortOffsetX');
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
Session.prototype.ReadPortOffsetX = async function ReadPortOffsetX(
  this: Session,
  addr: number,
  index: number
): Promise<number> {
  const req = createReadPortOffsetX(addr, index);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadPortOffsetX = async function tryReadPortOffsetX(
  this: Session,
  addr: number,
  index: number
): Promise<Packet | null> {
  const req = createReadPortOffsetX(addr, index);
  return this.connection.trySend(req);
};
