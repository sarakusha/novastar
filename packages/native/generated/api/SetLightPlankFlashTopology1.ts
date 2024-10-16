import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetLightPlankFlashTopology1(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      LightPlankFlashTopologyBytes: number[] | Buffer
    ): Promise<void>;
    trySetLightPlankFlashTopology1(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      LightPlankFlashTopologyBytes: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetLightPlankFlashTopology1<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  LightPlankFlashTopologyBytes: number[] | Buffer
): Request<Broadcast> {
  const req = new Request(LightPlankFlashTopologyBytes, bBroadcast, 'SetLightPlankFlashTopology1');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.LightPlankFlashTopologyAddr1;
  return req;
}
Session.prototype.SetLightPlankFlashTopology1 = async function SetLightPlankFlashTopology1(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  LightPlankFlashTopologyBytes: number[] | Buffer
): Promise<void> {
  const req = createSetLightPlankFlashTopology1(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    LightPlankFlashTopologyBytes
  );
  await this.connection.send(req);
};
Session.prototype.trySetLightPlankFlashTopology1 = async function trySetLightPlankFlashTopology1(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  LightPlankFlashTopologyBytes: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetLightPlankFlashTopology1(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    LightPlankFlashTopologyBytes
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
