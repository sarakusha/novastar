import { ScanBoardConnectTypeEnum } from '@novastar/native/ScanBoardConnectType';
import { ExtractType, Struct, typed } from 'typed-struct';

export const ScreenConfigInfo = new Struct('ScreenConfigInfo')
  .UInt8('Type', typed<1 | 3 | 5>())
  .seek(1)
  .UInt16LE('X')
  .UInt16LE('Y')
  .UInt16LE('PixelColsInScanBd')
  .UInt16LE('PixelRowsInScanBd')
  .UInt8('ScanBdRows')
  .UInt8('ScanBdCols')
  .Custom(
    'ConnectType',
    1,
    (type, [value]) => {
      switch (value) {
        case 0:
          return ScanBoardConnectTypeEnum.LeftTop_Horizontal;
        case 1:
          return ScanBoardConnectTypeEnum.LeftTop_Vertical;
        case 2:
          return ScanBoardConnectTypeEnum.RightTop_Horizontal;
        case 3:
          return ScanBoardConnectTypeEnum.RightTop_Vertical;
        case 4:
          return ScanBoardConnectTypeEnum.LeftBottom_Horizontal;
        case 5:
          return ScanBoardConnectTypeEnum.LeftBottom_Vertical;
        case 6:
          return ScanBoardConnectTypeEnum.RightBottom_Horizontal;
        default:
          return ScanBoardConnectTypeEnum.RightBottom_Vertical;
      }
    },
    (type, buf, value: ScanBoardConnectTypeEnum) => {
      let data: number;
      switch (value) {
        case ScanBoardConnectTypeEnum.LeftTop_Horizontal:
          data = 0;
          break;
        case ScanBoardConnectTypeEnum.LeftTop_Vertical:
          data = 1;
          break;
        case ScanBoardConnectTypeEnum.RightTop_Horizontal:
          data = 2;
          break;
        case ScanBoardConnectTypeEnum.RightTop_Vertical:
          data = 3;
          break;
        case ScanBoardConnectTypeEnum.LeftBottom_Horizontal:
          data = 4;
          break;
        case ScanBoardConnectTypeEnum.LeftBottom_Vertical:
          data = 5;
          break;
        case ScanBoardConnectTypeEnum.RightBottom_Horizontal:
          data = 6;
          break;
        default:
          data = 7;
          break;
      }
      return buf.writeUInt8(data) > 0;
    }
  )
  .UInt16LE('CabinetsPerPort')
  .compile();

export type ScreenConfigInfo = ExtractType<typeof ScreenConfigInfo, false>;
