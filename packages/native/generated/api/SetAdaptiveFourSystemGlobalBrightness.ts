import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetAdaptiveFourSystemGlobalBrightness(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      data: number[] | Buffer
    ): Promise<void>;
    trySetAdaptiveFourSystemGlobalBrightness(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      data: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetAdaptiveFourSystemGlobalBrightness<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  data: number[] | Buffer
): Request<Broadcast> {
  if (data.length !== AddressMapping.FourSystemAdaptiveBrightnessOccupancy)
    throw new TypeError(`Invalid buffer size: ${data.length}`);
  const req = new Request(data, bBroadcast, 'SetAdaptiveFourSystemGlobalBrightness');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.FourSystemAdaptiveBrightnessAddr;
  return req;
}
Session.prototype.SetAdaptiveFourSystemGlobalBrightness =
  async function SetAdaptiveFourSystemGlobalBrightness(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    const req = createSetAdaptiveFourSystemGlobalBrightness(
      addr,
      portAddr,
      scanBoardAddr,
      bBroadcast,
      data
    );
    await this.connection.send(req);
  };
Session.prototype.trySetAdaptiveFourSystemGlobalBrightness =
  async function trySetAdaptiveFourSystemGlobalBrightness(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    data: number[] | Buffer
  ): Promise<ErrorType | null> {
    const req = createSetAdaptiveFourSystemGlobalBrightness(
      addr,
      portAddr,
      scanBoardAddr,
      false,
      data
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
