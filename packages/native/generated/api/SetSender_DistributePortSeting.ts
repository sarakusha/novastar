import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_DistributePortSeting(
      addr: number,
      bBroadcast: boolean,
      dataValue: number[] | Buffer
    ): Promise<void>;
    trySetSender_DistributePortSeting(
      addr: number,
      dataValue: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSender_DistributePortSeting<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  dataValue: number[] | Buffer
): Request<Broadcast> {
  if (dataValue.length !== AddressMapping.DistributePortSetingAddrOccupancy)
    throw new TypeError(`Invalid buffer size: ${dataValue.length}`);
  const req = new Request(dataValue, bBroadcast, 'SetSender_DistributePortSeting');
  req.destination = addr;
  req.address = AddressMapping.DistributePortSetingAddr;
  return req;
}
Session.prototype.SetSender_DistributePortSeting = async function SetSender_DistributePortSeting(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  dataValue: number[] | Buffer
): Promise<void> {
  const req = createSetSender_DistributePortSeting(addr, bBroadcast, dataValue);
  await this.connection.send(req);
};
Session.prototype.trySetSender_DistributePortSeting =
  async function trySetSender_DistributePortSeting(
    this: Session,
    addr: number,
    dataValue: number[] | Buffer
  ): Promise<ErrorType | null> {
    const req = createSetSender_DistributePortSeting(addr, false, dataValue);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
