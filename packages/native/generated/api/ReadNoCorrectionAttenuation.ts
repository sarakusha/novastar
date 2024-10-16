import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadNoCorrectionAttenuation(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Buffer>;
    tryReadNoCorrectionAttenuation(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadNoCorrectionAttenuation(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.NoCorrectionAttenuationOccupancy,
    'ReadNoCorrectionAttenuation'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.NoCorrectionAttenuationAddr;
  return req;
}
Session.prototype.ReadNoCorrectionAttenuation = async function ReadNoCorrectionAttenuation(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadNoCorrectionAttenuation(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadNoCorrectionAttenuation = async function tryReadNoCorrectionAttenuation(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadNoCorrectionAttenuation(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
