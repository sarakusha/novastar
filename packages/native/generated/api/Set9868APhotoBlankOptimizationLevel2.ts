import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Set9868APhotoBlankOptimizationLevel2(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      blankLevelValue: number
    ): Promise<void>;
    trySet9868APhotoBlankOptimizationLevel2(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      blankLevelValue: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSet9868APhotoBlankOptimizationLevel2<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  blankLevelValue: number
): Request<Broadcast> {
  const req = new Request([blankLevelValue], bBroadcast, 'Set9868APhotoBlankOptimizationLevel2');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_9868APhotoBlankOptimizationLevelAddr2;
  return req;
}
Session.prototype.Set9868APhotoBlankOptimizationLevel2 =
  async function Set9868APhotoBlankOptimizationLevel2(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    blankLevelValue: number
  ): Promise<void> {
    const req = createSet9868APhotoBlankOptimizationLevel2(
      addr,
      portAddr,
      scanBoardAddr,
      bBroadcast,
      blankLevelValue
    );
    await this.connection.send(req);
  };
Session.prototype.trySet9868APhotoBlankOptimizationLevel2 =
  async function trySet9868APhotoBlankOptimizationLevel2(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    blankLevelValue: number
  ): Promise<ErrorType | null> {
    const req = createSet9868APhotoBlankOptimizationLevel2(
      addr,
      portAddr,
      scanBoardAddr,
      false,
      blankLevelValue
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
