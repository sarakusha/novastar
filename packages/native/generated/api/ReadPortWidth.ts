import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadPortWidth(addr: number, index: number): Promise<number>;
    tryReadPortWidth(addr: number, index: number): Promise<Packet | null>;
  }
}
export default function createReadPortWidth(addr: number, index: number): Request {
  const req = new Request(AddressMapping.PortWidthOccupancy, 'ReadPortWidth');
  req.destination = addr;
  req.address = 0;
  if (index >= AddressMapping.New32PortOccupancy) {
    req.address =
      AddressMapping.PortWidthNew32Addr +
      AddressMapping.PortOccupancy * (index - AddressMapping.New32PortOccupancy);
  } else if (index >= AddressMapping.New16PortOccupancy) {
    req.address =
      AddressMapping.PortWidthNew16Addr +
      AddressMapping.PortOccupancy * (index - AddressMapping.New16PortOccupancy);
  } else if (index >= AddressMapping.NewPortOccupancy) {
    req.address =
      AddressMapping.PortWidthNewAddr +
      AddressMapping.PortOccupancy * (index - AddressMapping.NewPortOccupancy);
  } else {
    req.address = AddressMapping.PortWidthAddr + AddressMapping.PortOccupancy * index;
  }
  return req;
}
Session.prototype.ReadPortWidth = async function ReadPortWidth(
  this: Session,
  addr: number,
  index: number
): Promise<number> {
  const req = createReadPortWidth(addr, index);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadPortWidth = async function tryReadPortWidth(
  this: Session,
  addr: number,
  index: number
): Promise<Packet | null> {
  const req = createReadPortWidth(addr, index);
  return this.connection.trySend(req);
};
