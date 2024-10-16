import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetParameterReloadFromSpiFlash(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      parameterReloadFromSpiFlash: number
    ): Promise<void>;
    trySetParameterReloadFromSpiFlash(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      parameterReloadFromSpiFlash: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetParameterReloadFromSpiFlash<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  parameterReloadFromSpiFlash: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    parameterReloadFromSpiFlash,
    AddressMapping.ParameterReloadFromSpiFlashOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetParameterReloadFromSpiFlash');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ParameterReloadFromSpiFlashAddr;
  return req;
}
Session.prototype.SetParameterReloadFromSpiFlash = async function SetParameterReloadFromSpiFlash(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  parameterReloadFromSpiFlash: number
): Promise<void> {
  const req = createSetParameterReloadFromSpiFlash(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    parameterReloadFromSpiFlash
  );
  await this.connection.send(req);
};
Session.prototype.trySetParameterReloadFromSpiFlash =
  async function trySetParameterReloadFromSpiFlash(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    parameterReloadFromSpiFlash: number
  ): Promise<ErrorType | null> {
    const req = createSetParameterReloadFromSpiFlash(
      addr,
      portAddr,
      scanBoardAddr,
      false,
      parameterReloadFromSpiFlash
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
