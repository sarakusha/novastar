import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { CardTypeEnum } from '../CardType';

declare module '@novastar/codec' {
  interface API {
    ReadNumberOfCardOrScanBoardInPort(
      addr: number,
      portIndex: number,
      cardType: CardTypeEnum
    ): Promise<number>;
    tryReadNumberOfCardOrScanBoardInPort(
      addr: number,
      portIndex: number,
      cardType: CardTypeEnum
    ): Promise<Packet | null>;
  }
}
export default function createReadNumberOfCardOrScanBoardInPort(
  addr: number,
  portIndex: number,
  cardType: CardTypeEnum
): Request {
  const req = new Request(
    AddressMapping.NumberOfCardOrBoardInPortOccupancy,
    'ReadNumberOfCardOrScanBoardInPort'
  );
  req.destination = addr;
  req.address = 0;
  if (portIndex < AddressMapping.New16PortOccupancy) {
    req.address =
      AddressMapping.NumberOfCardOrBoardInPortAddr +
      portIndex * AddressMapping.NumOfCardAndBoardInPortOccupancy +
      cardType * AddressMapping.NumberOfCardOrBoardInPortOccupancy;
  } else {
    req.address =
      AddressMapping.NumberOfCardOrBoardInPort16Addr +
      portIndex * AddressMapping.NumOfCardAndBoardInPortOccupancy +
      cardType * AddressMapping.NumberOfCardOrBoardInPortOccupancy;
  }
  return req;
}
Session.prototype.ReadNumberOfCardOrScanBoardInPort =
  async function ReadNumberOfCardOrScanBoardInPort(
    this: Session,
    addr: number,
    portIndex: number,
    cardType: CardTypeEnum
  ): Promise<number> {
    const req = createReadNumberOfCardOrScanBoardInPort(addr, portIndex, cardType);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryReadNumberOfCardOrScanBoardInPort =
  async function tryReadNumberOfCardOrScanBoardInPort(
    this: Session,
    addr: number,
    portIndex: number,
    cardType: CardTypeEnum
  ): Promise<Packet | null> {
    const req = createReadNumberOfCardOrScanBoardInPort(addr, portIndex, cardType);
    return this.connection.trySend(req);
  };
