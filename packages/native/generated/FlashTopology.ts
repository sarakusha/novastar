import * as t from 'io-ts';
import * as common from '../lib/common';
import { FlashPublicTopology } from './FlashPublicTopology'; // import
import { FlashTopologyAndMeaasge } from './FlashTopologyAndMeaasge'; // import
/**
 * Codec for interface {@link FlashTopology}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:66713
 */
export const FlashTopology = t.intersection(
  [
    t.type({
      FlashTopologyAndMeaasges: common.XMLArray(FlashTopologyAndMeaasge, 'FlashTopologyAndMeaasge'),
    }),
    t.partial({
      FlashPubTopology: FlashPublicTopology, // #66732
      FlashWriteSpeed: common.Numeric,
    }),
  ],
  'FlashTopology'
);
export interface FlashTopology extends t.TypeOf<typeof FlashTopology> {
  FlashPubTopology?: FlashPublicTopology;
}
