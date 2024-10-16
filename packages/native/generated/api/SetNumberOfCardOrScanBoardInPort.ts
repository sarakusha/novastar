import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { CardTypeEnum } from '../CardType';

declare module '@novastar/codec' {
  interface API {
    SetNumberOfCardOrScanBoardInPort(
      addr: number,
      bBroadcast: boolean,
      number: number,
      portIndex: number,
      cardType: CardTypeEnum
    ): Promise<void>;
    trySetNumberOfCardOrScanBoardInPort(
      addr: number,
      number: number,
      portIndex: number,
      cardType: CardTypeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createSetNumberOfCardOrScanBoardInPort<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  number: number,
  portIndex: number,
  cardType: CardTypeEnum
): Request<Broadcast> {
  const $data = encodeUIntLE(number, AddressMapping.NumberOfCardOrBoardInPortOccupancy);
  const req = new Request($data, bBroadcast, 'SetNumberOfCardOrScanBoardInPort');
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
Session.prototype.SetNumberOfCardOrScanBoardInPort =
  async function SetNumberOfCardOrScanBoardInPort(
    this: Session,
    addr: number,
    bBroadcast: boolean,
    number: number,
    portIndex: number,
    cardType: CardTypeEnum
  ): Promise<void> {
    const req = createSetNumberOfCardOrScanBoardInPort(
      addr,
      bBroadcast,
      number,
      portIndex,
      cardType
    );
    await this.connection.send(req);
  };
Session.prototype.trySetNumberOfCardOrScanBoardInPort =
  async function trySetNumberOfCardOrScanBoardInPort(
    this: Session,
    addr: number,
    number: number,
    portIndex: number,
    cardType: CardTypeEnum
  ): Promise<ErrorType | null> {
    const req = createSetNumberOfCardOrScanBoardInPort(addr, false, number, portIndex, cardType);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
