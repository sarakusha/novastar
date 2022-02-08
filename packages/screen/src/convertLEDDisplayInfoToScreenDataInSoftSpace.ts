import { makeStruct } from '@novastar/native/build/main/common';
import { CabinetInDevice } from '@novastar/native/build/main/generated/CabinetInDevice';
import { DviSelectModeEnum } from '@novastar/native/build/main/generated/DviSelectMode';
import { LEDDisplyTypeEnum } from '@novastar/native/build/main/generated/LEDDisplyType';
import { OnePortLoadInfo } from '@novastar/native/build/main/generated/OnePortLoadInfo';
import { ScreenDataInSoftSpace } from '@novastar/native/build/main/generated/ScreenDataInSoftSpace';
import { v4 as uuid } from 'uuid';

import { isComplexScreen, isSimpleScreen, isStandardScreen, LEDDisplayInfo } from './common';

/**
 * Nova.LCT.GigabitSystem.CommonInfoAccessor.dll
 * Nova.LCT.GigabitSystem.CommonInfoAccessor::NewScreenDataConvertor::ConvertFromEditZoneToSoftSpace
 * @param scr
 * @param index
 */
export default function convertLEDDisplayInfoToScreenDataInSoftSpace(
  scr: LEDDisplayInfo,
  index: number
): ScreenDataInSoftSpace {
  const UUID = uuid();
  if (isSimpleScreen(scr)) {
    return makeStruct(ScreenDataInSoftSpace, {
      UUID,
      ScreenIndex: index,
      ScrType: LEDDisplyTypeEnum.SimpleSingleType,
      VirMode: scr.VirtualMode,
      ScrX: scr.X,
      ScrY: scr.Y,
      DeviceID: scr.SenderIndex,
      PortCols: scr.PortCols,
      PortRows: scr.PortRows,
      CabinetCol: scr.ScanBdCols,
      CabinetRow: scr.ScanBdRows,
      CabinetWidth: scr.PixelColsInScanBd,
      CabinetHeight: scr.PixelRowsInScanBd,
      OnePortLoadInfo: scr.PortScanBdInfoList?.map(port =>
        makeStruct(OnePortLoadInfo, {
          LineType: port.ConnectType,
          Port: port.PortIndex,
          StartCabCol: port.ScanBdBegColNo,
          StartCabRow: port.ScanBdBegRowNo,
          EndCabCol: port.ScanBdEndColNo,
          EndCabRow: port.ScanBdEndRowNo,
        })
      ),
    });
  }
  if (isStandardScreen(scr)) {
    if (
      (scr.ScanBoardRows ?? 0) * (scr.ScanBoardCols ?? 0) !==
      (scr.ScannerRegionList?.length ?? 0)
    )
      throw new TypeError('Invalid ScannerRegionList length');
    const [first] = scr.ScannerRegionList ?? [];
    return makeStruct(ScreenDataInSoftSpace, {
      UUID,
      ScreenIndex: index,
      ScrType: LEDDisplyTypeEnum.StandardType,
      VirMode: scr.VirtualMode,
      ScrX: scr.X,
      ScrY: scr.Y,
      CabinetCol: scr.ScanBoardCols,
      CabinetRow: scr.ScanBoardRows,
      DVIlist: scr.DVIOffest,
      DviSelect: first?.DviSelect ?? DviSelectModeEnum.DVI,
      CabinetInDevice: scr.ScannerRegionList?.map(region =>
        makeStruct(CabinetInDevice, {
          DevID: region.SenderIndex,
          NetPort: region.PortIndex,
          ConnectID: region.ConnectIndex,
          XPos: region.X,
          YPos: region.Y,
          Width: region.Width,
          Height: region.Height,
          RowIndexInScreen: region.RowIndexInScreen,
          ColIndexInScreen: region.ColIndexInScreen,
          DviIndex: region.DVIIndex,
        })
      ),
    });
  }
  if (isComplexScreen(scr)) {
    return makeStruct(ScreenDataInSoftSpace, {
      UUID,
      ScreenIndex: index,
      ScrType: LEDDisplyTypeEnum.ComplexType,
      VirMode: scr.VirtualMode,
      CabinetInDevice: scr.ScanBoardRegionInfoList?.map(region =>
        makeStruct(CabinetInDevice, {
          DevID: region.SenderIndex,
          NetPort: region.PortIndex,
          ConnectID: region.ConnectIndex,
          XPos: region.X,
          YPos: region.Y,
          Width: region.Width,
          Height: region.Height,
        })
      ),
    });
  }
  throw new TypeError('Invalid screen type');
}
