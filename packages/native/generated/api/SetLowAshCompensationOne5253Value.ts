import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetLowAshCompensationOne5253Value(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      LowAshCompensationOne5253Value: number
    ): Promise<void>;
    trySetLowAshCompensationOne5253Value(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      LowAshCompensationOne5253Value: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetLowAshCompensationOne5253Value<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  LowAshCompensationOne5253Value: number
): Request<Broadcast> {
  const req = new Request(
    [LowAshCompensationOne5253Value],
    bBroadcast,
    'SetLowAshCompensationOne5253Value'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.LowAshCompensationOne5253Addr;
  return req;
}
Session.prototype.SetLowAshCompensationOne5253Value =
  async function SetLowAshCompensationOne5253Value(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    LowAshCompensationOne5253Value: number
  ): Promise<void> {
    const req = createSetLowAshCompensationOne5253Value(
      addr,
      portAddr,
      scanBoardAddr,
      bBroadcast,
      LowAshCompensationOne5253Value
    );
    await this.connection.send(req);
  };
Session.prototype.trySetLowAshCompensationOne5253Value =
  async function trySetLowAshCompensationOne5253Value(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    LowAshCompensationOne5253Value: number
  ): Promise<ErrorType | null> {
    const req = createSetLowAshCompensationOne5253Value(
      addr,
      portAddr,
      scanBoardAddr,
      false,
      LowAshCompensationOne5253Value
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
