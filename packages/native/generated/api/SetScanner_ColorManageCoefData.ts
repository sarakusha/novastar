import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScanner_ColorManageCoefData(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      colorRestore: number[] | Buffer
    ): Promise<void>;
    trySetScanner_ColorManageCoefData(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      colorRestore: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanner_ColorManageCoefData<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  colorRestore: number[] | Buffer
): Request<Broadcast> {
  const req = new Request(colorRestore, bBroadcast, 'SetScanner_ColorManageCoefData');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ColorManageInfoAddr;
  return req;
}
Session.prototype.SetScanner_ColorManageCoefData = async function SetScanner_ColorManageCoefData(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  colorRestore: number[] | Buffer
): Promise<void> {
  const req = createSetScanner_ColorManageCoefData(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    colorRestore
  );
  await this.connection.send(req);
};
Session.prototype.trySetScanner_ColorManageCoefData =
  async function trySetScanner_ColorManageCoefData(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    colorRestore: number[] | Buffer
  ): Promise<ErrorType | null> {
    const req = createSetScanner_ColorManageCoefData(
      addr,
      portAddr,
      scanBoardAddr,
      false,
      colorRestore
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
