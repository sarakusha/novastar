import { Buffer } from 'buffer';

import AddressMapping from '../../generated/AddressMapping';
import { BaudRateTypeEnum } from '../../generated/BaudRateType';

const makeOutDeviceBytes = (
  outDeviceAddress: number,
  baudRate: BaudRateTypeEnum,
  otherDeviceProtocol?: number[] | Buffer
): Buffer => {
  if (!otherDeviceProtocol || otherDeviceProtocol.length === 0)
    throw new TypeError('Invalid argument');
  const data = Buffer.alloc(
    AddressMapping.FuncCard_WriteOutDeviceHeaderOccupancy + otherDeviceProtocol.length
  );
  data[0] = outDeviceAddress;
  data[1] = baudRate;
  const src = Buffer.isBuffer(otherDeviceProtocol)
    ? otherDeviceProtocol
    : Buffer.from(otherDeviceProtocol);
  src.copy(data, AddressMapping.FuncCard_WriteOutDeviceHeaderOccupancy);
  return data;
};

export default makeOutDeviceBytes;
