import { LEDDisplyTypeEnum } from '@novastar/native/LEDDisplyType';
import { ScreenDataInSoftSpace } from '@novastar/native/ScreenDataInSoftSpace';
import { UInt32, UInt8 } from '@novastar/native/common';
import sortBy from 'lodash/sortBy';

/**
 * ScreenInfoAccessor:NewSoftSpaceReadCompeleteCallBack
 */
export default function packAndSortCabinets(
  screenList: ScreenDataInSoftSpace[],
  index: number
): ScreenDataInSoftSpace[] {
  return sortBy(
    Object.values(
      screenList.reduce<Record<string, ScreenDataInSoftSpace>>((acc, screen) => {
        const copy: ScreenDataInSoftSpace = { ...screen };
        if (!copy.UUID) throw new TypeError('Unknown screen UUID');
        switch (copy.ScrType) {
          case LEDDisplyTypeEnum.SimpleSingleType:
            if (UInt8.is(index)) copy.DeviceID = index;
            break;
          case LEDDisplyTypeEnum.StandardType:
          case LEDDisplyTypeEnum.ComplexType:
            copy.CabinetInDevice = copy.CabinetInDevice?.map(({ DevID, ...cabinet }) => ({
              ...cabinet,
              DevID: DevID !== 255 && UInt32.is(index) ? index : DevID,
            }));
            break;
          default:
            throw new TypeError('Unknown screen type');
        }
        const { [copy.UUID]: prev, ...other } = acc;
        if (prev && copy.CabinetInDevice) {
          if (!prev.CabinetInDevice) prev.CabinetInDevice = copy.CabinetInDevice;
          else prev.CabinetInDevice.push(...copy.CabinetInDevice);
        }
        return { [copy.UUID]: prev ?? copy, ...other };
      }, {})
    ).map(({ CabinetInDevice: cabs, ...screen }) => ({
      CabinetInDevice: cabs && sortBy(cabs, ['YPos', 'XPos']),
      ...screen,
    })),
    'ScreenIndex'
  );
}
