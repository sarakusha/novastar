import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetPortOffsetY(
      addr: number,
      bBroadcast: boolean,
      portOffsetY: number,
      index: number
    ): Promise<void>;
    trySetPortOffsetY(addr: number, portOffsetY: number, index: number): Promise<ErrorType | null>;
  }
}
export default function createSetPortOffsetY<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  portOffsetY: number,
  index: number
): Request<Broadcast> {
  const $data = encodeUIntLE(portOffsetY, AddressMapping.PortOffsetYOccupancy);
  const req = new Request($data, bBroadcast, 'SetPortOffsetY');
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
Session.prototype.SetPortOffsetY = async function SetPortOffsetY(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  portOffsetY: number,
  index: number
): Promise<void> {
  const req = createSetPortOffsetY(addr, bBroadcast, portOffsetY, index);
  await this.connection.send(req);
};
Session.prototype.trySetPortOffsetY = async function trySetPortOffsetY(
  this: Session,
  addr: number,
  portOffsetY: number,
  index: number
): Promise<ErrorType | null> {
  const req = createSetPortOffsetY(addr, false, portOffsetY, index);
  return (await this.connection.trySend(req))?.ack ?? null;
};
