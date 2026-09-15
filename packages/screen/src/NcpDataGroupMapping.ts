import type { NcpCabinetConfig } from './NcpConfig';

const dataGroupMappingAddress = 0x2800_0000;
const unusedDataGroup = 0xff;

export interface NcpDataGroupBlock {
  /** Zero-based block number in physical DATA order. */
  index: number;
  /** Zero-based first physical DATA group occupied by this block. */
  physicalStart: number;
  /** Zero-based last physical DATA group occupied by this block. */
  physicalEnd: number;
  /** Logical groups routed to the consecutive physical DATA groups. */
  logicalGroups: number[];
}

export interface NcpDataGroupMapping {
  address: number;
  capacity: number;
  blocks: NcpDataGroupBlock[];
}

/**
 * Decode the irregular-cabinet physical-to-logical DATA group routing table from an NCP cabinet.
 * Empty physical positions are encoded as 0xff. Consecutive assigned positions form one block.
 */
export const getNcpDataGroupMapping = (
  cabinet: Pick<NcpCabinetConfig, 'parameters'>,
): NcpDataGroupMapping | undefined => {
  const parameter = cabinet.parameters.find(({ address }) => address === dataGroupMappingAddress);
  if (!parameter) return undefined;

  const blocks: NcpDataGroupBlock[] = [];
  for (let physicalGroup = 0; physicalGroup < parameter.data.length; ) {
    if (parameter.data[physicalGroup] === unusedDataGroup) {
      physicalGroup += 1;
      continue;
    }
    const physicalStart = physicalGroup;
    const logicalGroups: number[] = [];
    while (
      physicalGroup < parameter.data.length &&
      parameter.data[physicalGroup] !== unusedDataGroup
    ) {
      logicalGroups.push(parameter.data[physicalGroup]);
      physicalGroup += 1;
    }
    blocks.push({
      index: blocks.length,
      physicalStart,
      physicalEnd: physicalGroup - 1,
      logicalGroups,
    });
  }

  return {
    address: parameter.address,
    capacity: parameter.data.length,
    blocks,
  };
};

const validateOrder = (order: readonly number[], blockCount: number): void => {
  if (
    order.length !== blockCount ||
    order.some((index) => !Number.isInteger(index) || index < 0 || index >= blockCount) ||
    new Set(order).size !== blockCount
  ) {
    throw new RangeError('DATA group order must be a complete permutation of the source blocks');
  }
};

/**
 * Return an NCP cabinet copy whose DATA group blocks have been reordered. The original decoded
 * cabinet and its RCCB binary are left unchanged; the returned parameter list is ready to send.
 */
export const reorderNcpDataGroupBlocks = (
  cabinet: NcpCabinetConfig,
  order: readonly number[],
): NcpCabinetConfig => {
  const mapping = getNcpDataGroupMapping(cabinet);
  if (!mapping) throw new TypeError('NCP cabinet does not contain a DATA group mapping table');
  validateOrder(order, mapping.blocks.length);

  const blockLength = mapping.blocks[0]?.logicalGroups.length ?? 0;
  if (!blockLength || mapping.blocks.some((block) => block.logicalGroups.length !== blockLength)) {
    throw new TypeError('NCP DATA group blocks have different sizes and cannot be reordered');
  }

  const parameters = cabinet.parameters.map((parameter) => {
    if (parameter.address !== mapping.address) return parameter;
    const data = Buffer.from(parameter.data);
    mapping.blocks.forEach((target, targetIndex) => {
      const source = mapping.blocks[order[targetIndex]];
      data.set(source.logicalGroups, target.physicalStart);
    });
    return { ...parameter, data };
  });

  return { ...cabinet, parameters };
};
