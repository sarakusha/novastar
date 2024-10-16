import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_SetFuncCardFPGADescription_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      bBroadcast: boolean,
      funcCard_FPGADescription: number[] | Buffer
    ): Promise<void>;
    tryFuncCard_SetFuncCardFPGADescription_1(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      funcCard_FPGADescription: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createFuncCard_SetFuncCardFPGADescription_1<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  bBroadcast: Broadcast,
  funcCard_FPGADescription: number[] | Buffer
): Request<Broadcast> {
  if (funcCard_FPGADescription.length !== AddressMapping.FuncCard_FPGADescriptionnOccupancy)
    throw new TypeError(`Invalid buffer size: ${funcCard_FPGADescription.length}`);
  const req = new Request(
    funcCard_FPGADescription,
    bBroadcast,
    'FuncCard_SetFuncCardFPGADescription_1'
  );
  req.destination = addr;
  req.deviceType = 2;
  req.port = portAddr;
  req.rcvIndex = funcCardAddr;
  req.address = AddressMapping.FuncCard_FPGADescriptionAddr;
  return req;
}
Session.prototype.FuncCard_SetFuncCardFPGADescription_1 =
  async function FuncCard_SetFuncCardFPGADescription_1(
    this: Session,
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    bBroadcast: boolean,
    funcCard_FPGADescription: number[] | Buffer
  ): Promise<void> {
    const req = createFuncCard_SetFuncCardFPGADescription_1(
      addr,
      portAddr,
      funcCardAddr,
      bBroadcast,
      funcCard_FPGADescription
    );
    await this.connection.send(req);
  };
Session.prototype.tryFuncCard_SetFuncCardFPGADescription_1 =
  async function tryFuncCard_SetFuncCardFPGADescription_1(
    this: Session,
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    funcCard_FPGADescription: number[] | Buffer
  ): Promise<ErrorType | null> {
    const req = createFuncCard_SetFuncCardFPGADescription_1(
      addr,
      portAddr,
      funcCardAddr,
      false,
      funcCard_FPGADescription
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
