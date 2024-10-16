import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadPortHeight(addr: number, index: number): Promise<number>;
    tryReadPortHeight(addr: number, index: number): Promise<Packet | null>;
  }
}
export default function createReadPortHeight(addr: number, index: number): Request {
  const req = new Request(AddressMapping.PortHeightOccupancy, 'ReadPortHeight');
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
Session.prototype.ReadPortHeight = async function ReadPortHeight(
  this: Session,
  addr: number,
  index: number
): Promise<number> {
  const req = createReadPortHeight(addr, index);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadPortHeight = async function tryReadPortHeight(
  this: Session,
  addr: number,
  index: number
): Promise<Packet | null> {
  const req = createReadPortHeight(addr, index);
  return this.connection.trySend(req);
};
