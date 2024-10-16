import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadAudioControl(addr: number): Promise<number>;
    tryReadAudioControl(addr: number): Promise<Packet | null>;
  }
}
export default function createReadAudioControl(addr: number): Request {
  const req = new Request(AddressMapping.AudioControlOccupancy, 'ReadAudioControl');
  req.destination = addr;
  req.address = AddressMapping.AudioControlAddr;
  return req;
}
Session.prototype.ReadAudioControl = async function ReadAudioControl(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadAudioControl(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadAudioControl = async function tryReadAudioControl(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadAudioControl(addr);
  return this.connection.trySend(req);
};
