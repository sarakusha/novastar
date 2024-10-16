import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipNT27002SExtendProperty } from './ChipNT27002SExtendProperty';
 // import
export const ChipNT27002SRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_196,
    }),
    t.partial({
      RedProperty: ChipNT27002SExtendProperty, // #981
      GreenProperty: ChipNT27002SExtendProperty, // #983
      BlueProperty: ChipNT27002SExtendProperty, // #985
      VRedProperty: ChipNT27002SExtendProperty, // #987
      IsUseNewModule: common.Bool, // #989
      ChipLibVersion: common.UInt8, // #991
      ScanType: common.UInt8, // #993
      IsAdvancedMode: common.Bool, // #1008
      MyRedGain: common.Int32, // #1020
      RedRangeGain: common.UInt8, // #1035
      MyGreenGain: common.Int32, // #1050
      GreenRangeGain: common.UInt8, // #1065
      MyBlueGain: common.Int32, // #1080
      BlueRangeGain: common.UInt8, // #1095
      GraySteps: common.Int32, // #1110
      GetTrueGraySteps: common.Int32, // #1127
      NO_GCLK: common.Int32, // #1156
      F_gclk: common.Int32, // #1176
      FrameStartTime: common.Int32, // #1200
      ScanBetweenTime: common.Int32, // #1215
      ShadowEliminationTime: common.Int32, // #1239
      PrechargeTime: common.Int32, // #1254
      ScanShadowEliminationTime: common.Int32, // #1269
      ScanOpeningDelayTime: common.Int32, // #1285
      ScanCloseingDelayTime: common.Int32, // #1301
      ScanShadowEliminationVoltage: common.Int32, // #1317
      ShadowEliminationVoltageR: common.Int32, // #1333
      ShadowEliminationVoltageG: common.Int32, // #1349
      ShadowEliminationVoltageB: common.Int32, // #1365
      PulseWidthCompensationR: common.Int32, // #1381
      PulseWidthCompensationG: common.Int32, // #1397
      PulseWidthCompensationB: common.Int32, // #1413
      PrechargeVoltagR: common.Int32, // #1429
      PrechargeVoltagG: common.Int32, // #1445
      PrechargeVoltagB: common.Int32, // #1461
      ColorTemperature1R: common.Int32, // #1477
      ColorTemperature1G: common.Int32, // #1493
      ColorTemperature1B: common.Int32, // #1509
      ColorTemperature2R: common.Int32, // #1525
      ColorTemperature2G: common.Int32, // #1541
      ColorTemperature2B: common.Int32, // #1557
      ColorTemperature3R: common.Int32, // #1573
      ColorTemperature3G: common.Int32, // #1589
      ColorTemperature3B: common.Int32, // #1605
      AbnormalStatePattern: common.Int32, // #1621
      OpenVoltageR: common.Int32, // #1646
      OpenVoltageG: common.Int32, // #1662
      OpenVoltageB: common.Int32, // #1678
      DICOpenDateReplication: common.Bool, // #1694
      DICOpenDark: common.Bool, // #1710
      SavingMode: common.Bool, // #1726
      TemperatureSelevtorEn: common.Bool, // #1745
      TemperatureSelevtorLevel: common.Int32, // #1761
      ChannelCloseMode: common.Int32, // #1777
      FileNumber: common.Int32, // #1789
      FirstDataLen: common.Int32, // #1801
      FirstStartIndex: common.Int32, // #1803
      FirstRegisterAddr: common.Int32, // #1805
      SecondDataLen: common.Int32, // #1807
      SecondStartIndex: common.Int32, // #1809
      SecondRegisterAddr: common.Int32, // #1811
      SpecialDataLen: common.Int32, // #1813
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipNT27002SRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipNT27002SRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipNT27002S.decompiled.cs:974
 */
export const ChipNT27002SRGBVExtendProperty = t.intersection(
  [
    ChipNT27002SRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipNT27002SRGBVExtendProperty') }),
  ],
  'ChipNT27002SRGBVExtendProperty'
);
export interface ChipNT27002SRGBVExtendProperty
  extends t.TypeOf<typeof ChipNT27002SRGBVExtendProperty> {
  RedProperty?: ChipNT27002SExtendProperty;
  GreenProperty?: ChipNT27002SExtendProperty;
  BlueProperty?: ChipNT27002SExtendProperty;
  VRedProperty?: ChipNT27002SExtendProperty;
}
