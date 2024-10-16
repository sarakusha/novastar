import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_SetFuncCardFPGADescription(
      addr: number,
      bBroadcast: boolean,
      funcCard_FPGADescription: number[] | Buffer
    ): Promise<void>;
    tryFuncCard_SetFuncCardFPGADescription(
      addr: number,
      funcCard_FPGADescription: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createFuncCard_SetFuncCardFPGADescription<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  funcCard_FPGADescription: number[] | Buffer
): Request<Broadcast> {
  if (funcCard_FPGADescription.length !== AddressMapping.FuncCard_FPGADescriptionnOccupancy)
    throw new TypeError(`Invalid buffer size: ${funcCard_FPGADescription.length}`);
  const req = new Request(
    funcCard_FPGADescription,
    bBroadcast,
    'FuncCard_SetFuncCardFPGADescription'
  );
  req.destination = addr;
  req.address = AddressMapping.FuncCard_FPGADescriptionAddr;
  return req;
}
Session.prototype.FuncCard_SetFuncCardFPGADescription =
  async function FuncCard_SetFuncCardFPGADescription(
    this: Session,
    addr: number,
    bBroadcast: boolean,
    funcCard_FPGADescription: number[] | Buffer
  ): Promise<void> {
    const req = createFuncCard_SetFuncCardFPGADescription(
      addr,
      bBroadcast,
      funcCard_FPGADescription
    );
    await this.connection.send(req);
  };
Session.prototype.tryFuncCard_SetFuncCardFPGADescription =
  async function tryFuncCard_SetFuncCardFPGADescription(
    this: Session,
    addr: number,
    funcCard_FPGADescription: number[] | Buffer
  ): Promise<ErrorType | null> {
    const req = createFuncCard_SetFuncCardFPGADescription(addr, false, funcCard_FPGADescription);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
