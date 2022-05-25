import { LEDDisplyTypeEnum } from '@novastar/native/LEDDisplyType';
import { ScreenDataInSoftSpace } from '@novastar/native/ScreenDataInSoftSpace';
import sortBy from 'lodash/sortBy';

/**
 * Nova.LCT.GigabitSystem.CommonInfoAccessor.dll
 *
 * Nova.LCT.GigabitSystem.CommonInfoAccessor::NewScreenDataConvertor::GetDeviceScreenData
 * @param screens
 */
export default function splitScreensByDevice(
  screens: ScreenDataInSoftSpace[]
): ScreenDataInSoftSpace[][] {
  return sortBy(
    Object.entries(
      screens.reduce<Record<number, ScreenDataInSoftSpace[]>>((acc, scr) => {
        switch (scr.ScrType) {
          case LEDDisplyTypeEnum.SimpleSingleType: {
            if (typeof scr.DeviceID !== 'number') throw new TypeError('Invalid DeviceID');
            const { [scr.DeviceID]: prev, ...other } = acc;
            return { [scr.DeviceID]: [...prev, scr], ...other } as Record<
              number,
              ScreenDataInSoftSpace[]
            >;
          }
          case LEDDisplyTypeEnum.StandardType:
          case LEDDisplyTypeEnum.ComplexType: {
            const ids =
              scr.CabinetInDevice?.map(({ DevID }) => DevID).filter(DevID => DevID !== 255) ?? [];
            return (scr.CabinetInDevice ?? []).reduce<Record<number, ScreenDataInSoftSpace[]>>(
              (res, cab) => {
                const key: number = (cab.DevID !== 255 ? cab.DevID : ids?.[0]) ?? 0;
                const { [key]: prev, ...other } = res;
                if (!prev)
                  return {
                    [key]: [
                      {
                        ...scr,
                        CabinetInDevice: [cab],
                      },
                    ],
                    ...other,
                  };
                const copy = [...prev];
                const found = copy.findIndex(item => item.UUID === scr.UUID);
                if (found !== -1) {
                  const [item] = copy.splice(found, 1);
                  copy.splice(found, 0, {
                    ...item,
                    CabinetInDevice: item.CabinetInDevice ? [...item.CabinetInDevice, cab] : [cab],
                  });
                } else {
                  copy.push({
                    ...scr,
                    CabinetInDevice: [cab],
                  });
                }
                return {
                  [key]: copy,
                  ...other,
                };
              },
              acc
            );
          }
          default:
            throw new TypeError('Invalid screen type');
        }
      }, {})
    ),
    ([index]) => index
  ).map(([_, value]) => value);
}
