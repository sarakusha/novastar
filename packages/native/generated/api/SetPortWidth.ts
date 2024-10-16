import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetPortWidth(
      addr: number,
      bBroadcast: boolean,
      portWidth: number,
      index: number
    ): Promise<void>;
    trySetPortWidth(addr: number, portWidth: number, index: number): Promise<ErrorType | null>;
  }
}
export default function createSetPortWidth<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  portWidth: number,
  index: number
): Request<Broadcast> {
  const $data = encodeUIntLE(portWidth, AddressMapping.PortWidthOccupancy);
  const req = new Request($data, bBroadcast, 'SetPortWidth');
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
Session.prototype.SetPortWidth = async function SetPortWidth(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  portWidth: number,
  index: number
): Promise<void> {
  const req = createSetPortWidth(addr, bBroadcast, portWidth, index);
  await this.connection.send(req);
};
Session.prototype.trySetPortWidth = async function trySetPortWidth(
  this: Session,
  addr: number,
  portWidth: number,
  index: number
): Promise<ErrorType | null> {
  const req = createSetPortWidth(addr, false, portWidth, index);
  return (await this.connection.trySend(req))?.ack ?? null;
};
