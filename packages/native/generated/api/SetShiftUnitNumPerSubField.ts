import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetShiftUnitNumPerSubField(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      shiftUnitNumPerSubField: number
    ): Promise<void>;
    trySetShiftUnitNumPerSubField(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      shiftUnitNumPerSubField: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetShiftUnitNumPerSubField<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  shiftUnitNumPerSubField: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    shiftUnitNumPerSubField,
    AddressMapping.ShiftUnitNumPerSubFieldOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetShiftUnitNumPerSubField');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ShiftUnitNumPerSubFieldAddr;
  return req;
}
Session.prototype.SetShiftUnitNumPerSubField = async function SetShiftUnitNumPerSubField(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  shiftUnitNumPerSubField: number
): Promise<void> {
  const req = createSetShiftUnitNumPerSubField(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    shiftUnitNumPerSubField
  );
  await this.connection.send(req);
};
Session.prototype.trySetShiftUnitNumPerSubField = async function trySetShiftUnitNumPerSubField(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  shiftUnitNumPerSubField: number
): Promise<ErrorType | null> {
  const req = createSetShiftUnitNumPerSubField(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    shiftUnitNumPerSubField
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
