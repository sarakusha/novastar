import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipFM6126ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RWhiteBalance: common.Int32_16, // #44899
      GWhiteBalance: common.Int32_16, // #44919
      BWhiteBalance: common.Int32_16, // #45453
      RedRegValueConfigFirst: common.UInt16_65474, // #45466
      GreenRegValueConfigFirst: common.UInt16_65474, // #45479
      BlueRegValueConfigFirst: common.UInt16_65474, // #45505
      RedRegValueConfigSecond: common.UInt16_30818, // #45518
      GreenRegValueConfigSecond: common.UInt16_28770, // #45531
      BlueRegValueConfigSecond: common.UInt16_26722, // #45570
      HandUpdata: common.Bool_true,
    }),
    t.partial({
      IsAdvancedMode: common.Bool, // #44939
      RGainPoint: common.Int32, // #44959
      GGainPoint: common.Int32, // #44972
      BGainPoint: common.Int32, // #44985
      RConstantCurrent: common.Int32, // #44998
      GConstantCurrent: common.Int32, // #45011
      BConstantCurrent: common.Int32, // #45024
      ROESignalSelect: common.Int32, // #45037
      GOESignalSelect: common.Int32, // #45050
      BOESignalSelect: common.Int32, // #45063
      REnableSignalSelect: common.Bool, // #45076
      GEnableSignalSelect: common.Bool, // #45089
      BEnableSignalSelect: common.Bool, // #45102
      RDelayTime: common.Int32, // #45115
      GDelayTime: common.Int32, // #45128
      BDelayTime: common.Int32, // #45141
      RBlankingSignalSelect: common.Int32, // #45154
      GBlankingSignalSelect: common.Int32, // #45167
      BBlankingSignalSelect: common.Int32, // #45180
      RFallingTimeSelect: common.Int32, // #45193
      GFallingTimeSelect: common.Int32, // #45206
      BFallingTimeSelect: common.Int32, // #45219
      RLATCHSelect: common.Int32, // #45232
      GLATCHSelect: common.Int32, // #45245
      BLATCHSelect: common.Int32, // #45258
      RAMSelect: common.Int32, // #45271
      GAMSelect: common.Int32, // #45284
      BAMSelect: common.Int32, // #45297
      RAMSignalSelect: common.Bool, // #45310
      GAMSignalSelect: common.Bool, // #45323
      BAMSignalSelect: common.Bool, // #45336
      RCurrentRangSelect: common.Int32, // #45349
      GCurrentRangSelect: common.Int32, // #45362
      BCurrentRangSelect: common.Int32, // #45375
      RCLKtoSDOSelect: common.Int32, // #45388
      GCLKtoSDOSelect: common.Int32, // #45401
      BCLKtoSDOSelect: common.Int32, // #45414
      ROEWidthSelect: common.Int32, // #45427
      GOEWidthSelect: common.Int32, // #45440
      BOEWidthSelect: common.Int32, // #45492
      VRedRegValueConfigFirst: common.UInt16, // #45544
      VRedRegValueConfigSecond: common.UInt16, // #45557
      BlankingMode: common.Int32,
    }),
  ],
  'ChipFM6126ExtendPropertyBase'
);
/**
 * Codec for {@link ChipFM6126ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:44778
 */
export const ChipFM6126ExtendProperty = t.intersection(
  [
    ChipFM6126ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipFM6126ExtendProperty') }),
  ],
  'ChipFM6126ExtendProperty'
);
export interface ChipFM6126ExtendProperty extends t.TypeOf<typeof ChipFM6126ExtendProperty> {}
