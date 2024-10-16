import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipSM16389SFExtendProperty } from './ChipSM16389SFExtendProperty'; // import
import { PointDetectParameter } from './PointDetectParameter';
 // import
export const ChipSM16389SFRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_34,
    }),
    t.partial({
      RedProperty: ChipSM16389SFExtendProperty, // #393
      GreenProperty: ChipSM16389SFExtendProperty, // #395
      BlueProperty: ChipSM16389SFExtendProperty, // #397
      VRedProperty: ChipSM16389SFExtendProperty, // #399
      IsUseNewModule: common.Bool, // #405
      ChipLibVersion: common.UInt8, // #407
      IsAdvancedMode: common.Bool, // #425
      TestGain: common.UInt8, // #437
      IsErrOpen: common.Bool, // #449
      SpecialDataLen: common.Int32, // #461
      SpecialRegisterAddr: common.UInt32, // #463
      LittlePeriodCount: common.UInt8, // #465
      RefreshMagnificationP1: common.UInt8, // #483
      RefreshMagnificationP2: common.UInt8, // #505
      RefreshMagnificationP3: common.UInt8, // #527
      LineScanGrayScale: common.Int32, // #558
      IsGammaDllMode: common.Bool, // #579
      ErrRedGain: common.Int32, // #673
      ErrGreenGain: common.Int32, // #685
      ErrBlueGain: common.Int32, // #697
      ErrVRedGain: common.Int32, // #709
      PointDetectParameter,
    }),
  ],
  'ChipSM16389SFRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16389SFRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipSM16389SF.decompiled.cs:388
 */
export const ChipSM16389SFRGBVExtendProperty = t.intersection(
  [
    ChipSM16389SFRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16389SFRGBVExtendProperty') }),
  ],
  'ChipSM16389SFRGBVExtendProperty'
);
export interface ChipSM16389SFRGBVExtendProperty
  extends t.TypeOf<typeof ChipSM16389SFRGBVExtendProperty> {
  RedProperty?: ChipSM16389SFExtendProperty;
  GreenProperty?: ChipSM16389SFExtendProperty;
  BlueProperty?: ChipSM16389SFExtendProperty;
  VRedProperty?: ChipSM16389SFExtendProperty;
  PointDetectParameter?: PointDetectParameter;
}
