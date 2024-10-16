import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetControllerSnHigh(addr: number, controllerSnHigh: number[] | Buffer): Promise<void>;
    trySetControllerSnHigh(
      addr: number,
      controllerSnHigh: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetControllerSnHigh(
  addr: number,
  controllerSnHigh: number[] | Buffer
): Request {
  if (controllerSnHigh.length !== AddressMapping.ControllerSnHighOccupancy)
    throw new TypeError(`Invalid buffer size: ${controllerSnHigh.length}`);
  const req = new Request(controllerSnHigh, false, 'SetControllerSnHigh');
  req.destination = addr;
  req.address = AddressMapping.ControllerSnHighAddr;
  return req;
}
Session.prototype.SetControllerSnHigh = async function SetControllerSnHigh(
  this: Session,
  addr: number,
  controllerSnHigh: number[] | Buffer
): Promise<void> {
  const req = createSetControllerSnHigh(addr, controllerSnHigh);
  await this.connection.send(req);
};
Session.prototype.trySetControllerSnHigh = async function trySetControllerSnHigh(
  this: Session,
  addr: number,
  controllerSnHigh: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetControllerSnHigh(addr, controllerSnHigh);
  return (await this.connection.trySend(req))?.ack ?? null;
};
