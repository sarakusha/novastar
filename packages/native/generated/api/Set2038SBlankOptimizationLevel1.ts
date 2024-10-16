import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Set2038SBlankOptimizationLevel1(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      blankLevelValue: number
    ): Promise<void>;
    trySet2038SBlankOptimizationLevel1(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      blankLevelValue: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSet2038SBlankOptimizationLevel1<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  blankLevelValue: number
): Request<Broadcast> {
  const req = new Request([blankLevelValue], bBroadcast, 'Set2038SBlankOptimizationLevel1');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_2038SBlankOptimizationLevelAddr1;
  return req;
}
Session.prototype.Set2038SBlankOptimizationLevel1 = async function Set2038SBlankOptimizationLevel1(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  blankLevelValue: number
): Promise<void> {
  const req = createSet2038SBlankOptimizationLevel1(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    blankLevelValue
  );
  await this.connection.send(req);
};
Session.prototype.trySet2038SBlankOptimizationLevel1 =
  async function trySet2038SBlankOptimizationLevel1(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    blankLevelValue: number
  ): Promise<ErrorType | null> {
    const req = createSet2038SBlankOptimizationLevel1(
      addr,
      portAddr,
      scanBoardAddr,
      false,
      blankLevelValue
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
