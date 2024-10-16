import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { CoefficientSourceTypeEnum } from '../CoefficientSourceType';

declare module '@novastar/codec' {
  interface API {
    SetCoefficientSource(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      coefficienceSource: CoefficientSourceTypeEnum
    ): Promise<void>;
    trySetCoefficientSource(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      coefficienceSource: CoefficientSourceTypeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createSetCoefficientSource<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  coefficienceSource: CoefficientSourceTypeEnum
): Request<Broadcast> {
  const $data = encodeUIntLE(coefficienceSource, AddressMapping.CoefficientSourceOccupancy);
  const req = new Request($data, bBroadcast, 'SetCoefficientSource');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.CoefficientSourceAddr;
  return req;
}
Session.prototype.SetCoefficientSource = async function SetCoefficientSource(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  coefficienceSource: CoefficientSourceTypeEnum
): Promise<void> {
  const req = createSetCoefficientSource(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    coefficienceSource
  );
  await this.connection.send(req);
};
Session.prototype.trySetCoefficientSource = async function trySetCoefficientSource(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  coefficienceSource: CoefficientSourceTypeEnum
): Promise<ErrorType | null> {
  const req = createSetCoefficientSource(addr, portAddr, scanBoardAddr, false, coefficienceSource);
  return (await this.connection.trySend(req))?.ack ?? null;
};
