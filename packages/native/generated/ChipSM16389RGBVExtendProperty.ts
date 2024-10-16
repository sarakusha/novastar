import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipSM16389ExtendProperty } from './ChipSM16389ExtendProperty';
 // import
export const ChipSM16389RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_34,
    }),
    t.partial({
      RedProperty: ChipSM16389ExtendProperty, // #1289
      GreenProperty: ChipSM16389ExtendProperty, // #1291
      BlueProperty: ChipSM16389ExtendProperty, // #1293
      VRedProperty: ChipSM16389ExtendProperty, // #1295
      IsUseNewModule: common.Bool, // #1301
      ChipLibVersion: common.UInt8, // #1303
      IsAdvancedMode: common.Bool, // #1321
      IsGammaDllMode: common.Bool, // #1333
      TestGain: common.UInt8, // #1346
      IsErrOpen: common.Bool, // #1358
      SpecialDataLen: common.Int32, // #1370
      SpecialRegisterAddr: common.UInt32, // #1372
      LittlePeriodCount: common.UInt8, // #1374
      RefreshMagnificationP1: common.UInt8, // #1392
      RefreshMagnificationP2: common.UInt8, // #1414
      RefreshMagnificationP3: common.UInt8, // #1436
      LineScanGrayScale: common.Int32,
    }),
  ],
  'ChipSM16389RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16389RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipSM16389.decompiled.cs:1284
 */
export const ChipSM16389RGBVExtendProperty = t.intersection(
  [
    ChipSM16389RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16389RGBVExtendProperty') }),
  ],
  'ChipSM16389RGBVExtendProperty'
);
export interface ChipSM16389RGBVExtendProperty
  extends t.TypeOf<typeof ChipSM16389RGBVExtendProperty> {
  RedProperty?: ChipSM16389ExtendProperty;
  GreenProperty?: ChipSM16389ExtendProperty;
  BlueProperty?: ChipSM16389ExtendProperty;
  VRedProperty?: ChipSM16389ExtendProperty;
}
