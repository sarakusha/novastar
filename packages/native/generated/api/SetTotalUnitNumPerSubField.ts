import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetTotalUnitNumPerSubField(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      totalUnitNumPerSubField: number
    ): Promise<void>;
    trySetTotalUnitNumPerSubField(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      totalUnitNumPerSubField: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetTotalUnitNumPerSubField<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  totalUnitNumPerSubField: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    totalUnitNumPerSubField,
    AddressMapping.TotalUnitNumPerSubFieldOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetTotalUnitNumPerSubField');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.TotalUnitNumPerSubFieldAddr;
  return req;
}
Session.prototype.SetTotalUnitNumPerSubField = async function SetTotalUnitNumPerSubField(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  totalUnitNumPerSubField: number
): Promise<void> {
  const req = createSetTotalUnitNumPerSubField(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    totalUnitNumPerSubField
  );
  await this.connection.send(req);
};
Session.prototype.trySetTotalUnitNumPerSubField = async function trySetTotalUnitNumPerSubField(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  totalUnitNumPerSubField: number
): Promise<ErrorType | null> {
  const req = createSetTotalUnitNumPerSubField(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    totalUnitNumPerSubField
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
