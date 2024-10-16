import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipDP3230RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      IsOpenChannelCheck: common.Bool_false,
    }),
    t.partial({
      RedFirstReg1: common.UInt16, // #844
      GreenFirstReg1: common.UInt16, // #846
      BlueFirstReg1: common.UInt16, // #848
      VRedFirstReg1: common.UInt16, // #850
      RedFirstReg2: common.UInt16, // #852
      GreenFirstReg2: common.UInt16, // #854
      BlueFirstReg2: common.UInt16, // #856
      VRedFirstReg2: common.UInt16, // #860
      IsUseNewModule: common.Bool, // #872
      FirstDataLen: common.Int32, // #874
      FirstStartIndex: common.Int32, // #876
      FirstRegisterAddr: common.Int32, // #878
      ThirdDataLen: common.Int32, // #880
      ThirdDataStartIndex: common.Int32, // #882
      ThirdRegisterAddr: common.Int32, // #884
      IsAdvancedMode: common.Bool, // #886
      VsCorner: common.UInt8, // #898
      GlckSet: common.UInt8, // #911
      DisshdEn: common.Bool, // #933
      PwmAdd: common.Bool, // #945
      PwmOpt: common.Bool, // #957
      PowerSavePd: common.Bool, // #969
      RZ_T1H: common.UInt16, // #981
      RZ_T0H: common.UInt16, // #993
      RZ_DCLK: common.UInt16,
    }),
  ],
  'ChipDP3230RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipDP3230RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipDP3230.decompiled.cs:831
 */
export const ChipDP3230RGBVExtendProperty = t.intersection(
  [
    ChipDP3230RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipDP3230RGBVExtendProperty') }),
  ],
  'ChipDP3230RGBVExtendProperty'
);
export interface ChipDP3230RGBVExtendProperty
  extends t.TypeOf<typeof ChipDP3230RGBVExtendProperty> {}
