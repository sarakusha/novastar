// Nova.LCT.GigabitSystem.HardwareCaculator.dll
// noinspection SpellCheckingInspection

import { ChipTypeEnum } from '@novastar/native/build/main/generated/ChipType';
import { CommonIrCabinetTypeEnum } from '@novastar/native/build/main/generated/CommonIrCabinetType';
import { DataDirectionTypeEnum } from '@novastar/native/build/main/generated/DataDirectionType';
import { ModuleCascadeDiretionEnum } from '@novastar/native/build/main/generated/ModuleCascadeDiretion';
import type { ScanBoardProperty } from '@novastar/native/build/main/generated/ScanBoardProperty';
import { ScreenDriveTypeEnum } from '@novastar/native/build/main/generated/ScreenDriveType';

import { notEmptyProps } from './common';
import { CutMapInfo, Rectangle } from './fullScreenSelect';

export function CaculateShiftUnitNum(
  modWidth: number,
  modHeight: number,
  modTotalPointInTable: number,
  directionType: DataDirectionTypeEnum,
  cabinetRealWidth: number,
  cabinetRealHeight: number
): number {
  return (
    (directionType !== DataDirectionTypeEnum.Horizontal
      ? cabinetRealHeight / modHeight
      : cabinetRealWidth / modWidth) * modTotalPointInTable
  );
}

export const GetGrayScaleByGclkNumPerRef = (gclkNumPerRef: number) => {
  if (gclkNumPerRef > 32768) {
    return 16;
  }
  if (gclkNumPerRef > 16384) {
    return 15;
  }
  if (gclkNumPerRef > 8192) {
    return 14;
  }
  if (gclkNumPerRef > 4096) {
    return 13;
  }
  if (gclkNumPerRef > 2048) {
    return 12;
  }
  if (gclkNumPerRef > 1024) {
    return 11;
  }
  return 10;
};

type GetGclkInfoByPartNumPerRefReturnType = {
  gclkNumPerScan: number;
  validGclkNumPerScan: number;
  brightGclkNumPerScan: number;
};

export function GetGclkInfoByPartNumPerRef(
  chipType: ChipTypeEnum,
  partNumPerRef: number,
  isPWMModel = true,
  isGLCK = true
): GetGclkInfoByPartNumPerRefReturnType {
  switch (chipType) {
    case ChipTypeEnum.Chip_SUM2030:
    case ChipTypeEnum.Chip_SUM2130:
    case ChipTypeEnum.Chip_SUM2033:
    case ChipTypeEnum.Chip_SUM2131:
    case ChipTypeEnum.Chip_SUM2035:
    case ChipTypeEnum.Chip_SUM2135:
    case ChipTypeEnum.Chip_SUM2032:
      if (partNumPerRef <= 1) {
        return {
          gclkNumPerScan: 1041,
          validGclkNumPerScan: 1024,
          brightGclkNumPerScan: 1024,
        };
      }
      if (partNumPerRef <= 2) {
        return {
          gclkNumPerScan: 529,
          validGclkNumPerScan: 512,
          brightGclkNumPerScan: 512,
        };
      }
      if (partNumPerRef <= 4) {
        return {
          gclkNumPerScan: 273,
          validGclkNumPerScan: 256,
          brightGclkNumPerScan: 256,
        };
      }
      return {
        gclkNumPerScan: 145,
        validGclkNumPerScan: 128,
        brightGclkNumPerScan: 128,
      };
    case ChipTypeEnum.Chip_MY9268:
    case ChipTypeEnum.Chip_MY9266:
    case ChipTypeEnum.Chip_MY9366:
    case ChipTypeEnum.Chip_MY9269:
      if (partNumPerRef <= 1) {
        return {
          gclkNumPerScan: 513,
          validGclkNumPerScan: 1024,
          brightGclkNumPerScan: 512,
        };
      }
      return {
        gclkNumPerScan: 129,
        validGclkNumPerScan: 256,
        brightGclkNumPerScan: 128,
      };

    case ChipTypeEnum.Chip_MBI5042:
    case ChipTypeEnum.Chip_SM16136:
    case ChipTypeEnum.Chip_MY9262:
    case ChipTypeEnum.Chip_MBI5030:
      return {
        gclkNumPerScan: 1024,
        validGclkNumPerScan: 1024,
        brightGclkNumPerScan: 1024,
      };
    case ChipTypeEnum.Chip_MY9263:
      return {
        gclkNumPerScan: 512,
        validGclkNumPerScan: 512,
        brightGclkNumPerScan: 512,
      };
    case ChipTypeEnum.Chip_SM16158:
      if (partNumPerRef <= 1) {
        return {
          gclkNumPerScan: 1025,
          validGclkNumPerScan: 1024,
          brightGclkNumPerScan: 1024,
        };
      }
      if (partNumPerRef <= 2) {
        return {
          gclkNumPerScan: 513,
          validGclkNumPerScan: 1024,
          brightGclkNumPerScan: 512,
        };
      }
      if (partNumPerRef <= 4) {
        return {
          gclkNumPerScan: 257,
          validGclkNumPerScan: 512,
          brightGclkNumPerScan: 256,
        };
      }
      return {
        gclkNumPerScan: 129,
        validGclkNumPerScan: 512,
        brightGclkNumPerScan: 128,
      };

    case ChipTypeEnum.Chip_MBI5051:
    case ChipTypeEnum.Chip_MBI5052:
    case ChipTypeEnum.Chip_MBI5053:
    case ChipTypeEnum.Chip_MBI5152:
    case ChipTypeEnum.Chip_MBI5151:
      if (partNumPerRef <= 1) {
        return {
          gclkNumPerScan: 1025,
          validGclkNumPerScan: 1024,
          brightGclkNumPerScan: 1024,
        };
      }
      if (partNumPerRef <= 2) {
        return {
          gclkNumPerScan: 513,
          validGclkNumPerScan: 1024,
          brightGclkNumPerScan: 512,
        };
      }
      return {
        gclkNumPerScan: 257,
        validGclkNumPerScan: 512,
        brightGclkNumPerScan: 256,
      };

    case ChipTypeEnum.Chip_MBI5050:
      return {
        gclkNumPerScan: 1025,
        validGclkNumPerScan: 1024,
        brightGclkNumPerScan: 1024,
      };
    case ChipTypeEnum.Chip_TLC5958:
      if ((!isPWMModel && !isGLCK) || (isPWMModel && isGLCK)) {
        return {
          gclkNumPerScan: 257,
          validGclkNumPerScan: 260,
          brightGclkNumPerScan: 256,
        };
      }
      if (isPWMModel && !isGLCK) {
        return {
          gclkNumPerScan: 513,
          validGclkNumPerScan: 516,
          brightGclkNumPerScan: 256,
        };
      }
      return {
        gclkNumPerScan: 129,
        validGclkNumPerScan: 133,
        brightGclkNumPerScan: 256,
      };

    case ChipTypeEnum.Chip_TLC59581:
      if (!isPWMModel && !isGLCK) {
        return {
          gclkNumPerScan: 257,
          validGclkNumPerScan: 260,
          brightGclkNumPerScan: 256,
        };
      }
      if (isPWMModel && !isGLCK) {
        return {
          gclkNumPerScan: 129,
          validGclkNumPerScan: 133,
          brightGclkNumPerScan: 128,
        };
      }
      if (isPWMModel && isGLCK) {
        return {
          gclkNumPerScan: 65,
          validGclkNumPerScan: 69,
          brightGclkNumPerScan: 64,
        };
      }
      return {
        gclkNumPerScan: 129,
        validGclkNumPerScan: 133,
        brightGclkNumPerScan: 128,
      };

    case ChipTypeEnum.Chip_MBI5153:
    case ChipTypeEnum.Chip_MBI5252:
      if (partNumPerRef <= 1) {
        return {
          gclkNumPerScan: 513,
          validGclkNumPerScan: 512,
          brightGclkNumPerScan: 512,
        };
      }
      if (partNumPerRef <= 2) {
        return {
          gclkNumPerScan: 257,
          validGclkNumPerScan: 256,
          brightGclkNumPerScan: 256,
        };
      }
      if (partNumPerRef <= 3) {
        return {
          gclkNumPerScan: 257,
          validGclkNumPerScan: 256,
          brightGclkNumPerScan: 256,
        };
      }
      return {
        gclkNumPerScan: 129,
        validGclkNumPerScan: 128,
        brightGclkNumPerScan: 128,
      };

    case ChipTypeEnum.Chip_ICN2053:
    case ChipTypeEnum.Chip_ICND2055:
    case ChipTypeEnum.Chip_ICN2065:
    case ChipTypeEnum.Chip_ICN2050:
      if (partNumPerRef <= 1) {
        return {
          gclkNumPerScan: 1034,
          validGclkNumPerScan: 1024,
          brightGclkNumPerScan: 1024,
        };
      }
      if (partNumPerRef <= 2) {
        return {
          gclkNumPerScan: 522,
          validGclkNumPerScan: 512,
          brightGclkNumPerScan: 512,
        };
      }
      if (partNumPerRef <= 4) {
        return {
          gclkNumPerScan: 266,
          validGclkNumPerScan: 256,
          brightGclkNumPerScan: 256,
        };
      }
      return {
        gclkNumPerScan: 138,
        validGclkNumPerScan: 128,
        brightGclkNumPerScan: 128,
      };

    case ChipTypeEnum.Chip_SM16159:
    case ChipTypeEnum.Chip_SM16169S:
      if (partNumPerRef <= 1) {
        return {
          gclkNumPerScan: 1025,
          validGclkNumPerScan: 1024,
          brightGclkNumPerScan: 1024,
        };
      }
      if (partNumPerRef <= 2) {
        return {
          gclkNumPerScan: 513,
          validGclkNumPerScan: 513,
          brightGclkNumPerScan: 513,
        };
      }
      if (partNumPerRef <= 4) {
        return {
          gclkNumPerScan: 257,
          validGclkNumPerScan: 256,
          brightGclkNumPerScan: 256,
        };
      }
      return {
        gclkNumPerScan: 129,
        validGclkNumPerScan: 128,
        brightGclkNumPerScan: 128,
      };

    case ChipTypeEnum.Chip_MBI5253:
    case ChipTypeEnum.Chip_MBI5253B:
    case ChipTypeEnum.Chip_MBI5359:
      if (!isGLCK && !isPWMModel) {
        if (partNumPerRef <= 1) {
          return {
            gclkNumPerScan: 513,
            validGclkNumPerScan: 512,
            brightGclkNumPerScan: 512,
          };
        }
        if (partNumPerRef <= 2) {
          return {
            gclkNumPerScan: 129,
            validGclkNumPerScan: 128,
            brightGclkNumPerScan: 128,
          };
        }
        if (partNumPerRef <= 3) {
          return {
            gclkNumPerScan: 128,
            validGclkNumPerScan: 128,
            brightGclkNumPerScan: 128,
          };
        }
        return {
          gclkNumPerScan: 128,
          validGclkNumPerScan: 128,
          brightGclkNumPerScan: 128,
        };
      }
      if (isGLCK && !isPWMModel) {
        if (partNumPerRef <= 1) {
          return {
            gclkNumPerScan: 257,
            validGclkNumPerScan: 256,
            brightGclkNumPerScan: 256,
          };
        }
        if (partNumPerRef <= 2) {
          return {
            gclkNumPerScan: 65,
            validGclkNumPerScan: 64,
            brightGclkNumPerScan: 64,
          };
        }
        if (partNumPerRef <= 3) {
          return {
            gclkNumPerScan: 64,
            validGclkNumPerScan: 128,
            brightGclkNumPerScan: 64,
          };
        }
        return {
          gclkNumPerScan: 64,
          validGclkNumPerScan: 128,
          brightGclkNumPerScan: 64,
        };
      }
      if (!isGLCK && isPWMModel) {
        if (partNumPerRef <= 1) {
          return {
            gclkNumPerScan: 257,
            validGclkNumPerScan: 256,
            brightGclkNumPerScan: 256,
          };
        }
        if (partNumPerRef <= 2) {
          return {
            gclkNumPerScan: 65,
            validGclkNumPerScan: 64,
            brightGclkNumPerScan: 64,
          };
        }
        if (partNumPerRef <= 3) {
          return {
            gclkNumPerScan: 64,
            validGclkNumPerScan: 64,
            brightGclkNumPerScan: 64,
          };
        }
        return {
          gclkNumPerScan: 64,
          validGclkNumPerScan: 64,
          brightGclkNumPerScan: 64,
        };
      }
      if (partNumPerRef <= 1) {
        return {
          gclkNumPerScan: 129,
          validGclkNumPerScan: 128,
          brightGclkNumPerScan: 128,
        };
      }
      if (partNumPerRef <= 2) {
        return {
          gclkNumPerScan: 33,
          validGclkNumPerScan: 32,
          brightGclkNumPerScan: 32,
        };
      }
      if (partNumPerRef <= 3) {
        return {
          gclkNumPerScan: 32,
          validGclkNumPerScan: 64,
          brightGclkNumPerScan: 32,
        };
      }
      return {
        gclkNumPerScan: 32,
        validGclkNumPerScan: 64,
        brightGclkNumPerScan: 32,
      };

    case ChipTypeEnum.Chip_MBI5051B:
    case ChipTypeEnum.Chip_MBI5155:
      if (partNumPerRef <= 1) {
        return {
          gclkNumPerScan: 1025,
          validGclkNumPerScan: 1024,
          brightGclkNumPerScan: 1024,
        };
      }
      if (partNumPerRef <= 2) {
        return {
          gclkNumPerScan: 513,
          validGclkNumPerScan: 512,
          brightGclkNumPerScan: 512,
        };
      }
      if (partNumPerRef <= 3) {
        return {
          gclkNumPerScan: 513,
          validGclkNumPerScan: 512,
          brightGclkNumPerScan: 512,
        };
      }
      if (partNumPerRef <= 4) {
        return {
          gclkNumPerScan: 257,
          validGclkNumPerScan: 256,
          brightGclkNumPerScan: 256,
        };
      }
      if (partNumPerRef <= 5) {
        return {
          gclkNumPerScan: 513,
          validGclkNumPerScan: 512,
          brightGclkNumPerScan: 512,
        };
      }
      if (partNumPerRef <= 6) {
        return {
          gclkNumPerScan: 257,
          validGclkNumPerScan: 256,
          brightGclkNumPerScan: 256,
        };
      }
      if (partNumPerRef <= 7) {
        return {
          gclkNumPerScan: 257,
          validGclkNumPerScan: 256,
          brightGclkNumPerScan: 256,
        };
      }
      return {
        gclkNumPerScan: 129,
        validGclkNumPerScan: 128,
        brightGclkNumPerScan: 128,
      };

    case ChipTypeEnum.Chip_MBI5353:
    case ChipTypeEnum.Chip_MBI5354:
      if (!isPWMModel) {
        if (partNumPerRef <= 1) {
          return {
            gclkNumPerScan: 1025,
            validGclkNumPerScan: 1024,
            brightGclkNumPerScan: 1024,
          };
        }
        if (partNumPerRef <= 2) {
          return {
            gclkNumPerScan: 513,
            validGclkNumPerScan: 512,
            brightGclkNumPerScan: 512,
          };
        }
        if (partNumPerRef <= 4) {
          return {
            gclkNumPerScan: 257,
            validGclkNumPerScan: 256,
            brightGclkNumPerScan: 256,
          };
        }
        return {
          gclkNumPerScan: 129,
          validGclkNumPerScan: 128,
          brightGclkNumPerScan: 128,
        };
      }
      if (partNumPerRef <= 1) {
        return {
          gclkNumPerScan: 513,
          validGclkNumPerScan: 512,
          brightGclkNumPerScan: 512,
        };
      }
      if (partNumPerRef <= 2) {
        return {
          gclkNumPerScan: 257,
          validGclkNumPerScan: 256,
          brightGclkNumPerScan: 256,
        };
      }
      if (partNumPerRef <= 4) {
        return {
          gclkNumPerScan: 129,
          validGclkNumPerScan: 128,
          brightGclkNumPerScan: 128,
        };
      }
      return {
        gclkNumPerScan: 65,
        validGclkNumPerScan: 64,
        brightGclkNumPerScan: 64,
      };

    case ChipTypeEnum.Chip_MY9373:
      if (isGLCK) {
        if (partNumPerRef <= 1) {
          return {
            gclkNumPerScan: 513,
            validGclkNumPerScan: 512,
            brightGclkNumPerScan: 1024,
          };
        }
        if (partNumPerRef <= 2) {
          return {
            gclkNumPerScan: 257,
            validGclkNumPerScan: 256,
            brightGclkNumPerScan: 512,
          };
        }
        if (partNumPerRef <= 3) {
          return {
            gclkNumPerScan: 129,
            validGclkNumPerScan: 128,
            brightGclkNumPerScan: 256,
          };
        }
        return {
          gclkNumPerScan: 65,
          validGclkNumPerScan: 64,
          brightGclkNumPerScan: 128,
        };
      }
      if (partNumPerRef <= 1) {
        return {
          gclkNumPerScan: 513,
          validGclkNumPerScan: 512,
          brightGclkNumPerScan: 512,
        };
      }
      if (partNumPerRef <= 2) {
        return {
          gclkNumPerScan: 257,
          validGclkNumPerScan: 256,
          brightGclkNumPerScan: 256,
        };
      }
      if (partNumPerRef <= 3) {
        return {
          gclkNumPerScan: 129,
          validGclkNumPerScan: 128,
          brightGclkNumPerScan: 128,
        };
      }
      return {
        gclkNumPerScan: 65,
        validGclkNumPerScan: 64,
        brightGclkNumPerScan: 64,
      };

    case ChipTypeEnum.Chip_MY9348:
    case ChipTypeEnum.Chip_MY9748:
      if (!isPWMModel || chipType === ChipTypeEnum.Chip_MY9748) {
        if (partNumPerRef <= 1) {
          return {
            gclkNumPerScan: 512,
            validGclkNumPerScan: 512,
            brightGclkNumPerScan: 512,
          };
        }
        if (partNumPerRef <= 2) {
          return {
            gclkNumPerScan: 256,
            validGclkNumPerScan: 256,
            brightGclkNumPerScan: 256,
          };
        }
        if (partNumPerRef <= 4) {
          return {
            gclkNumPerScan: 128,
            validGclkNumPerScan: 128,
            brightGclkNumPerScan: 128,
          };
        }
        return {
          gclkNumPerScan: 64,
          validGclkNumPerScan: 64,
          brightGclkNumPerScan: 64,
        };
      }
      if (partNumPerRef <= 1) {
        return {
          gclkNumPerScan: 256,
          validGclkNumPerScan: 256,
          brightGclkNumPerScan: 256,
        };
      }
      if (partNumPerRef <= 2) {
        return {
          gclkNumPerScan: 128,
          validGclkNumPerScan: 128,
          brightGclkNumPerScan: 128,
        };
      }
      if (partNumPerRef <= 4) {
        return {
          gclkNumPerScan: 64,
          validGclkNumPerScan: 64,
          brightGclkNumPerScan: 64,
        };
      }
      return {
        gclkNumPerScan: 32,
        validGclkNumPerScan: 32,
        brightGclkNumPerScan: 32,
      };

    case ChipTypeEnum.Chip_SM16359:
      if (partNumPerRef <= 2) {
        return {
          gclkNumPerScan: 515,
          validGclkNumPerScan: 512,
          brightGclkNumPerScan: 512,
        };
      }
      if (partNumPerRef <= 4) {
        return {
          gclkNumPerScan: 259,
          validGclkNumPerScan: 256,
          brightGclkNumPerScan: 256,
        };
      }
      if (partNumPerRef <= 8) {
        return {
          gclkNumPerScan: 131,
          validGclkNumPerScan: 128,
          brightGclkNumPerScan: 128,
        };
      }
      return {
        gclkNumPerScan: 67,
        validGclkNumPerScan: 64,
        brightGclkNumPerScan: 64,
      };

    default:
      if (chipType !== ChipTypeEnum.Chip_VOD5153 && chipType !== ChipTypeEnum.Chip_ICND2163) {
        return {
          gclkNumPerScan: 129,
          validGclkNumPerScan: 128,
          brightGclkNumPerScan: 128,
        };
      }
      return {
        gclkNumPerScan: 74,
        validGclkNumPerScan: 64,
        brightGclkNumPerScan: 64,
      };
  }
}

export const isValidScanBdProp = notEmptyProps(
  'IsDExtendMode',
  'TwentyDataGroupEnable',
  'Is24DataGroup',
  'Is28DataGroup',
  'StandardLedModuleProp',
  'IsSymmetricalOutputMode',
  'CommonIrCabinetMode',
  'IsIrRegular',
  'ChipPropey',
  'SpecialFrameRate'
);

export const isValidStandardLedModuleProp = notEmptyProps('ScreenDriveType');

export const GetDoorCountFromScanBdInfo = (scanBdProp: Readonly<ScanBoardProperty>): number => {
  if (!isValidScanBdProp(scanBdProp)) throw new TypeError('Invalid ScanBoardProperty');
  const { IsSymmetricalOutputMode, CommonIrCabinetMode } = scanBdProp;
  if (IsSymmetricalOutputMode) return 2;
  switch (CommonIrCabinetMode) {
    case CommonIrCabinetTypeEnum.FourDoor:
      return 4;
    case CommonIrCabinetTypeEnum.ThreeDoor:
      return 3;
    default:
      return 1;
  }
};

export const GetMaxCabinetDataGroup = (scanBdProp: Readonly<ScanBoardProperty>): number => {
  if (!isValidScanBdProp(scanBdProp)) throw new TypeError('Invalid ScanBoardProperty');
  const {
    StandardLedModuleProp: { ScreenDriveType },
    IsDExtendMode,
    TwentyDataGroupEnable,
    Is24DataGroup,
    Is28DataGroup,
  } = scanBdProp;
  switch (ScreenDriveType) {
    case ScreenDriveTypeEnum.Concurrent:
      if (IsDExtendMode) return 32;
      if (TwentyDataGroupEnable) return 20;
      if (Is28DataGroup) return 28;
      if (Is24DataGroup) return 24;
      return 16;
    case ScreenDriveTypeEnum.Serial:
      return IsDExtendMode ? 128 : 64;
    default:
      throw new TypeError('Invalid ScreenDriveType');
  }
};

export type MaxloadSize = {
  maxWidth: number;
  maxHeight: number;
  // maxShiftUnitNum: number;
};

const alignGroup = (value: number, screenDriveType: ScreenDriveTypeEnum): number => {
  if (screenDriveType === ScreenDriveTypeEnum.Serial) {
    if (value <= 8) return 8;
    if (value < 16) return 16;
  } else if (value < 4) {
    return 4;
  }
  return value;
};

export const GetHorizontalCascadeMaxLoad = (
  scanBdProp: Readonly<ScanBoardProperty>,
  maxLoadedPixels: number,
  maxArea: number
): MaxloadSize => {
  if (!isValidScanBdProp(scanBdProp)) throw new TypeError('Invalid ScanBoardProperty');
  const { StandardLedModuleProp, Height } = scanBdProp;
  if (!isValidStandardLedModuleProp(StandardLedModuleProp))
    throw new TypeError('Invalid StandardLedModuleProp');
  const cabinetDataGroup = GetMaxCabinetDataGroup(scanBdProp);
  const countFromScanBdInfo = GetDoorCountFromScanBdInfo(scanBdProp);
  const {
    ScanType,
    DataGroup,
    ModulePixelCols,
    ModulePixelRows,
    TotalPointInTable,
    ScreenDriveType,
  } = StandardLedModuleProp;
  const num1 = cabinetDataGroup / countFromScanBdInfo / DataGroup;
  const maxHeight = ModulePixelRows * num1;
  const rows = Math.ceil(Height / ModulePixelRows);
  const num3 = alignGroup(rows * DataGroup, ScreenDriveType);
  const maxC = Math.floor(maxArea / ScanType / num3);
  const c = Math.floor((maxLoadedPixels * ModulePixelCols) / TotalPointInTable);

  return {
    maxHeight,
    maxWidth: Math.min(maxC, c) * countFromScanBdInfo,
  };
};

export const GetVerticalCascadeMaxLoad = (
  scanBdProp: Readonly<ScanBoardProperty>,
  maxLoadedPixels: number,
  maxArea: number
): MaxloadSize => {
  if (!isValidScanBdProp(scanBdProp)) throw new TypeError('Invalid ScanBoardProperty');
  const { Width, StandardLedModuleProp } = scanBdProp;
  if (!isValidStandardLedModuleProp(StandardLedModuleProp))
    throw new TypeError('Invalid StandardLedModuleProp');
  const cabinetDataGroup = GetMaxCabinetDataGroup(scanBdProp);
  const countFromScanBdInfo = GetDoorCountFromScanBdInfo(scanBdProp);
  const {
    ScanType,
    DataGroup,
    ModulePixelCols,
    ModulePixelRows,
    TotalPointInTable,
    ScreenDriveType,
  } = StandardLedModuleProp;
  const num1 = cabinetDataGroup / countFromScanBdInfo / DataGroup;
  const maxWidth = ModulePixelCols * num1;
  const cols = Math.ceil(Width / ModulePixelCols);
  const num3 = alignGroup(cols * DataGroup, ScreenDriveType);
  const maxR = Math.floor(maxArea / ScanType / num3);
  const r = Math.floor((maxLoadedPixels * ModulePixelRows) / TotalPointInTable);
  return {
    maxWidth,
    maxHeight: Math.min(maxR, r) * countFromScanBdInfo,
  };
};

export const CaculateMaxloadSize = (
  scanBdProp: Readonly<ScanBoardProperty>,
  maxLoadedPixels: number,
  maxArea: number
): MaxloadSize => {
  switch (scanBdProp.ModCascadeType) {
    case ModuleCascadeDiretionEnum.RightLeft:
    case ModuleCascadeDiretionEnum.LeftRight: {
      const { maxWidth, ...other } = GetHorizontalCascadeMaxLoad(
        scanBdProp,
        maxLoadedPixels,
        maxArea
      );
      return {
        maxWidth: scanBdProp.Height ? Math.min(maxArea / scanBdProp.Height, maxArea) : 0,
        ...other,
      };
    }
    case ModuleCascadeDiretionEnum.DownUp:
    case ModuleCascadeDiretionEnum.UpDown: {
      const { maxHeight, ...other } = GetVerticalCascadeMaxLoad(
        scanBdProp,
        maxLoadedPixels,
        maxArea
      );
      return {
        maxHeight: scanBdProp.Width ? Math.min(maxArea / scanBdProp.Width, maxArea) : 0,
        ...other,
      };
    }
    default:
      throw new TypeError('Invalid ModCascadeType');
  }
};

export const CaculateCutMapAddrIndex = (
  width: number,
  cutRect: Rectangle,
  pointBytes: number
): CutMapInfo[] => {
  const cutMapInfoList: CutMapInfo[] = [];
  for (let index = 0; index < cutRect.height; index += 1) {
    const address = ((cutRect.y + index) * width + cutRect.x) * pointBytes;
    const length = cutRect.width * pointBytes;
    cutMapInfoList.push({
      address,
      length,
    });
  }
  return cutMapInfoList;
};
