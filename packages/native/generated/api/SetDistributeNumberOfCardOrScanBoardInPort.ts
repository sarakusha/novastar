import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { CardTypeEnum } from '../CardType';

declare module '@novastar/codec' {
  interface API {
    SetDistributeNumberOfCardOrScanBoardInPort(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      bBroadcast: boolean,
      number: number,
      portIndex: number,
      cardType: CardTypeEnum
    ): Promise<void>;
    trySetDistributeNumberOfCardOrScanBoardInPort(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      number: number,
      portIndex: number,
      cardType: CardTypeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createSetDistributeNumberOfCardOrScanBoardInPort<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  distributeAddr: number,
  bBroadcast: Broadcast,
  number: number,
  portIndex: number,
  cardType: CardTypeEnum
): Request<Broadcast> {
  const $data = encodeUIntLE(number, AddressMapping.DistributeNumberOfCardOrBoardInPortOccupancy);
  const req = new Request($data, bBroadcast, 'SetDistributeNumberOfCardOrScanBoardInPort');
  req.destination = addr;
  req.deviceType = 3;
  req.port = portAddr;
  req.rcvIndex = distributeAddr;
  req.address = 0;
  if (portIndex > 3) {
    req.address =
      AddressMapping.DistributeNumberOfCardOrBoardInPortAddr +
      AddressMapping.DistributePortAddr +
      portIndex * AddressMapping.DistributeNumOfCardAndBoardInPortOccupancy +
      cardType * AddressMapping.DistributeNumberOfCardOrBoardInPortOccupancy;
  } else {
    req.address =
      AddressMapping.DistributeNumberOfCardOrBoardInPortAddr +
      portIndex * AddressMapping.DistributeNumOfCardAndBoardInPortOccupancy +
      cardType * AddressMapping.DistributeNumberOfCardOrBoardInPortOccupancy;
  }
  return req;
}
Session.prototype.SetDistributeNumberOfCardOrScanBoardInPort =
  async function SetDistributeNumberOfCardOrScanBoardInPort(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    bBroadcast: boolean,
    number: number,
    portIndex: number,
    cardType: CardTypeEnum
  ): Promise<void> {
    const req = createSetDistributeNumberOfCardOrScanBoardInPort(
      addr,
      portAddr,
      distributeAddr,
      bBroadcast,
      number,
      portIndex,
      cardType
    );
    await this.connection.send(req);
  };
Session.prototype.trySetDistributeNumberOfCardOrScanBoardInPort =
  async function trySetDistributeNumberOfCardOrScanBoardInPort(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    number: number,
    portIndex: number,
    cardType: CardTypeEnum
  ): Promise<ErrorType | null> {
    const req = createSetDistributeNumberOfCardOrScanBoardInPort(
      addr,
      portAddr,
      distributeAddr,
      false,
      number,
      portIndex,
      cardType
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
