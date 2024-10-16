import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadPortOffsetY(addr: number, index: number): Promise<number>;
    tryReadPortOffsetY(addr: number, index: number): Promise<Packet | null>;
  }
}
export default function createReadPortOffsetY(addr: number, index: number): Request {
  const req = new Request(AddressMapping.PortOffsetYOccupancy, 'ReadPortOffsetY');
  req.destination = addr;
  req.address = 0;
  if (index >= AddressMapping.New32PortOccupancy) {
    req.address =
      AddressMapping.PortOffsetYNew32Addr +
      AddressMapping.PortOccupancy * (index - AddressMapping.New32PortOccupancy);
  } else if (index >= AddressMapping.New16PortOccupancy) {
    req.address =
      AddressMapping.PortOffsetYNew16Addr +
      AddressMapping.PortOccupancy * (index - AddressMapping.New16PortOccupancy);
  } else if (index >= AddressMapping.NewPortOccupancy) {
    req.address =
      AddressMapping.PortOffsetYNewAddr +
      AddressMapping.PortOccupancy * (index - AddressMapping.NewPortOccupancy);
  } else {
    req.address = AddressMapping.PortOffsetYAddr + AddressMapping.PortOccupancy * index;
  }
  return req;
}
Session.prototype.ReadPortOffsetY = async function ReadPortOffsetY(
  this: Session,
  addr: number,
  index: number
): Promise<number> {
  const req = createReadPortOffsetY(addr, index);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadPortOffsetY = async function tryReadPortOffsetY(
  this: Session,
  addr: number,
  index: number
): Promise<Packet | null> {
  const req = createReadPortOffsetY(addr, index);
  return this.connection.trySend(req);
};
