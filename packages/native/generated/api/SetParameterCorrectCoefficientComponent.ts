import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetParameterCorrectCoefficientComponent(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      parameterChromaOrBrightness: number
    ): Promise<void>;
    trySetParameterCorrectCoefficientComponent(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      parameterChromaOrBrightness: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetParameterCorrectCoefficientComponent<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  parameterChromaOrBrightness: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    parameterChromaOrBrightness,
    AddressMapping.CorrectCoefficientComponentOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetParameterCorrectCoefficientComponent');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.CorrectCoefficientComponent;
  return req;
}
Session.prototype.SetParameterCorrectCoefficientComponent =
  async function SetParameterCorrectCoefficientComponent(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    parameterChromaOrBrightness: number
  ): Promise<void> {
    const req = createSetParameterCorrectCoefficientComponent(
      addr,
      portAddr,
      scanBoardAddr,
      bBroadcast,
      parameterChromaOrBrightness
    );
    await this.connection.send(req);
  };
Session.prototype.trySetParameterCorrectCoefficientComponent =
  async function trySetParameterCorrectCoefficientComponent(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    parameterChromaOrBrightness: number
  ): Promise<ErrorType | null> {
    const req = createSetParameterCorrectCoefficientComponent(
      addr,
      portAddr,
      scanBoardAddr,
      false,
      parameterChromaOrBrightness
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
