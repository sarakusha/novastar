import NovastarDecoder from './NovastarDecoder';
import { COMPUTER, getCrc, Packet, RESPONSE } from './Packet';

describe('NovastarDecoder', () => {
  it('decode', done => {
    const data = 'Hello, world!';
    const length = Packet.baseSize + data.length;
    const res = new Packet(Buffer.alloc(length));
    res.head = RESPONSE;
    res.destination = COMPUTER;
    res.address = 0x12345678;
    res.length = data.length;
    res.data.write(data);
    const raw = Packet.raw(res);
    if (raw) res.crc = getCrc(raw);
    const decoder = new NovastarDecoder();
    decoder.once('data', chunk => {
      expect(chunk).toEqual(res);
      done();
    });
    decoder.write(raw);
  });
});
