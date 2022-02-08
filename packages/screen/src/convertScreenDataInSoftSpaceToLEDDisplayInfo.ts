import { makeStruct } from '@novastar/native/build/main/common';
import { ComplexLEDDisplayInfo } from '@novastar/native/build/main/generated/ComplexLEDDisplayInfo';
import { LEDDisplyTypeEnum } from '@novastar/native/build/main/generated/LEDDisplyType';
import { ScanBoardRegionInfo } from '@novastar/native/build/main/generated/ScanBoardRegionInfo';
import { ScreenDataInSoftSpace } from '@novastar/native/build/main/generated/ScreenDataInSoftSpace';
import { SimpleLEDDisplayInfo } from '@novastar/native/build/main/generated/SimpleLEDDisplayInfo';
import { StandardLEDDisplayInfo } from '@novastar/native/build/main/generated/StandardLEDDisplayInfo';

import { LEDDisplayInfo } from './common';

export default function convertScreenDataInSoftSpaceToLEDDisplayInfo(
  scr: ScreenDataInSoftSpace
): LEDDisplayInfo {
  switch (scr.ScrType) {
    case LEDDisplyTypeEnum.SimpleSingleType:
      return makeStruct(SimpleLEDDisplayInfo, {
        Type: LEDDisplyTypeEnum.SimpleSingleType,
        VirtualMode: scr.VirMode,
        X: scr.ScrX,
        Y: scr.ScrY,
        SenderIndex: scr.DeviceID,
        PixelColsInScanBd: scr.CabinetWidth,
        PixelRowsInScanBd: scr.CabinetHeight,
        ScanBdCols: scr.CabinetCol,
        ScanBdRows: scr.CabinetRow,
        PortCols: scr.PortCols,
        PortRows: scr.PortRows,
        PortScanBdInfoList: scr.OnePortLoadInfo?.map(info => ({
          ConnectType: info.LineType,
          PortIndex: info.Port,
          ScanBdBegColNo: info.StartCabCol,
          ScanBdBegRowNo: info.StartCabRow,
          ScanBdEndColNo: info.EndCabCol,
          ScanBdEndRowNo: info.EndCabRow,
        })),
      });
    case LEDDisplyTypeEnum.StandardType:
      if ((scr.CabinetCol ?? 0) * (scr.CabinetRow ?? 0) !== (scr.CabinetInDevice?.length ?? 0))
        throw new TypeError('Invalid CabinetInDevice');
      return makeStruct(StandardLEDDisplayInfo, {
        Type: LEDDisplyTypeEnum.StandardType,
        VirtualMode: scr.VirMode,
        X: scr.ScrX,
        Y: scr.ScrY,
        DVIOffest: scr.DVIlist,
        ScanBoardCols: scr.CabinetCol,
        ScanBoardRows: scr.CabinetRow,
        ScannerRegionList: scr.CabinetInDevice?.map(
          cab =>
            ({
              SenderIndex: cab.DevID,
              PortIndex: cab.NetPort,
              ConnectIndex: cab.ConnectID,
              X: cab.XPos,
              Y: cab.YPos,
              Width: cab.Width,
              Height: cab.Height,
              RowIndexInScreen: cab.RowIndexInScreen,
              ColIndexInScreen: cab.ColIndexInScreen,
              DVIIndex: cab.DviIndex,
            } as ScanBoardRegionInfo)
        ),
      });
    case LEDDisplyTypeEnum.ComplexType:
      return makeStruct(ComplexLEDDisplayInfo, {
        Type: LEDDisplyTypeEnum.ComplexType,
        VirtualMode: scr.VirMode,
        ScanBoardRegionInfoList: scr.CabinetInDevice?.map(
          cab =>
            ({
              SenderIndex: cab.DevID,
              PortIndex: cab.NetPort,
              ConnectIndex: cab.ConnectID,
              X: cab.XPos,
              Y: cab.YPos,
              Width: cab.Width,
              Height: cab.Height,
            } as ScanBoardRegionInfo)
        ),
      });
    default:
      throw new TypeError(`Unknown screen type: ${JSON.stringify(scr.ScrType)}`);
  }
}
