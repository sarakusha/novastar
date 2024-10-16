import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link ChipSM16017SExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:57908
 */
export const ChipSM16017SExtendProperty = t.intersection(
  [
    t.type({
      REliminateAfterLow: common.UInt8_5, // #57938
      GEliminateAfterLow: common.UInt8_5, // #57951
      BEliminateAfterLow: common.UInt8_5, // #57977
      GDimCompensation: common.UInt8_3, // #57990
      BDimCompensation: common.UInt8_3, // #58003
      RLowAshImprovement: common.withDefault(common.UInt8, 6), // #58016
      GLowAshImprovement: common.UInt8_7, // #58029
      BLowAshImprovement: common.UInt8_7, // #58055
      RedRegValueConfigFirst: common.UInt16_41728, // #58068
      GreenRegValueConfigFirst: common.UInt16_44932, // #58081
      BlueRegValueConfigFirst: common.UInt16_44932, // #58094
      VRedRegValueConfigFirst: common.UInt16_41728,
    }),
    t.partial({
      RDimCompensation: common.UInt8, // #58042
      IsAdvancedMode: common.Bool,
    }),
  ],
  'ChipSM16017SExtendProperty'
);
export interface ChipSM16017SExtendProperty extends t.TypeOf<typeof ChipSM16017SExtendProperty> {}
