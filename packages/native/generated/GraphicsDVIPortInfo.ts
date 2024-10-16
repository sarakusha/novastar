import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link GraphicsDVIPortInfo}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:68023
 */
export const GraphicsDVIPortInfo = t.intersection(
  [
    t.type({
      DviPortCols: common.UInt8_1, // #68026
      DviPortRows: common.UInt8_1, // #68028
      GraphicsWidth: common.withDefault(common.UInt16, 1440), // #68034
      GraphicsHeight: common.withDefault(common.UInt16, 900),
    }),
    t.partial({}),
  ],
  'GraphicsDVIPortInfo'
);
export interface GraphicsDVIPortInfo extends t.TypeOf<typeof GraphicsDVIPortInfo> {}
