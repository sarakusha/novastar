import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { DataDirectionTypeEnum } from '../DataDirectionType';

declare module '@novastar/codec' {
  interface API {
    SetDataDirection(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      dataDriection: DataDirectionTypeEnum
    ): Promise<void>;
    trySetDataDirection(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      dataDriection: DataDirectionTypeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createSetDataDirection<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  dataDriection: DataDirectionTypeEnum
): Request<Broadcast> {
  const $data = encodeUIntLE(dataDriection, AddressMapping.DataDirectionOccupancy);
  const req = new Request($data, bBroadcast, 'SetDataDirection');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DataDirectionAddr;
  return req;
}
Session.prototype.SetDataDirection = async function SetDataDirection(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  dataDriection: DataDirectionTypeEnum
): Promise<void> {
  const req = createSetDataDirection(addr, portAddr, scanBoardAddr, bBroadcast, dataDriection);
  await this.connection.send(req);
};
Session.prototype.trySetDataDirection = async function trySetDataDirection(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  dataDriection: DataDirectionTypeEnum
): Promise<ErrorType | null> {
  const req = createSetDataDirection(addr, portAddr, scanBoardAddr, false, dataDriection);
  return (await this.connection.trySend(req))?.ack ?? null;
};
