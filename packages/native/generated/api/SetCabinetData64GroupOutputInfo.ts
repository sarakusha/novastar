import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetCabinetData64GroupOutputInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      data: number[] | Buffer
    ): Promise<void>;
    trySetCabinetData64GroupOutputInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      data: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetCabinetData64GroupOutputInfo<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  data: number[] | Buffer
): Request<Broadcast> {
  const req = new Request(data, bBroadcast, 'SetCabinetData64GroupOutputInfo');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Data64GroupOutputInfoAddr;
  return req;
}
Session.prototype.SetCabinetData64GroupOutputInfo = async function SetCabinetData64GroupOutputInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  data: number[] | Buffer
): Promise<void> {
  const req = createSetCabinetData64GroupOutputInfo(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    data
  );
  await this.connection.send(req);
};
Session.prototype.trySetCabinetData64GroupOutputInfo =
  async function trySetCabinetData64GroupOutputInfo(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    data: number[] | Buffer
  ): Promise<ErrorType | null> {
    const req = createSetCabinetData64GroupOutputInfo(addr, portAddr, scanBoardAddr, false, data);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
