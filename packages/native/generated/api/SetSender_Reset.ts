import { Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_Reset(): Promise<void>;
  }
}
export default function createSetSender_Reset(): Request<true> {
  const req = new Request(Buffer.alloc(1), true, 'SetSender_Reset');
  req.destination = 255;
  req.port = 255;
  req.rcvIndex = 65535;
  req.address = AddressMapping.Sender_McuResetAddr;
  return req;
}
Session.prototype.SetSender_Reset = async function SetSender_Reset(this: Session): Promise<void> {
  const req = createSetSender_Reset();
  await this.connection.send(req);
};
