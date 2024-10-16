import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetPortOfDVI(
      addr: number,
      bBroadcast: boolean,
      dviIndex: number,
      portIndex: number
    ): Promise<void>;
    trySetPortOfDVI(addr: number, dviIndex: number, portIndex: number): Promise<ErrorType | null>;
  }
}
export default function createSetPortOfDVI<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  dviIndex: number,
  portIndex: number
): Request<Broadcast> {
  const req = new Request([dviIndex], bBroadcast, 'SetPortOfDVI');
  req.destination = addr;
  req.address = 0;
  if (portIndex >= AddressMapping.New32PortOccupancy) {
    req.address =
      AddressMapping.DVIOfPortInfoNext32Addr +
      AddressMapping.DVIOfPortInfoNext32Occupancy * (portIndex - AddressMapping.New32PortOccupancy);
  } else {
    req.address = AddressMapping.DVIOfPortInfoAddr + portIndex;
  }
  return req;
}
Session.prototype.SetPortOfDVI = async function SetPortOfDVI(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  dviIndex: number,
  portIndex: number
): Promise<void> {
  const req = createSetPortOfDVI(addr, bBroadcast, dviIndex, portIndex);
  await this.connection.send(req);
};
Session.prototype.trySetPortOfDVI = async function trySetPortOfDVI(
  this: Session,
  addr: number,
  dviIndex: number,
  portIndex: number
): Promise<ErrorType | null> {
  const req = createSetPortOfDVI(addr, false, dviIndex, portIndex);
  return (await this.connection.trySend(req))?.ack ?? null;
};
