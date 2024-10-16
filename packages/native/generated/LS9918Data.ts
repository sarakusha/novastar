import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link LS9918Data}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:66943
 */
export const LS9918Data = t.intersection(
  [
    t.type({
      BitsNum: common.Int32_2, // #67106
      SubFrameNum: common.Int32_3, // #67142
      FriedFreuquance: common.Int32_60, // #67166
      ShiftClockList: common.XMLArray(common.Numeric, 'double'), // #67202
      StarRefreshRateList: common.XMLArray(common.Int32, 'int'), // #67226
      MaxRefreshRateList: common.XMLArray(common.Int32, 'int'), // #67250
      HighNumberList: common.XMLArray(common.Int32, 'int'), // #67502
      ModeList: common.XMLArray(t.string, 'string'),
    }),
    t.partial({
      PmData: common.Base64, // #67046
      DmFirstData: common.Base64, // #67058
      DmSecondData: common.Base64, // #67070
      DmThridData: common.Base64, // #67082
      LS9918OEData: common.Base64, // #67118
      Factor: common.Int32, // #67130
      FrequenceDivsion: common.Int32, // #67154
      SystemClock: common.Int32, // #67178
      ShiftClock: common.Numeric, // #67190
      StarRefreshRate: common.Int32, // #67214
      MaxRefreshRate: common.Int32, // #67238
      HighNumber: common.Int32, // #67262
      BrightnessEfficiency: common.Int32, // #67274
      ShiftLenth: common.Int32, // #67286
      ScanType: common.Int32, // #67298
      GammaStartValue: common.Int32, // #67310
      GammaMaxValue: common.Int32, // #67322
      GammaShift: common.Int32, // #67334
      GameTable: common.Base64, // #67346
      ContrastValue: common.Int32, // #67358
      MaxBrightness: common.Int32, // #67370
      RedJump: common.Int32, // #67382
      GreenJump: common.Int32, // #67394
      BlueJump: common.Int32, // #67406
      CompensateValue: common.Numeric, // #67418
      MinWidth: common.Int32, // #67430
      ClockPhase: common.Int32, // #67442
      ShadowZone: common.Int32, // #67454
      RowShadow: common.Int32, // #67466
      LineCharge: common.Int32, // #67478
      ShadowThree: common.Int32, // #67490
      ModeValue: common.Int32, // #67514
      IsLineShadowOK: common.Bool, // #67526
      IsRowSwitch: common.Bool, // #67538
      SelectRowSwitch: common.Int32, // #67550
      Select32Port: common.Int32, // #67562
      FirstLine: common.Int32, // #67574
      RDataPhase: common.Int32, // #67586
      GDataPhase: common.Int32, // #67598
      BDataPhase: common.Int32,
    }),
  ],
  'LS9918Data'
);
export interface LS9918Data extends t.TypeOf<typeof LS9918Data> {}
