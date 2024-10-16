import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { ModulationModeTypeEnum } from '../ModulationModeType';

declare module '@novastar/codec' {
  interface API {
    SetSender_DistributeEnable(
      addr: number,
      bBroadcast: boolean,
      functionType: ModulationModeTypeEnum
    ): Promise<void>;
    trySetSender_DistributeEnable(
      addr: number,
      functionType: ModulationModeTypeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSender_DistributeEnable<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  functionType: ModulationModeTypeEnum
): Request<Broadcast> {
  const req = new Request(
    functionType === ModulationModeTypeEnum.TwoToFour ||
    functionType === ModulationModeTypeEnum.OneToEight
      ? [137]
      : functionType === ModulationModeTypeEnum.NoDistributor
        ? [255]
        : [0],
    bBroadcast,
    'SetSender_DistributeEnable'
  );
  req.destination = addr;
  req.address = AddressMapping.DistributeEnableAddr;
  return req;
}
Session.prototype.SetSender_DistributeEnable = async function SetSender_DistributeEnable(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  functionType: ModulationModeTypeEnum
): Promise<void> {
  const req = createSetSender_DistributeEnable(addr, bBroadcast, functionType);
  await this.connection.send(req);
};
Session.prototype.trySetSender_DistributeEnable = async function trySetSender_DistributeEnable(
  this: Session,
  addr: number,
  functionType: ModulationModeTypeEnum
): Promise<ErrorType | null> {
  const req = createSetSender_DistributeEnable(addr, false, functionType);
  return (await this.connection.trySend(req))?.ack ?? null;
};
