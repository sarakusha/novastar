import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_ScreenAdjustBrightFlag(addr: number): Promise<number>;
    tryReadSender_ScreenAdjustBrightFlag(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_ScreenAdjustBrightFlag(addr: number): Request {
  const req = new Request(
    AddressMapping.BrightnessSyncAdjustFlagOccupancy,
    'ReadSender_ScreenAdjustBrightFlag'
  );
  req.destination = addr;
  req.address = AddressMapping.BrightnessSyncAdjustFlagAddr;
  return req;
}
Session.prototype.ReadSender_ScreenAdjustBrightFlag =
  async function ReadSender_ScreenAdjustBrightFlag(this: Session, addr: number): Promise<number> {
    const req = createReadSender_ScreenAdjustBrightFlag(addr);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryReadSender_ScreenAdjustBrightFlag =
  async function tryReadSender_ScreenAdjustBrightFlag(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createReadSender_ScreenAdjustBrightFlag(addr);
    return this.connection.trySend(req);
  };
