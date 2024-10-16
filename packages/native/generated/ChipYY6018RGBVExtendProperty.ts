import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipYY6018RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      FirstRegData: new common.BufferFromBase64('FirstRegData', 8 /* NumericLiteralExpression */), // #249
      SecondRegData: new common.BufferFromBase64('SecondRegData', 8 /* NumericLiteralExpression */), // #251
      ThirdRegData: new common.BufferFromBase64('ThirdRegData', 8 /* NumericLiteralExpression */), // #253
      FourthRegData: new common.BufferFromBase64('FourthRegData', 6 /* NumericLiteralExpression */), // #255
      SixthRegData: new common.BufferFromBase64('SixthRegData', 6 /* NumericLiteralExpression */), // #257
      SeventhRegData: new common.BufferFromBase64(
        'SeventhRegData',
        6 /* NumericLiteralExpression */
      ), // #259
      IsUseNewModule: common.Bool, // #267
      LowGrayCompsention: common.UInt8, // #269
      FirstLineDark: common.UInt8, // #282
      LineShadowEliminationStrength: common.UInt8, // #295
      ColumnShadowEliminationStrength: common.UInt8, // #308
      PreFilledMode: common.UInt8, // #321
      GrayMode: common.UInt8, // #334
      DCM_M: common.UInt8, // #350
      DCM_D: common.UInt8, // #363
      WeightValueConfig: common.Base64, // #375
      RedOpenDischargeEn: common.Bool, // #390
      GreenOpenDischargeEn: common.Bool, // #402
      BlueOpenDischargeEn: common.Bool, // #414
      WhiteOpenDischargeEn: common.Bool, // #426
      RedResistanceValue: common.UInt8, // #438
      GreenResistanceValue: common.UInt8, // #451
      BlueResistanceValue: common.UInt8, // #464
      AlgorithmSelect: common.UInt8, // #477
      PARI: common.UInt8, // #490
      PAR2: common.UInt8, // #503
      LEDStyle: common.UInt8, // #516
      SynMode: common.UInt8, // #529
      ICLKDIVNum: common.UInt8, // #542
      ISYNCNUM: common.UInt8, // #555
      FirstDataLen: common.Int32, // #567
      FirstStartIndex: common.Int32, // #569
      FirstRegisterAddr: common.Int32, // #571
      SecondDataLen: common.Int32, // #573
      SecondStartIndex: common.Int32, // #575
      SecondRegisterAddr: common.Int32, // #577
      ThirdDataLen: common.Int32, // #579
      ThirdDataStartIndex: common.Int32, // #581
      ThirdRegisterAddr: common.Int32, // #583
      FourthDataLen: common.Int32, // #585
      FourthStartIndex: common.Int32, // #587
      FourthRegisterAddr: common.Int32, // #589
      SixthDataLen: common.Int32, // #591
      SixthStartIndex: common.Int32, // #593
      SixthRegisterAddr: common.Int32, // #595
      SeventhDataLen: common.Int32, // #597
      SeventhStartIndex: common.Int32, // #599
      SeventhRegisterAddr: common.Int32, // #601
    }),
  ],
  'ChipYY6018RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipYY6018RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipYY6018.decompiled.cs:240
 */
export const ChipYY6018RGBVExtendProperty = t.intersection(
  [
    ChipYY6018RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipYY6018RGBVExtendProperty') }),
  ],
  'ChipYY6018RGBVExtendProperty'
);
export interface ChipYY6018RGBVExtendProperty
  extends t.TypeOf<typeof ChipYY6018RGBVExtendProperty> {}
