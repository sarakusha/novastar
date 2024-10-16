import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScanner_MutiChipRamC(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      mutiChipRamC: number[] | Buffer
    ): Promise<void>;
    trySetScanner_MutiChipRamC(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      mutiChipRamC: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanner_MutiChipRamC<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  mutiChipRamC: number[] | Buffer
): Request<Broadcast> {
  if (mutiChipRamC.length !== 0) throw new TypeError(`Invalid buffer size: ${mutiChipRamC.length}`);
  const req = new Request(mutiChipRamC, bBroadcast, 'SetScanner_MutiChipRamC');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_MutiChipRamCAddr;
  return req;
}
Session.prototype.SetScanner_MutiChipRamC = async function SetScanner_MutiChipRamC(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  mutiChipRamC: number[] | Buffer
): Promise<void> {
  const req = createSetScanner_MutiChipRamC(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    mutiChipRamC
  );
  await this.connection.send(req);
};
Session.prototype.trySetScanner_MutiChipRamC = async function trySetScanner_MutiChipRamC(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  mutiChipRamC: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetScanner_MutiChipRamC(addr, portAddr, scanBoardAddr, false, mutiChipRamC);
  return (await this.connection.trySend(req))?.ack ?? null;
};
