import { parseTaurusDiscoveryResponse } from './discovery';
import { calculateTaurusHeaderChecksum, TAURUS_DISCOVERY, TAURUS_HEADER_SIZE } from './packet';

// cspell:ignore datagrams

const discoveryResponse = (body: object): Buffer => {
  const payload = Buffer.from(JSON.stringify(body));
  const packet = Buffer.alloc(TAURUS_HEADER_SIZE + payload.length);
  packet.writeUInt32LE(0x4e4f5641, 0);
  packet.writeUInt32LE(0xffffffff, 4);
  packet.writeUInt16LE(TAURUS_DISCOVERY, 8);
  packet.writeUInt16LE(1, 10);
  packet.writeUInt32LE(payload.length, 16);
  packet.writeUInt16LE(calculateTaurusHeaderChecksum(packet), 22);
  payload.copy(packet, TAURUS_HEADER_SIZE);
  return packet;
};

describe('Taurus discovery', () => {
  test('parses a player response', () => {
    const body = {
      aliasName: 'T60_00005306',
      encodeType: 0,
      height: 768,
      modelId: 38429,
      platform: 'rk356x',
      privacy: true,
      productName: 'T60',
      rotation: 0,
      sn: '26721A000005306',
      tcpPort: 16606,
      width: 756,
    };
    expect(parseTaurusDiscoveryResponse(discoveryResponse(body), '192.168.0.72')).toEqual({
      ...body,
      address: '192.168.0.72',
    });
  });

  test('ignores unrelated and malformed datagrams', () => {
    expect(parseTaurusDiscoveryResponse(Buffer.from('rpProMI:'), '192.168.0.72')).toBeUndefined();
    expect(
      parseTaurusDiscoveryResponse(discoveryResponse({ tcpPort: 16606 }), '192.168.0.72'),
    ).toBeUndefined();
  });
});
