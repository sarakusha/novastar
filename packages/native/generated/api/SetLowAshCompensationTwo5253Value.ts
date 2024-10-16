import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetLowAshCompensationTwo5253Value(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      LowAshCompensationTwo5253Value: number
    ): Promise<void>;
    trySetLowAshCompensationTwo5253Value(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      LowAshCompensationTwo5253Value: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetLowAshCompensationTwo5253Value<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  LowAshCompensationTwo5253Value: number
): Request<Broadcast> {
  const req = new Request(
    [LowAshCompensationTwo5253Value],
    bBroadcast,
    'SetLowAshCompensationTwo5253Value'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.LowAshCompensationTwo5253Addr;
  return req;
}
Session.prototype.SetLowAshCompensationTwo5253Value =
  async function SetLowAshCompensationTwo5253Value(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    LowAshCompensationTwo5253Value: number
  ): Promise<void> {
    const req = createSetLowAshCompensationTwo5253Value(
      addr,
      portAddr,
      scanBoardAddr,
      bBroadcast,
      LowAshCompensationTwo5253Value
    );
    await this.connection.send(req);
  };
Session.prototype.trySetLowAshCompensationTwo5253Value =
  async function trySetLowAshCompensationTwo5253Value(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    LowAshCompensationTwo5253Value: number
  ): Promise<ErrorType | null> {
    const req = createSetLowAshCompensationTwo5253Value(
      addr,
      portAddr,
      scanBoardAddr,
      false,
      LowAshCompensationTwo5253Value
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
