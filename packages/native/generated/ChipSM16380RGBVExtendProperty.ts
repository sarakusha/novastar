import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipSM16380ExtendProperty } from './ChipSM16380ExtendProperty';
 // import
export const ChipSM16380RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      IsAdvancedMode: common.Bool_true,
    }),
    t.partial({
      RedExtendProperty: ChipSM16380ExtendProperty, // #1173
      GreenExtendProperty: ChipSM16380ExtendProperty, // #1175
      BlueExtendProperty: ChipSM16380ExtendProperty, // #1177
      VRedExtendProperty: ChipSM16380ExtendProperty, // #1179
      IsUseNewModule: common.Bool, // #1189
      ScanCount: common.UInt8, // #1201
      MutiRate: common.UInt8, // #1215
      FailureEliminationEn: common.Bool, // #1229
      CurrentGainGrade: common.UInt8, // #1243
      FirstDataLen: common.Int32, // #1274
      FirstStartIndex: common.Int32, // #1276
      FirstRegisterAddr: common.Int32, // #1278
      SecondDataLen: common.Int32, // #1280
      SecondStartIndex: common.Int32, // #1282
      SecondRegisterAddr: common.Int32, // #1284
      SpecialDataLen: common.Int32, // #1286
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipSM16380RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16380RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipSM16380.decompiled.cs:1166
 */
export const ChipSM16380RGBVExtendProperty = t.intersection(
  [
    ChipSM16380RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16380RGBVExtendProperty') }),
  ],
  'ChipSM16380RGBVExtendProperty'
);
export interface ChipSM16380RGBVExtendProperty
  extends t.TypeOf<typeof ChipSM16380RGBVExtendProperty> {
  RedExtendProperty?: ChipSM16380ExtendProperty;
  GreenExtendProperty?: ChipSM16380ExtendProperty;
  BlueExtendProperty?: ChipSM16380ExtendProperty;
  VRedExtendProperty?: ChipSM16380ExtendProperty;
}
