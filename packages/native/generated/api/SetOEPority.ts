import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { OEPolarityTypeEnum } from '../OEPolarityType';

declare module '@novastar/codec' {
  interface API {
    SetOEPority(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      oEPority: OEPolarityTypeEnum
    ): Promise<void>;
    trySetOEPority(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      oEPority: OEPolarityTypeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createSetOEPority<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  oEPority: OEPolarityTypeEnum
): Request<Broadcast> {
  const $data = encodeUIntLE(oEPority, AddressMapping.OEPorityOccupancy);
  const req = new Request($data, bBroadcast, 'SetOEPority');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.OEPorityAddr;
  return req;
}
Session.prototype.SetOEPority = async function SetOEPority(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  oEPority: OEPolarityTypeEnum
): Promise<void> {
  const req = createSetOEPority(addr, portAddr, scanBoardAddr, bBroadcast, oEPority);
  await this.connection.send(req);
};
Session.prototype.trySetOEPority = async function trySetOEPority(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  oEPority: OEPolarityTypeEnum
): Promise<ErrorType | null> {
  const req = createSetOEPority(addr, portAddr, scanBoardAddr, false, oEPority);
  return (await this.connection.trySend(req))?.ack ?? null;
};
