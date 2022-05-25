/* eslint-disable no-bitwise */
import { compress, decompress } from '@blu3r4y/lzma';
import { ComplexLEDDisplayInfo } from '@novastar/native/ComplexLEDDisplayInfo';
import { LEDDisplyTypeEnum } from '@novastar/native/LEDDisplyType';
import { ScanBoardConnectTypeEnum } from '@novastar/native/ScanBoardConnectType';
import { SimpleLEDDisplayInfo } from '@novastar/native/SimpleLEDDisplayInfo';
import { StandardLEDDisplayInfo } from '@novastar/native/StandardLEDDisplayInfo';
import groupBy from 'lodash/groupBy';

/**
 * 'Not Empty' type guard
 * @param value
 */
export function notEmpty<TValue>(value: TValue | null | undefined | void): value is TValue {
  return (
    value !== undefined && value !== null && (typeof value !== 'number' || !Number.isNaN(value))
  );
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type Id<T> = {} & { [P in keyof T]: T[P] };

export const crc16 = (data: Buffer, initial: number): number =>
  data.reduce((acc, value) => (acc + value) & 0xffff, initial);

export const crc8 = (data: Buffer, initial = 0): number =>
  data.reduce((acc, value) => (acc + value) & 0xff, initial);
/*
props[0] = (Byte)((p->pb * 5 + p->lp) * 9 + p->lc);

SRes LzmaProps_Decode(CLzmaProps *p, const Byte *data, unsigned size)
{
  UInt32 dicSize;
  Byte d;

  if (size < LZMA_PROPS_SIZE)
    return SZ_ERROR_UNSUPPORTED;
  else
    dicSize = data[1] | ((UInt32)data[2] << 8) | ((UInt32)data[3] << 16) | ((UInt32)data[4] << 24);

  if (dicSize < LZMA_DIC_MIN)
    dicSize = LZMA_DIC_MIN;
  p->dicSize = dicSize;

  d = data[0];
  if (d >= (9 * 5 * 5))
    return SZ_ERROR_UNSUPPORTED;

  p->lc = (Byte)(d % 9);
  d /= 9;
  p->pb = (Byte)(d / 5);
  p->lp = (Byte)(d % 5);

  return SZ_OK;
}
 */

export const unpack = (props: Buffer | string, length: number, buffer: Buffer): Promise<string> => {
  const propsBuf = Buffer.isBuffer(props) ? props : Buffer.from(props, 'binary');
  if (propsBuf.length !== 5) throw new TypeError('Invalid props length');
  const lengthBuf = Buffer.alloc(8);
  if (length === -1) lengthBuf.writeBigInt64LE(-1n);
  else lengthBuf.writeUInt32LE(length);
  const data = Buffer.concat([propsBuf, lengthBuf, buffer]);
  return new Promise<string>((resolve, reject) => {
    decompress(data, (res, err) => {
      if (res) resolve(Buffer.from(res).toString());
      else reject(err);
    });
  });
};

export const pack = async (data: Buffer | string): Promise<[string, Buffer]> => {
  const compressed = await new Promise<Buffer>((resolve, reject) => {
    compress(data, 8, (res, err) => {
      if (res) resolve(Buffer.from(res));
      else reject(err);
    });
  });
  return [compressed.slice(0, 5).toString('binary'), compressed.slice(5 + 8)];
};

export const isHorizontalConnection = (
  connectType: ScanBoardConnectTypeEnum
): connectType is
  | ScanBoardConnectTypeEnum.LeftTop_Horizontal
  | ScanBoardConnectTypeEnum.LeftBottom_Horizontal
  | ScanBoardConnectTypeEnum.RightTop_Horizontal
  | ScanBoardConnectTypeEnum.RightBottom_Horizontal =>
  connectType === ScanBoardConnectTypeEnum.LeftTop_Horizontal ||
  connectType === ScanBoardConnectTypeEnum.LeftBottom_Horizontal ||
  connectType === ScanBoardConnectTypeEnum.RightTop_Horizontal ||
  connectType === ScanBoardConnectTypeEnum.RightBottom_Horizontal;

export const isTopConnection = (
  connectType: ScanBoardConnectTypeEnum
): connectType is
  | ScanBoardConnectTypeEnum.LeftTop_Horizontal
  | ScanBoardConnectTypeEnum.RightTop_Horizontal
  | ScanBoardConnectTypeEnum.LeftTop_Vertical
  | ScanBoardConnectTypeEnum.RightTop_Vertical =>
  connectType === ScanBoardConnectTypeEnum.LeftTop_Horizontal ||
  connectType === ScanBoardConnectTypeEnum.RightTop_Horizontal ||
  connectType === ScanBoardConnectTypeEnum.LeftTop_Vertical ||
  connectType === ScanBoardConnectTypeEnum.RightTop_Vertical;

export const isLeftConnection = (
  connectType: ScanBoardConnectTypeEnum
): connectType is
  | ScanBoardConnectTypeEnum.LeftTop_Horizontal
  | ScanBoardConnectTypeEnum.LeftTop_Vertical
  | ScanBoardConnectTypeEnum.LeftBottom_Horizontal
  | ScanBoardConnectTypeEnum.LeftBottom_Vertical =>
  connectType === ScanBoardConnectTypeEnum.LeftTop_Horizontal ||
  connectType === ScanBoardConnectTypeEnum.LeftTop_Vertical ||
  connectType === ScanBoardConnectTypeEnum.LeftBottom_Horizontal ||
  connectType === ScanBoardConnectTypeEnum.LeftBottom_Vertical;

export const minimax = (min: number, max: number, value: number): number =>
  Math.min(Math.max(value, min), max);

export type LEDDisplayInfo = SimpleLEDDisplayInfo | StandardLEDDisplayInfo | ComplexLEDDisplayInfo;

export const isSimpleScreen = (screen: LEDDisplayInfo): screen is SimpleLEDDisplayInfo =>
  screen.Type === LEDDisplyTypeEnum.SimpleSingleType;

export const isStandardScreen = (screen: LEDDisplayInfo): screen is StandardLEDDisplayInfo =>
  screen.Type === LEDDisplyTypeEnum.StandardType;

export const isComplexScreen = (screen: LEDDisplayInfo): screen is ComplexLEDDisplayInfo =>
  screen.Type === LEDDisplyTypeEnum.ComplexType;

type ExcludeUndefined<T> = {
  [P in keyof T]-?: Exclude<T[P], undefined>;
};

type MakeRequired<T, K extends keyof T> = Id<T & ExcludeUndefined<Pick<T, K>>>;

export const hasProps =
  <K extends string>(...props: K[]) =>
  <T extends Partial<Record<K, unknown>>>(y: T): y is MakeRequired<T, K> =>
    notEmpty(y) && props.reduce((acc: boolean, name: keyof T) => acc && notEmpty(y[name]), true);

const zipProps =
  <K extends string>(props: K[]) =>
  <T extends Record<K, number>>(item: T): string =>
    props.map(name => item[name]).join(':');

const unzipProps = <K extends string>(props: K[], key: string): Record<K, number> =>
  key
    .split(':')
    .map(Number)
    .reduce<Record<K, number>>(
      (acc, value, i) => ({
        ...acc,
        [props[i]]: value,
      }),
      {} as Record<K, number>
    );

export const groupByProps =
  <K extends string>(...props: K[]) =>
  <T extends Record<K, number>>(list: T[]): [Record<K, number>, [T, ...T[]]][] =>
    Object.entries(groupBy(list, zipProps(props))).map<[Record<K, number>, [T, ...T[]]]>(
      ([key, items]) => [unzipProps(props, key), items as unknown as [T, ...T[]]]
    );

export const itFirstNotNull = async <T>(it: AsyncIterable<T | null>): Promise<T | null> => {
  for await (const res of it) {
    if (res !== null) return res;
  }
  return null;
};

export const itAll = async <T>(it: AsyncIterable<T | null>): Promise<(T | null)[]> => {
  const all: (T | null)[] = [];
  for await (const res of it) {
    all.push(res);
  }
  return all;
};

export const toHex = (value: number): string => {
  const hex = value.toString(16);
  const pos = hex.length - 4;
  return pos > 0 ? `0x${hex.slice(0, pos)}_${hex.slice(pos)}` : `${value > 9 ? '0x' : ''}${hex}`;
};

type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};

export type AllowedNames<Base, Condition> = FilterFlags<Base, Condition>[keyof Base];
