import { Request } from '@novastar/codec';
import SoftwareSpaceBaseAddress from '@novastar/native/build/main/generated/SoftwareSpaceBaseAddress';

import { SessionAPI } from './Session';

const MAX_USHORT = 0xffff;

export default class Screen {
  constructor(readonly session: SessionAPI) {}

  private _top = 0;

  get top() {
    const { _top } = this;
    return _top;
  }

  private _left = 0;

  get left() {
    const { _left } = this;
    return _left;
  }

  static crc = (data: Buffer): number =>
    data.reduce((acc, value) => (acc + value) % 0xffff, 0x55aa);

  async setPos(left: number, top: number): Promise<void> {
    if (left < 0 || left > MAX_USHORT || top < 0 || top > MAX_USHORT)
      throw new TypeError('Invalid position');
    const req = new Request(1);
    const x = await this.session.connection.send(req);
  }

  /**
   * ScreenInfoAccessor::ReadNextSenderSoftSpace()
   */
  async readHeader(): Promise<string> {
    const data = await this.session.ReadSender_SoftwareSpace(
      0,
      4,
      SoftwareSpaceBaseAddress.BASE_ADDRESS
    );
    return data.toString('ascii');
  }

  /**
   * ScreenInfoAccessor::ReadSenderScreenConfigInfo()
   */
  async readConfig(): Promise<void> {
    const data = await this.session.ReadSender_ScreenConfigSpace(0);
    const x = data.readUInt16LE(2);
    const y = data.readUInt16LE(4);
    const scanbdCols = data[11];
    const scanbdRows = data[10];
    const pixelColsInScanbd = data.readUInt16LE(6);
    const pixelRowsInScanbd = data.readUInt16LE(8);
    const num1 = data.readUInt16LE(13);
  }
}
