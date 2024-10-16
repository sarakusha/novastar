import * as t from 'io-ts';
import * as common from '../lib/common';
import { Chip5253BExtendProperty } from './Chip5253BExtendProperty'; // import
/**
 * Codec for interface {@link Chip5253BRGBExtendPropety}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:46683
 */
export const Chip5253BRGBExtendPropety = t.intersection(
  [
    t.type({
      EnableLowImprovement: common.Bool_true, // #46751
      EnShadeTransitOptimize: common.Bool_true, // #46776
      EnGCLKMutiRate: common.Bool_true, // #46802
      RedRegValueConfigThird: common.withDefault(common.UInt16, 49251), // #46815
      GreenRegValueConfigThird: common.withDefault(common.UInt16, 28771), // #46828
      BlueRegValueConfigThird: common.withDefault(common.UInt16, 24675), // #46854
      RedRegValueConfigFour: common.UInt16_61440, // #46867
      GreenRegValueConfigFour: common.UInt16_61440, // #46880
      BlueRegValueConfigFour: common.UInt16_61440, // #46893
      VRedRegValueConfigFour: common.UInt16_61440, // #46906
      RedRegValueConfigFive: common.UInt16_8673, // #46919
      GreenRegValueConfigFive: common.UInt16_8673, // #46932
      BlueRegValueConfigFive: common.UInt16_8673, // #46945
      VRedRegValueConfigFive: common.UInt16_8673, // #46958
      RedRegValueConfigSix: common.UInt16_3822, // #46971
      GreenRegValueConfigSix: common.UInt16_3822, // #46984
      BlueRegValueConfigSix: common.UInt16_3822, // #46997
      VRedRegValueConfigSix: common.UInt16_3822,
    }),
    t.partial({
      RedProperty: Chip5253BExtendProperty, // #46685
      GreenProperty: Chip5253BExtendProperty, // #46687
      BlueProperty: Chip5253BExtendProperty, // #46689
      VRedProperty: Chip5253BExtendProperty, // #46764
      EnDoubleRefresh: common.Bool, // #46789
      FailureLEDElimination: common.Bool, // #46841
      VRedRegValueConfigThird: common.UInt16, // #47010
      RedRegValueConfigSeven: common.UInt16, // #47023
      GreenRegValueConfigSeven: common.UInt16, // #47036
      BlueRegValueConfigSeven: common.UInt16, // #47049
      VRedRegValueConfigSeven: common.UInt16, // #47062
      RedRegValueConfigSpecial: common.UInt16, // #47075
      GreenRegValueConfigSpecial: common.UInt16, // #47088
      BlueRegValueConfigSpecial: common.UInt16, // #47101
      VRedRegValueConfigSpecial: common.UInt16,
    }),
  ],
  'Chip5253BRGBExtendPropety'
);
export interface Chip5253BRGBExtendPropety extends t.TypeOf<typeof Chip5253BRGBExtendPropety> {
  RedProperty?: Chip5253BExtendProperty;
  GreenProperty?: Chip5253BExtendProperty;
  BlueProperty?: Chip5253BExtendProperty;
  VRedProperty?: Chip5253BExtendProperty;
}
