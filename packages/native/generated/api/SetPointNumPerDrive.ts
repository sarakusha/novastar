import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetPointNumPerDrive(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      pointNumPerDrive: number
    ): Promise<void>;
    trySetPointNumPerDrive(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      pointNumPerDrive: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetPointNumPerDrive<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  pointNumPerDrive: number
): Request<Broadcast> {
  const $data = encodeUIntLE(pointNumPerDrive, AddressMapping.PointNumPerDriveOccupancy);
  const req = new Request($data, bBroadcast, 'SetPointNumPerDrive');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.PointNumPerDriveAddr;
  return req;
}
Session.prototype.SetPointNumPerDrive = async function SetPointNumPerDrive(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  pointNumPerDrive: number
): Promise<void> {
  const req = createSetPointNumPerDrive(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    pointNumPerDrive
  );
  await this.connection.send(req);
};
Session.prototype.trySetPointNumPerDrive = async function trySetPointNumPerDrive(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  pointNumPerDrive: number
): Promise<ErrorType | null> {
  const req = createSetPointNumPerDrive(addr, portAddr, scanBoardAddr, false, pointNumPerDrive);
  return (await this.connection.trySend(req))?.ack ?? null;
};
