import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadPortEnable(addr: number, index: number): Promise<number>;
    tryReadPortEnable(addr: number, index: number): Promise<Packet | null>;
  }
}
export default function createReadPortEnable(addr: number, index: number): Request {
  const req = new Request(AddressMapping.PortEnableOccupancy, 'ReadPortEnable');
  req.destination = addr;
  req.address = 0;
  if (index >= AddressMapping.New32PortOccupancy) {
    req.address =
      AddressMapping.PortEnableNext32Addr +
      AddressMapping.PortOccupancy * (index - AddressMapping.New32PortOccupancy);
  } else if (index >= AddressMapping.New16PortOccupancy) {
    req.address =
      AddressMapping.PortEnableNext16Addr +
      AddressMapping.PortOccupancy * (index - AddressMapping.New16PortOccupancy);
  } else if (index >= AddressMapping.NewPortOccupancy) {
    req.address =
      AddressMapping.PortEnableNextAddr +
      AddressMapping.PortOccupancy * (index - AddressMapping.NewPortOccupancy);
  } else {
    req.address = AddressMapping.PortEnableAddr + AddressMapping.PortOccupancy * index;
  }
  return req;
}
Session.prototype.ReadPortEnable = async function ReadPortEnable(
  this: Session,
  addr: number,
  index: number
): Promise<number> {
  const req = createReadPortEnable(addr, index);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadPortEnable = async function tryReadPortEnable(
  this: Session,
  addr: number,
  index: number
): Promise<Packet | null> {
  const req = createReadPortEnable(addr, index);
  return this.connection.trySend(req);
};
