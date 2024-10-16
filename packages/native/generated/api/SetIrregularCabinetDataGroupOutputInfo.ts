import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetIrregularCabinetDataGroupOutputInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      data: number[] | Buffer
    ): Promise<void>;
    trySetIrregularCabinetDataGroupOutputInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      data: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetIrregularCabinetDataGroupOutputInfo<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  data: number[] | Buffer
): Request<Broadcast> {
  const req = new Request(data, bBroadcast, 'SetIrregularCabinetDataGroupOutputInfo');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.IrRegular_DataGroupOutputInfoAddr;
  return req;
}
Session.prototype.SetIrregularCabinetDataGroupOutputInfo =
  async function SetIrregularCabinetDataGroupOutputInfo(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    const req = createSetIrregularCabinetDataGroupOutputInfo(
      addr,
      portAddr,
      scanBoardAddr,
      bBroadcast,
      data
    );
    await this.connection.send(req);
  };
Session.prototype.trySetIrregularCabinetDataGroupOutputInfo =
  async function trySetIrregularCabinetDataGroupOutputInfo(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    data: number[] | Buffer
  ): Promise<ErrorType | null> {
    const req = createSetIrregularCabinetDataGroupOutputInfo(
      addr,
      portAddr,
      scanBoardAddr,
      false,
      data
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
