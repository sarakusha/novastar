import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetMBI5252AutoResetTime(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      mutiChipRamA: number[] | Buffer
    ): Promise<void>;
    trySetMBI5252AutoResetTime(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      mutiChipRamA: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetMBI5252AutoResetTime<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  mutiChipRamA: number[] | Buffer
): Request<Broadcast> {
  if (mutiChipRamA.length !== 0) throw new TypeError(`Invalid buffer size: ${mutiChipRamA.length}`);
  const req = new Request(mutiChipRamA, bBroadcast, 'SetMBI5252AutoResetTime');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.MBI5252SetAutoResetTimeAddr;
  return req;
}
Session.prototype.SetMBI5252AutoResetTime = async function SetMBI5252AutoResetTime(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  mutiChipRamA: number[] | Buffer
): Promise<void> {
  const req = createSetMBI5252AutoResetTime(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    mutiChipRamA
  );
  await this.connection.send(req);
};
Session.prototype.trySetMBI5252AutoResetTime = async function trySetMBI5252AutoResetTime(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  mutiChipRamA: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetMBI5252AutoResetTime(addr, portAddr, scanBoardAddr, false, mutiChipRamA);
  return (await this.connection.trySend(req))?.ack ?? null;
};
