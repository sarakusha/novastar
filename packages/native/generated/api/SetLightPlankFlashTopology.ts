import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetLightPlankFlashTopology(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      LightPlankFlashTopologyBytes: number[] | Buffer
    ): Promise<void>;
    trySetLightPlankFlashTopology(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      LightPlankFlashTopologyBytes: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetLightPlankFlashTopology<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  LightPlankFlashTopologyBytes: number[] | Buffer
): Request<Broadcast> {
  const req = new Request(LightPlankFlashTopologyBytes, bBroadcast, 'SetLightPlankFlashTopology');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.LightPlankFlashTopologyAddr;
  return req;
}
Session.prototype.SetLightPlankFlashTopology = async function SetLightPlankFlashTopology(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  LightPlankFlashTopologyBytes: number[] | Buffer
): Promise<void> {
  const req = createSetLightPlankFlashTopology(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    LightPlankFlashTopologyBytes
  );
  await this.connection.send(req);
};
Session.prototype.trySetLightPlankFlashTopology = async function trySetLightPlankFlashTopology(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  LightPlankFlashTopologyBytes: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetLightPlankFlashTopology(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    LightPlankFlashTopologyBytes
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
