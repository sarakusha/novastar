import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { ResetAndSwitchCommandTypeEnum } from '../ResetAndSwitchCommandType';

declare module '@novastar/codec' {
  interface API {
    WriteScannerResetCommand(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      resetType: ResetAndSwitchCommandTypeEnum
    ): Promise<void>;
    tryWriteScannerResetCommand(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      resetType: ResetAndSwitchCommandTypeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createWriteScannerResetCommand<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  resetType: ResetAndSwitchCommandTypeEnum
): Request<Broadcast> {
  const req = new Request([resetType], bBroadcast, 'WriteScannerResetCommand');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScannerResetAndSwitchAddr;
  return req;
}
Session.prototype.WriteScannerResetCommand = async function WriteScannerResetCommand(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  resetType: ResetAndSwitchCommandTypeEnum
): Promise<void> {
  const req = createWriteScannerResetCommand(addr, portAddr, scanBoardAddr, bBroadcast, resetType);
  await this.connection.send(req);
};
Session.prototype.tryWriteScannerResetCommand = async function tryWriteScannerResetCommand(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  resetType: ResetAndSwitchCommandTypeEnum
): Promise<ErrorType | null> {
  const req = createWriteScannerResetCommand(addr, portAddr, scanBoardAddr, false, resetType);
  return (await this.connection.trySend(req))?.ack ?? null;
};
