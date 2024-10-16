import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadRemoveChipChannelData(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      dataLength: number
    ): Promise<Buffer>;
    tryReadRemoveChipChannelData(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      dataLength: number
    ): Promise<Packet | null>;
  }
}
export default function createReadRemoveChipChannelData(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  dataLength: number
): Request {
  const req = new Request(dataLength, 'ReadRemoveChipChannelData');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Module_RemoveChipChannelAddr;
  return req;
}
Session.prototype.ReadRemoveChipChannelData = async function ReadRemoveChipChannelData(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  dataLength: number
): Promise<Buffer> {
  const req = createReadRemoveChipChannelData(addr, portAddr, scanBoardAddr, dataLength);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadRemoveChipChannelData = async function tryReadRemoveChipChannelData(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  dataLength: number
): Promise<Packet | null> {
  const req = createReadRemoveChipChannelData(addr, portAddr, scanBoardAddr, dataLength);
  return this.connection.trySend(req);
};
