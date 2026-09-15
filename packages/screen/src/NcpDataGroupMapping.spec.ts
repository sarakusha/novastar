import type { NcpCabinetConfig } from './NcpConfig';
import { getNcpDataGroupMapping, reorderNcpDataGroupBlocks } from './NcpDataGroupMapping';

const pointTable = (rows: number, groups: number): Buffer => {
  const data = Buffer.alloc(rows * groups * 4);
  for (let row = 0; row < rows; row += 1) {
    for (let group = 0; group < groups; group += 1) {
      data.writeUInt32LE(row * 100 + group, (row * groups + group) * 4);
    }
  }
  return data;
};

const cabinetWithMapping = (): NcpCabinetConfig => {
  const scanBoardData = Buffer.alloc(252);
  scanBoardData[251] = 0x10;
  return {
    name: 'cabinet',
    baseInfo: {},
    binary: Buffer.alloc(0),
    parameters: [
      { address: 1, data: Buffer.from([1]), delay: 0, pollingTime: 0, pollingWaitTime: 0 },
      {
        address: 0x0200_0000,
        data: scanBoardData,
        delay: 0,
        pollingTime: 0,
        pollingWaitTime: 0,
      },
      {
        address: 0x0400_0000,
        data: pointTable(2, 13),
        delay: 0,
        pollingTime: 0,
        pollingWaitTime: 0,
      },
      {
        address: 0x2800_0000,
        data: Buffer.from([0xff, 0, 3, 6, 0xff, 1, 4, 7, 0xff, 2, 5, 8, 0xff]),
        delay: 0,
        pollingTime: 0,
        pollingWaitTime: 0,
      },
    ],
  };
};

describe('NCP DATA group mapping', () => {
  it('extracts consecutive physical blocks and logical assignments', () => {
    expect(getNcpDataGroupMapping(cabinetWithMapping())).toEqual({
      address: 0x2800_0000,
      capacity: 13,
      blocks: [
        { index: 0, physicalStart: 1, physicalEnd: 3, logicalGroups: [0, 3, 6] },
        { index: 1, physicalStart: 5, physicalEnd: 7, logicalGroups: [1, 4, 7] },
        { index: 2, physicalStart: 9, physicalEnd: 11, logicalGroups: [2, 5, 8] },
      ],
    });
  });

  it('reorders equal-size blocks without mutating the decoded cabinet', () => {
    const source = cabinetWithMapping();
    const reordered = reorderNcpDataGroupBlocks(source, [2, 0, 1]);

    expect(source.parameters[2].data).toEqual(pointTable(2, 13));
    const reorderedGroups = Array.from({ length: 26 }, (_, index) =>
      reordered.parameters[2].data.readUInt32LE(index * 4),
    );
    expect(reorderedGroups).toEqual([
      0, 9, 10, 11, 4, 1, 2, 3, 8, 5, 6, 7, 12, 100, 109, 110, 111, 104, 101, 102, 103, 108, 105,
      106, 107, 112,
    ]);
    expect(source.parameters[3].data).toEqual(
      Buffer.from([0xff, 0, 3, 6, 0xff, 1, 4, 7, 0xff, 2, 5, 8, 0xff]),
    );
    expect(reordered.parameters[3].data).toEqual(
      Buffer.from([0xff, 2, 5, 8, 0xff, 0, 3, 6, 0xff, 1, 4, 7, 0xff]),
    );
    expect(reordered.parameters[0]).toBe(source.parameters[0]);
  });

  it('rejects incomplete and duplicate block orders', () => {
    const source = cabinetWithMapping();
    expect(() => reorderNcpDataGroupBlocks(source, [0])).toThrow(RangeError);
    expect(() => reorderNcpDataGroupBlocks(source, [0, 0, 1])).toThrow(RangeError);
  });

  it('requires a compatible DATA group run-line table', () => {
    const source = cabinetWithMapping();
    source.parameters[2] = { ...source.parameters[2], data: Buffer.alloc(51) };
    expect(() => reorderNcpDataGroupBlocks(source, [0, 1, 2])).toThrow(TypeError);
  });
});
