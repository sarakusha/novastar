import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link ChipMBI5850ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5850.decompiled.cs:664
 */
export const ChipMBI5850ExtendProperty = t.intersection(
  [
    t.type({
      REG_NUMBER: common.withDefault(common.Int32, 24), // #667
      MBI5850REG: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      GrayScale: common.UInt16, // #676
      EnDoubleRefresh: common.Bool, // #689
      BlankUnitNumPerScan: common.UInt16, // #702
      ExcessiveTime: common.UInt16, // #714
      RowChangePoint: common.UInt16, // #726
      M: common.UInt16, // #738
      N: common.UInt16, // #760
      DVI: common.UInt16, // #782
      ShowsTheGhostGear_R: common.UInt16, // #806
      ShowsTheGhostGear_G: common.UInt16, // #818
      ShowsTheGhostGear_B: common.UInt16, // #830
      ShowsTheGeargradualGhost_R: common.UInt16, // #842
      ShowsTheGeargradualGhost_G: common.UInt16, // #854
      ShowsTheGeargradualGhost_B: common.UInt16, // #866
      HiddenGhostGear_1_R: common.UInt16, // #878
      HiddenGhostGear_1_G: common.UInt16, // #890
      HiddenGhostGear_1_B: common.UInt16, // #902
      HiddenGhostGear_2_R: common.UInt16, // #914
      HiddenGhostGear_2_G: common.UInt16, // #926
      HiddenGhostGear_2_B: common.UInt16, // #938
      HiddenGhostGear_3_R: common.UInt16, // #950
      HiddenGhostGear_3_G: common.UInt16, // #962
      HiddenGhostGear_3_B: common.UInt16, // #974
      LowAshCompensation_R: common.UInt16, // #986
      LowAshCompensation_G: common.UInt16, // #998
      LowAshCompensation_B: common.UInt16, // #1010
      FailureLEDElimination: common.Bool, // #1022
      DislodgeBadPointsGrade_R: common.UInt8, // #1034
      DislodgeBadPointsGrade_G: common.UInt8, // #1046
      DislodgeBadPointsGrade_B: common.UInt8, // #1058
      Gain_R: common.UInt16, // #1070
      Gain_G: common.UInt16, // #1082
      Gain_B: common.UInt16,
    }),
  ],
  'ChipMBI5850ExtendProperty'
);
export interface ChipMBI5850ExtendProperty extends t.TypeOf<typeof ChipMBI5850ExtendProperty> {}
