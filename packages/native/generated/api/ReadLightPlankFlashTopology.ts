import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadLightPlankFlashTopology(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Buffer>;
    tryReadLightPlankFlashTopology(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadLightPlankFlashTopology(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.LightPlankFlashTopologyOccupancy,
    'ReadLightPlankFlashTopology'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.LightPlankFlashTopologyAddr;
  return req;
}
Session.prototype.ReadLightPlankFlashTopology = async function ReadLightPlankFlashTopology(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadLightPlankFlashTopology(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadLightPlankFlashTopology = async function tryReadLightPlankFlashTopology(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadLightPlankFlashTopology(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
