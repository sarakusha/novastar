import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SwitchAutoOrManualLinearTable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      switchAutoOrManualEnable: boolean
    ): Promise<void>;
    trySwitchAutoOrManualLinearTable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      switchAutoOrManualEnable: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSwitchAutoOrManualLinearTable<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  switchAutoOrManualEnable: boolean
): Request<Broadcast> {
  const $data = encodeUIntLE(
    switchAutoOrManualEnable ? 1 : 0,
    AddressMapping.SwitchAutoOrManualLinearTableOccupancy
  );
  const req = new Request($data, bBroadcast, 'SwitchAutoOrManualLinearTable');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.SwitchAutoOrManualLinearTableAddr;
  return req;
}
Session.prototype.SwitchAutoOrManualLinearTable = async function SwitchAutoOrManualLinearTable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  switchAutoOrManualEnable: boolean
): Promise<void> {
  const req = createSwitchAutoOrManualLinearTable(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    switchAutoOrManualEnable
  );
  await this.connection.send(req);
};
Session.prototype.trySwitchAutoOrManualLinearTable =
  async function trySwitchAutoOrManualLinearTable(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    switchAutoOrManualEnable: boolean
  ): Promise<ErrorType | null> {
    const req = createSwitchAutoOrManualLinearTable(
      addr,
      portAddr,
      scanBoardAddr,
      false,
      switchAutoOrManualEnable
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
