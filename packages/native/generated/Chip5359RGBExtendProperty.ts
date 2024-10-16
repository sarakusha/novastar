import * as t from 'io-ts';
import * as common from '../lib/common';
import { Chip5359ExtendProperty } from './Chip5359ExtendProperty'; // import
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const Chip5359RGBExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      Global1_Register1: common.withDefault(common.UInt16, 16448), // #47573
      Global1_Register2: common.withDefault(common.UInt16, 8252), // #47586
      Global1_Register3: common.withDefault(common.UInt16, 3132), // #47612
      Global2_Register2: common.UInt16_4096, // #47625
      Global2_Register3: common.withDefault(common.UInt16, 16319), // #47677
      R1_Register1: common.UInt16_16384, // #47716
      G1_Register1: common.UInt16_16384, // #47755
      B1_Register1: common.UInt16_16384, // #47794
      R2_Register1: common.UInt16_508, // #47820
      R2_Register3: common.UInt16_15872, // #47833
      G2_Register1: common.UInt16_508, // #47859
      G2_Register3: common.UInt16_15872, // #47872
      B2_Register1: common.UInt16_508, // #47898
      B2_Register3: common.UInt16_15872, // #47975
      IsAmplifyCurrent: common.Bool_true, // #48001
      M: common.withDefault(common.Int32, 127), // #48014
      N: common.Int32_15, // #48027
      Dvi: common.Int32_3, // #48053
      ExcessiveTime: common.Int32_60,
    }),
    t.partial({
      RextendProperty: Chip5359ExtendProperty, // #47524
      GextendProperty: Chip5359ExtendProperty, // #47526
      BextendProperty: Chip5359ExtendProperty, // #47528
      IsAdvancedMode: common.Bool, // #47599
      Global2_Register1: common.UInt16, // #47638
      Global3_Register1: common.UInt16, // #47651
      Global3_Register2: common.UInt16, // #47664
      Global3_Register3: common.UInt16, // #47690
      R1_Register2: common.UInt16, // #47703
      R1_Register3: common.UInt16, // #47729
      G1_Register2: common.UInt16, // #47742
      G1_Register3: common.UInt16, // #47768
      B1_Register2: common.UInt16, // #47781
      B1_Register3: common.UInt16, // #47807
      R2_Register2: common.UInt16, // #47846
      G2_Register2: common.UInt16, // #47885
      B2_Register2: common.UInt16, // #47911
      IstwoWayTransmission: common.Bool, // #47924
      IsGhostRemovalEnhance: common.Bool, // #47937
      IsSavePower: common.Bool, // #47950
      IsSavePowerPlus: common.Bool, // #47963
      FineGrade: common.Int32, // #47988
      GlobalGain: common.Int32, // #48040
      Gclk: common.Int32, // #48066
      EnDoubleRefresh: common.Bool, // #48079
      IsDoublePower: common.Bool, // #48092
      RowChangePoint5359: common.UInt16,
    }),
  ],
  'Chip5359RGBExtendPropertyBase'
);
/**
 * Codec for {@link Chip5359RGBExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:47466
 */
export const Chip5359RGBExtendProperty = t.intersection(
  [
    Chip5359RGBExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('Chip5359RGBExtendProperty') }),
  ],
  'Chip5359RGBExtendProperty'
);
export interface Chip5359RGBExtendProperty extends t.TypeOf<typeof Chip5359RGBExtendProperty> {
  RextendProperty?: Chip5359ExtendProperty;
  GextendProperty?: Chip5359ExtendProperty;
  BextendProperty?: Chip5359ExtendProperty;
}
