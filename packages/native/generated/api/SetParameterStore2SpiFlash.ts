import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetParameterStore2SpiFlash(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      parameterStore2SpiFlash: number
    ): Promise<void>;
    trySetParameterStore2SpiFlash(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      parameterStore2SpiFlash: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetParameterStore2SpiFlash<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  parameterStore2SpiFlash: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    parameterStore2SpiFlash,
    AddressMapping.ParameterStore2SpiFlashOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetParameterStore2SpiFlash');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ParameterStore2SpiFlashAddr;
  return req;
}
Session.prototype.SetParameterStore2SpiFlash = async function SetParameterStore2SpiFlash(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  parameterStore2SpiFlash: number
): Promise<void> {
  const req = createSetParameterStore2SpiFlash(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    parameterStore2SpiFlash
  );
  await this.connection.send(req);
};
Session.prototype.trySetParameterStore2SpiFlash = async function trySetParameterStore2SpiFlash(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  parameterStore2SpiFlash: number
): Promise<ErrorType | null> {
  const req = createSetParameterStore2SpiFlash(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    parameterStore2SpiFlash
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
