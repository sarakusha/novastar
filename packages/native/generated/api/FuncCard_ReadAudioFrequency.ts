import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadAudioFrequency(addr: number): Promise<number>;
    tryFuncCard_ReadAudioFrequency(addr: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadAudioFrequency(addr: number): Request {
  const req = new Request(
    AddressMapping.FuncCard_AudioFrequencyOccupancy,
    'FuncCard_ReadAudioFrequency'
  );
  req.destination = addr;
  req.address = AddressMapping.FuncCard_AudioFrequencyAddr;
  return req;
}
Session.prototype.FuncCard_ReadAudioFrequency = async function FuncCard_ReadAudioFrequency(
  this: Session,
  addr: number
): Promise<number> {
  const req = createFuncCard_ReadAudioFrequency(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryFuncCard_ReadAudioFrequency = async function tryFuncCard_ReadAudioFrequency(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createFuncCard_ReadAudioFrequency(addr);
  return this.connection.trySend(req);
};
