import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetLogicShiftUnitNumPerSubField(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      ShiftUnitNum: number
    ): Promise<void>;
    trySetLogicShiftUnitNumPerSubField(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      ShiftUnitNum: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetLogicShiftUnitNumPerSubField<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  ShiftUnitNum: number
): Request<Broadcast> {
  const $data = encodeUIntLE(ShiftUnitNum, AddressMapping.LogicShiftUnitNumPerSubFieldOccupancy);
  const req = new Request($data, bBroadcast, 'SetLogicShiftUnitNumPerSubField');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.LogicShiftUnitNumPerSubFieldAddr;
  return req;
}
Session.prototype.SetLogicShiftUnitNumPerSubField = async function SetLogicShiftUnitNumPerSubField(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  ShiftUnitNum: number
): Promise<void> {
  const req = createSetLogicShiftUnitNumPerSubField(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    ShiftUnitNum
  );
  await this.connection.send(req);
};
Session.prototype.trySetLogicShiftUnitNumPerSubField =
  async function trySetLogicShiftUnitNumPerSubField(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    ShiftUnitNum: number
  ): Promise<ErrorType | null> {
    const req = createSetLogicShiftUnitNumPerSubField(
      addr,
      portAddr,
      scanBoardAddr,
      false,
      ShiftUnitNum
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
