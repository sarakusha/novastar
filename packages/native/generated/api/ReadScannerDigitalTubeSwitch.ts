import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScannerDigitalTubeSwitch(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadScannerDigitalTubeSwitch(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadScannerDigitalTubeSwitch(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.ScannerDigitalTubeSwitchOccupancy,
    'ReadScannerDigitalTubeSwitch'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScannerDigitalTubeSwitchAddr;
  return req;
}
Session.prototype.ReadScannerDigitalTubeSwitch = async function ReadScannerDigitalTubeSwitch(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadScannerDigitalTubeSwitch(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadScannerDigitalTubeSwitch = async function tryReadScannerDigitalTubeSwitch(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadScannerDigitalTubeSwitch(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
