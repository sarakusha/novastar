import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link CIEValue}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:72004
 */
export const CIEValue = t.partial(
  {
    Cx: common.Numeric, // #72013
    Cy: common.Numeric, // #72030
    Y: common.Numeric, // #72047
  },
  'CIEValue'
);
export interface CIEValue extends t.TypeOf<typeof CIEValue> {}
