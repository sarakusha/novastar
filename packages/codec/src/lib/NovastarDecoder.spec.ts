import NovastarDecoder from './NovastarDecoder';
import { COMPUTER, Packet, RESPONSE } from './Packet';

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
    Packet.crc(res, true);
    const decoder = new NovastarDecoder();
    decoder.once('data', chunk => {
      expect(chunk).toEqual(res);
      done();
    });
    decoder.write(raw);
  });
  it('decode hex', () => {
    const raw = Buffer.from('55AA007AFEFF00000000010000000001010000CF57', 'hex');
    const packet = new Packet(raw);
    expect(packet.crc).toBe(Packet.crc(packet));
    // console.log({ packet: packet.toJSON() });
  });
  // it('crypto', () => {
  //   const key = [106, 51, 25, 141, 157, 142, 23, 111, 234, 159, 187, 154, 215, 34, 37, 205];
  //   console.log(Buffer.from(key).toString());
  // });
});
