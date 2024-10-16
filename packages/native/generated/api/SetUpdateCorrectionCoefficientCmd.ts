import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetUpdateCorrectionCoefficientCmd(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      valueFlag: number
    ): Promise<void>;
    trySetUpdateCorrectionCoefficientCmd(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      valueFlag: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetUpdateCorrectionCoefficientCmd<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  valueFlag: number
): Request<Broadcast> {
  const $data = encodeUIntLE(valueFlag, AddressMapping.UpdateCorrectionCoefficientCmdOccupancy);
  const req = new Request($data, bBroadcast, 'SetUpdateCorrectionCoefficientCmd');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.UpdateCorrectionCoefficientCmdAddr;
  return req;
}
Session.prototype.SetUpdateCorrectionCoefficientCmd =
  async function SetUpdateCorrectionCoefficientCmd(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    valueFlag: number
  ): Promise<void> {
    const req = createSetUpdateCorrectionCoefficientCmd(
      addr,
      portAddr,
      scanBoardAddr,
      bBroadcast,
      valueFlag
    );
    await this.connection.send(req);
  };
Session.prototype.trySetUpdateCorrectionCoefficientCmd =
  async function trySetUpdateCorrectionCoefficientCmd(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    valueFlag: number
  ): Promise<ErrorType | null> {
    const req = createSetUpdateCorrectionCoefficientCmd(
      addr,
      portAddr,
      scanBoardAddr,
      false,
      valueFlag
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
