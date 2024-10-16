import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetPortEnable(
      addr: number,
      bBroadcast: boolean,
      portEnable: number,
      index: number
    ): Promise<void>;
    trySetPortEnable(addr: number, portEnable: number, index: number): Promise<ErrorType | null>;
  }
}
export default function createSetPortEnable<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  portEnable: number,
  index: number
): Request<Broadcast> {
  const $data = encodeUIntLE(portEnable, AddressMapping.PortEnableOccupancy);
  const req = new Request($data, bBroadcast, 'SetPortEnable');
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
Session.prototype.SetPortEnable = async function SetPortEnable(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  portEnable: number,
  index: number
): Promise<void> {
  const req = createSetPortEnable(addr, bBroadcast, portEnable, index);
  await this.connection.send(req);
};
Session.prototype.trySetPortEnable = async function trySetPortEnable(
  this: Session,
  addr: number,
  portEnable: number,
  index: number
): Promise<ErrorType | null> {
  const req = createSetPortEnable(addr, false, portEnable, index);
  return (await this.connection.trySend(req))?.ack ?? null;
};
