import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_ComplexCfgScreenFlagSpace(addr: number): Promise<number>;
    tryReadSender_ComplexCfgScreenFlagSpace(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_ComplexCfgScreenFlagSpace(addr: number): Request {
  const req = new Request(
    AddressMapping.ComplexCfgScreenFlagOccupancy,
    'ReadSender_ComplexCfgScreenFlagSpace'
  );
  req.destination = addr;
  req.address = AddressMapping.ComplexCfgScreenFlagAddr;
  return req;
}
Session.prototype.ReadSender_ComplexCfgScreenFlagSpace =
  async function ReadSender_ComplexCfgScreenFlagSpace(
    this: Session,
    addr: number
  ): Promise<number> {
    const req = createReadSender_ComplexCfgScreenFlagSpace(addr);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryReadSender_ComplexCfgScreenFlagSpace =
  async function tryReadSender_ComplexCfgScreenFlagSpace(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createReadSender_ComplexCfgScreenFlagSpace(addr);
    return this.connection.trySend(req);
  };
