import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetParameterSender3D(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      parameterSender3D: number
    ): Promise<void>;
    trySetParameterSender3D(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      parameterSender3D: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetParameterSender3D<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  parameterSender3D: number
): Request<Broadcast> {
  const $data = encodeUIntLE(parameterSender3D, AddressMapping.ParameterStore2SpiFlashOccupancy);
  const req = new Request($data, bBroadcast, 'SetParameterSender3D');
  req.destination = addr;
  req.deviceType = 4;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ParameterStore2SpiFlashAddr;
  return req;
}
Session.prototype.SetParameterSender3D = async function SetParameterSender3D(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  parameterSender3D: number
): Promise<void> {
  const req = createSetParameterSender3D(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    parameterSender3D
  );
  await this.connection.send(req);
};
Session.prototype.trySetParameterSender3D = async function trySetParameterSender3D(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  parameterSender3D: number
): Promise<ErrorType | null> {
  const req = createSetParameterSender3D(addr, portAddr, scanBoardAddr, false, parameterSender3D);
  return (await this.connection.trySend(req))?.ack ?? null;
};
