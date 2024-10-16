import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetCoefficienceFromDvi(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      coefficienceFromDvi: number
    ): Promise<void>;
    trySetCoefficienceFromDvi(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      coefficienceFromDvi: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetCoefficienceFromDvi<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  coefficienceFromDvi: number
): Request<Broadcast> {
  const $data = encodeUIntLE(coefficienceFromDvi, AddressMapping.WriteCoefficienceFromDviOccupancy);
  const req = new Request($data, bBroadcast, 'SetCoefficienceFromDvi');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.WriteCoefficienceFromDviAddr;
  return req;
}
Session.prototype.SetCoefficienceFromDvi = async function SetCoefficienceFromDvi(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  coefficienceFromDvi: number
): Promise<void> {
  const req = createSetCoefficienceFromDvi(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    coefficienceFromDvi
  );
  await this.connection.send(req);
};
Session.prototype.trySetCoefficienceFromDvi = async function trySetCoefficienceFromDvi(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  coefficienceFromDvi: number
): Promise<ErrorType | null> {
  const req = createSetCoefficienceFromDvi(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    coefficienceFromDvi
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
