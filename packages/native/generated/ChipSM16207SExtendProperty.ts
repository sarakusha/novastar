import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipSM16207SExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REliminateAfterLow1: common.UInt8_5, // #59501
      GEliminateAfterLow1: common.UInt8_5, // #59514
      BEliminateAfterLow1: common.UInt8_5, // #59527
      RDimCompensation: common.UInt8_3, // #59540
      GDimCompensation: common.UInt8_3, // #59553
      BDimCompensation: common.UInt8_3, // #59605
      REliminateAfterLow2: common.UInt8_5, // #59618
      GEliminateAfterLow2: common.UInt8_5, // #59631
      BEliminateAfterLow2: common.UInt8_5,
    }),
    t.partial({
      RLowAshImprovement: common.UInt8, // #59579
      GLowAshImprovement: common.UInt8, // #59592
      BLowAshImprovement: common.UInt8, // #59644
      IsAdvancedMode: common.Bool, // #59657
      RedRegValueConfigFirst: common.UInt16, // #59670
      GreenRegValueConfigFirst: common.UInt16, // #59683
      BlueRegValueConfigFirst: common.UInt16, // #59696
      VRedRegValueConfigFirst: common.UInt16,
    }),
  ],
  'ChipSM16207SExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16207SExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:59465
 */
export const ChipSM16207SExtendProperty = t.intersection(
  [
    ChipSM16207SExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16207SExtendProperty') }),
  ],
  'ChipSM16207SExtendProperty'
);
export interface ChipSM16207SExtendProperty extends t.TypeOf<typeof ChipSM16207SExtendProperty> {}
