import * as t from 'io-ts';


import * as common from '../lib/common';

import { AutoAdjustFreqType, AutoAdjustFreqTypeEnum } from './AutoAdjustFreqType'; // import
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
/**
 * Codec for interface {@link SingleRefreshRateParam}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:30317
 */

export const SingleRefreshRateParam = t.partial({
  AutoAdjustFreqType,                        // #30321
  RefreshRateParam: ChipBaseExtendPropey,    // #30323
  IsConfigCurrentField: common.Bool,         // #30325
}, 'SingleRefreshRateParam');

export interface SingleRefreshRateParam extends t.TypeOf<typeof SingleRefreshRateParam> { AutoAdjustFreqType?: AutoAdjustFreqTypeEnum, RefreshRateParam?: ChipBaseExtendPropey }

