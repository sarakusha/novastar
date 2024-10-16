import * as t from 'io-ts';
import * as common from '../lib/common';
import { Chip9748ExtendProperty } from './Chip9748ExtendProperty'; // import
/**
 * Codec for interface {@link Chip9748RGBVExtendPropey}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:55178
 */
export const Chip9748RGBVExtendPropey = t.partial(
  {
    RedProperty: Chip9748ExtendProperty, // #55180
    GreenProperty: Chip9748ExtendProperty, // #55182
    BlueProperty: Chip9748ExtendProperty, // #55184
    VRedProperty: Chip9748ExtendProperty, // #55186
    GrayscaleSelect: common.UInt8, // #55208
    DummyGclkEn: common.Bool, // #55221
    RedGain: common.Int32, // #55234
    BlueGain: common.Int32, // #55246
    GreenGain: common.Int32, // #55258
    RedRegValueConfigThird: common.UInt16, // #55270
    GreenRegValueConfigThird: common.UInt16, // #55283
    BlueRegValueConfigThird: common.UInt16, // #55296
    VRedRegValueConfigThird: common.UInt16, // #55309
    RedRegValueConfigSpecial: common.UInt16, // #55322
    GreenRegValueConfigSpecial: common.UInt16, // #55335
    BlueRegValueConfigSpecial: common.UInt16, // #55348
    VRedRegValueConfigSpecial: common.UInt16, // #55361
  },
  'Chip9748RGBVExtendPropey'
);
export interface Chip9748RGBVExtendPropey extends t.TypeOf<typeof Chip9748RGBVExtendPropey> {
  RedProperty?: Chip9748ExtendProperty;
  GreenProperty?: Chip9748ExtendProperty;
  BlueProperty?: Chip9748ExtendProperty;
  VRedProperty?: Chip9748ExtendProperty;
}
