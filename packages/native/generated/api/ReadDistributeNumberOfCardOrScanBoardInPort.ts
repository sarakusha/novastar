import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { CardTypeEnum } from '../CardType';

declare module '@novastar/codec' {
  interface API {
    ReadDistributeNumberOfCardOrScanBoardInPort(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      portIndex: number,
      cardType: CardTypeEnum
    ): Promise<number>;
    tryReadDistributeNumberOfCardOrScanBoardInPort(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      portIndex: number,
      cardType: CardTypeEnum
    ): Promise<Packet | null>;
  }
}
export default function createReadDistributeNumberOfCardOrScanBoardInPort(
  addr: number,
  portAddr: number,
  distributeAddr: number,
  portIndex: number,
  cardType: CardTypeEnum
): Request {
  const req = new Request(
    AddressMapping.DistributeNumberOfCardOrBoardInPortOccupancy,
    'ReadDistributeNumberOfCardOrScanBoardInPort'
  );
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
Session.prototype.ReadDistributeNumberOfCardOrScanBoardInPort =
  async function ReadDistributeNumberOfCardOrScanBoardInPort(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    portIndex: number,
    cardType: CardTypeEnum
  ): Promise<number> {
    const req = createReadDistributeNumberOfCardOrScanBoardInPort(
      addr,
      portAddr,
      distributeAddr,
      portIndex,
      cardType
    );
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryReadDistributeNumberOfCardOrScanBoardInPort =
  async function tryReadDistributeNumberOfCardOrScanBoardInPort(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    portIndex: number,
    cardType: CardTypeEnum
  ): Promise<Packet | null> {
    const req = createReadDistributeNumberOfCardOrScanBoardInPort(
      addr,
      portAddr,
      distributeAddr,
      portIndex,
      cardType
    );
    return this.connection.trySend(req);
  };
