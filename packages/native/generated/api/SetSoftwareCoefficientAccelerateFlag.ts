import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSoftwareCoefficientAccelerateFlag(
      Sender: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      Is3x3: boolean
    ): Promise<void>;
    trySetSoftwareCoefficientAccelerateFlag(
      Sender: number,
      portAddr: number,
      scanBoardAddr: number,
      Is3x3: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSoftwareCoefficientAccelerateFlag<Broadcast extends boolean>(
  Sender: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  Is3x3: boolean
): Request<Broadcast> {
  const req = new Request(Is3x3 ? [2] : [0], bBroadcast, 'SetSoftwareCoefficientAccelerateFlag');
  req.destination = Sender;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.SoftwareCoefficientAccelerateFlag;
  return req;
}
Session.prototype.SetSoftwareCoefficientAccelerateFlag =
  async function SetSoftwareCoefficientAccelerateFlag(
    this: Session,
    Sender: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    Is3x3: boolean
  ): Promise<void> {
    const req = createSetSoftwareCoefficientAccelerateFlag(
      Sender,
      portAddr,
      scanBoardAddr,
      bBroadcast,
      Is3x3
    );
    await this.connection.send(req);
  };
Session.prototype.trySetSoftwareCoefficientAccelerateFlag =
  async function trySetSoftwareCoefficientAccelerateFlag(
    this: Session,
    Sender: number,
    portAddr: number,
    scanBoardAddr: number,
    Is3x3: boolean
  ): Promise<ErrorType | null> {
    const req = createSetSoftwareCoefficientAccelerateFlag(
      Sender,
      portAddr,
      scanBoardAddr,
      false,
      Is3x3
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
