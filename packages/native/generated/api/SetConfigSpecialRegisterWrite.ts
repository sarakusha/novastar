import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetConfigSpecialRegisterWrite(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      data: number[] | Buffer
    ): Promise<void>;
    trySetConfigSpecialRegisterWrite(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      data: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetConfigSpecialRegisterWrite<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  data: number[] | Buffer
): Request<Broadcast> {
  if (data.length !== AddressMapping.ConfigSpecialRegisterOccupancy)
    throw new TypeError(`Invalid buffer size: ${data.length}`);
  const req = new Request(data, bBroadcast, 'SetConfigSpecialRegisterWrite');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ConfigSpecialRegisterAddr;
  return req;
}
Session.prototype.SetConfigSpecialRegisterWrite = async function SetConfigSpecialRegisterWrite(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  data: number[] | Buffer
): Promise<void> {
  const req = createSetConfigSpecialRegisterWrite(addr, portAddr, scanBoardAddr, bBroadcast, data);
  await this.connection.send(req);
};
Session.prototype.trySetConfigSpecialRegisterWrite =
  async function trySetConfigSpecialRegisterWrite(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    data: number[] | Buffer
  ): Promise<ErrorType | null> {
    const req = createSetConfigSpecialRegisterWrite(addr, portAddr, scanBoardAddr, false, data);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
