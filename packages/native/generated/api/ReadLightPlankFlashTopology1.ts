import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadLightPlankFlashTopology1(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Buffer>;
    tryReadLightPlankFlashTopology1(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadLightPlankFlashTopology1(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.LightPlankFlashTopologyOccupancy1,
    'ReadLightPlankFlashTopology1'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.LightPlankFlashTopologyAddr1;
  return req;
}
Session.prototype.ReadLightPlankFlashTopology1 = async function ReadLightPlankFlashTopology1(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadLightPlankFlashTopology1(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadLightPlankFlashTopology1 = async function tryReadLightPlankFlashTopology1(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadLightPlankFlashTopology1(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
