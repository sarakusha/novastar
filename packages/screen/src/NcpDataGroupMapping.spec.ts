import type { NcpCabinetConfig } from './NcpConfig';
import { getNcpDataGroupMapping, reorderNcpDataGroupBlocks } from './NcpDataGroupMapping';

const cabinetWithMapping = (): NcpCabinetConfig => ({
  name: 'cabinet',
  baseInfo: {},
  binary: Buffer.alloc(0),
  parameters: [
    { address: 1, data: Buffer.from([1]), delay: 0, pollingTime: 0, pollingWaitTime: 0 },
    {
      address: 0x2800_0000,
      data: Buffer.from([0xff, 0, 4, 8, 1, 5, 9, 0xff, 2, 6, 10, 3, 7, 11, 0xff]),
      delay: 0,
      pollingTime: 0,
      pollingWaitTime: 0,
    },
  ],
});

describe('NCP DATA group mapping', () => {
  it('extracts consecutive physical blocks and logical assignments', () => {
    expect(getNcpDataGroupMapping(cabinetWithMapping())).toEqual({
      address: 0x2800_0000,
      capacity: 15,
      blocks: [
        { index: 0, physicalStart: 1, physicalEnd: 6, logicalGroups: [0, 4, 8, 1, 5, 9] },
        { index: 1, physicalStart: 8, physicalEnd: 13, logicalGroups: [2, 6, 10, 3, 7, 11] },
      ],
    });
  });

  it('reorders equal-size blocks without mutating the decoded cabinet', () => {
    const source = cabinetWithMapping();
    const reordered = reorderNcpDataGroupBlocks(source, [1, 0]);

    expect(source.parameters[1].data).toEqual(
      Buffer.from([0xff, 0, 4, 8, 1, 5, 9, 0xff, 2, 6, 10, 3, 7, 11, 0xff]),
    );
    expect(reordered.parameters[1].data).toEqual(
      Buffer.from([0xff, 2, 6, 10, 3, 7, 11, 0xff, 0, 4, 8, 1, 5, 9, 0xff]),
    );
    expect(reordered.parameters[0]).toBe(source.parameters[0]);
  });

  it('rejects incomplete and duplicate block orders', () => {
    const source = cabinetWithMapping();
    expect(() => reorderNcpDataGroupBlocks(source, [0])).toThrow(RangeError);
    expect(() => reorderNcpDataGroupBlocks(source, [0, 0])).toThrow(RangeError);
  });
});
