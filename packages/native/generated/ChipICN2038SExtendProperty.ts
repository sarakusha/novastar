import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipICN2038SExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RWhiteBalance: common.Int32_16, // #44004
      GWhiteBalance: common.Int32_16, // #44024
      BWhiteBalance: common.Int32_16, // #44675
      HandUpdata: common.Bool_true,
    }),
    t.partial({
      IsAdvancedMode: common.Bool, // #43978
      IsDeadPix: common.Bool, // #44044
      RGainPoint: common.Int32, // #44064
      GGainPoint: common.Int32, // #44077
      BGainPoint: common.Int32, // #44090
      RConstantCurrent: common.Int32, // #44103
      GConstantCurrent: common.Int32, // #44116
      BConstantCurrent: common.Int32, // #44129
      ROESignalSelect: common.Int32, // #44142
      GOESignalSelect: common.Int32, // #44155
      BOESignalSelect: common.Int32, // #44168
      REnableSignalSelect: common.Bool, // #44181
      GEnableSignalSelect: common.Bool, // #44194
      BEnableSignalSelect: common.Bool, // #44207
      RDelayTime: common.Int32, // #44220
      GDelayTime: common.Int32, // #44233
      BDelayTime: common.Int32, // #44246
      RBlankingSignalSelect: common.Int32, // #44259
      GBlankingSignalSelect: common.Int32, // #44272
      BBlankingSignalSelect: common.Int32, // #44285
      RFallingTimeSelect: common.Int32, // #44298
      GFallingTimeSelect: common.Int32, // #44311
      BFallingTimeSelect: common.Int32, // #44324
      RLATCHSelect: common.Int32, // #44337
      GLATCHSelect: common.Int32, // #44350
      BLATCHSelect: common.Int32, // #44363
      RAMSelect: common.Int32, // #44376
      GAMSelect: common.Int32, // #44389
      BAMSelect: common.Int32, // #44402
      RAMSignalSelect: common.Bool, // #44415
      GAMSignalSelect: common.Bool, // #44428
      BAMSignalSelect: common.Bool, // #44441
      RCurrentRangSelect: common.Int32, // #44454
      GCurrentRangSelect: common.Int32, // #44467
      BCurrentRangSelect: common.Int32, // #44480
      RCLKtoSDOSelect: common.Int32, // #44493
      GCLKtoSDOSelect: common.Int32, // #44506
      BCLKtoSDOSelect: common.Int32, // #44519
      ROEWidthSelect: common.Int32, // #44532
      GOEWidthSelect: common.Int32, // #44545
      BOEWidthSelect: common.Int32, // #44558
      RedRegValueConfigFirst: common.UInt16, // #44571
      GreenRegValueConfigFirst: common.UInt16, // #44584
      BlueRegValueConfigFirst: common.UInt16, // #44597
      VRedRegValueConfigFirst: common.UInt16, // #44610
      RedRegValueConfigSecond: common.UInt16, // #44623
      GreenRegValueConfigSecond: common.UInt16, // #44636
      BlueRegValueConfigSecond: common.UInt16, // #44649
      VRedRegValueConfigSecond: common.UInt16, // #44662
      BlankingMode: common.Int32,
    }),
  ],
  'ChipICN2038SExtendPropertyBase'
);
/**
 * Codec for {@link ChipICN2038SExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:43868
 */
export const ChipICN2038SExtendProperty = t.intersection(
  [
    ChipICN2038SExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICN2038SExtendProperty') }),
  ],
  'ChipICN2038SExtendProperty'
);
export interface ChipICN2038SExtendProperty extends t.TypeOf<typeof ChipICN2038SExtendProperty> {}
