import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetRecaculateParameter(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      recaculateParameter: number
    ): Promise<void>;
    trySetRecaculateParameter(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      recaculateParameter: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetRecaculateParameter<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  recaculateParameter: number
): Request<Broadcast> {
  const $data = encodeUIntLE(recaculateParameter, AddressMapping.RecaculateParameterOccupancy);
  const req = new Request($data, bBroadcast, 'SetRecaculateParameter');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.RecaculateParameterAddr;
  return req;
}
Session.prototype.SetRecaculateParameter = async function SetRecaculateParameter(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  recaculateParameter: number
): Promise<void> {
  const req = createSetRecaculateParameter(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    recaculateParameter
  );
  await this.connection.send(req);
};
Session.prototype.trySetRecaculateParameter = async function trySetRecaculateParameter(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  recaculateParameter: number
): Promise<ErrorType | null> {
  const req = createSetRecaculateParameter(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    recaculateParameter
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
