/* eslint-disable @typescript-eslint/no-explicit-any */

// import { Buffer } from 'buffer';

import { Chain, isLeft } from 'fp-ts/Either';
import * as t from 'io-ts';
import {
  BigIntFromString,
  BooleanFromString,
  fromNullable,
  fromRefinement,
  NumberFromString,
} from 'io-ts-types';
import { PathReporter } from 'io-ts/PathReporter';

const stringConverter =
  <C extends t.Mixed, V extends t.Type<any, string>>(converter: V) =>
  (codec: C): t.Type<t.TypeOf<V>> =>
    new t.Type(
      codec.name,
      codec.is,
      (u, c) =>
        typeof u === 'string'
          ? Chain.chain(converter.validate(u, c), n => codec.validate(n, c))
          : codec.validate(u, c),
      codec.encode
    );

const numberFromStringConverter = stringConverter(NumberFromString);

const booleanFromStringConverter = stringConverter(BooleanFromString);

export const Numeric = numberFromStringConverter(t.number);

export const Bool = booleanFromStringConverter(t.boolean);

export const UInt8 = numberFromStringConverter(
  fromRefinement(
    'UInt8',
    (n): n is number => t.number.is(n) && Number.isInteger(n) && n >= 0 && n < 256
  )
);
export const Int8 = numberFromStringConverter(
  fromRefinement(
    'Int8',
    (n): n is number => t.number.is(n) && Number.isInteger(n) && n >= -128 && n < 128
  )
);
export const UInt16 = numberFromStringConverter(
  fromRefinement(
    'UInt16',
    (n): n is number => t.number.is(n) && Number.isInteger(n) && n >= 0 && n < 0x10000
  )
);
export const Int16 = numberFromStringConverter(
  fromRefinement(
    'Int16',
    (n): n is number => t.number.is(n) && Number.isInteger(n) && n >= -32768 && n < 32768
  )
);
export const UInt32 = numberFromStringConverter(
  fromRefinement(
    'UInt32',
    (n): n is number => t.number.is(n) && Number.isInteger(n) && n >= 0 && n <= 4294967295
  )
);
export const Int32 = numberFromStringConverter(
  fromRefinement(
    'Int32',
    (n): n is number => t.number.is(n) && Number.isInteger(n) && n >= -2147483648 && n < 2147483648
  )
);

export const UInt64 = stringConverter(BigIntFromString)(t.bigint);

/*
export interface UInt8Brand {
  readonly UInt8: symbol;
}

export const UInt8 = t.brand(
  t.number,
  (n): n is t.Branded<number, UInt8Brand> => Number.isInteger(n) && n >= 0 && n < 256,
  'UInt8'
);

export type UInt8 = number & UInt8Brand;

export interface Int8Brand {
  readonly Int8: symbol;
}

export const Int8 = t.brand(
  t.number,
  (n): n is t.Branded<number, Int8Brand> => Number.isInteger(n) && n >= -128 && n < 128,
  'Int8'
);

export type Int8 = number & Int8Brand;

export interface UInt16Brand {
  readonly UInt16: symbol;
}

export const UInt16 = t.brand(
  t.number,
  (n): n is t.Branded<number, UInt16Brand> => Number.isInteger(n) && n >= 0 && n < 0x10000,
  'UInt16'
);

export type UInt16 = t.TypeOf<typeof UInt16>;

export interface Int16Brand {
  readonly Int16: symbol;
}

export const Int16 = t.brand(
  t.number,
  (n): n is t.Branded<number, Int16Brand> => Number.isInteger(n) && n >= -32768 && n < 32768,
  'Int16'
);

export type Int16 = number & Int16Brand;

export interface UInt32Brand {
  readonly UInt32: symbol;
}

export const UInt32 = t.brand(
  t.number,
  (n): n is t.Branded<number, UInt32Brand> => Number.isInteger(n) && n >= 0 && n <= 4294967295,
  'UInt32'
);

export type UInt32 = number & UInt32Brand;

export interface Int32Brand {
  readonly Int32: symbol;
}

export const Int32 = t.brand(
  t.number,
  (n): n is t.Branded<number, Int32Brand> =>
    Number.isInteger(n) && n >= -2147483648 && n < 2147483648,
  'Int32'
);

export type Int32 = number & Int32Brand;

*/

export function withDefault<C extends t.Mixed>(
  codec: C,
  defaultValue: t.TypeOf<C> | t.OutputOf<C>
): C {
  let value = defaultValue;
  if (!codec.is(value)) {
    const validation = codec.decode(value);
    if (isLeft(validation)) throw new TypeError(PathReporter.report(validation).join('\n'));
    value = validation.right;
  }
  return fromNullable(codec, value);
}

export class BufferFromBase64 extends t.Type<Uint8Array, string> {
  constructor(name: string, length?: number, strict = false) {
    super(
      name,
      (u): u is Uint8Array => u instanceof Uint8Array && (!length || u.length === length),
      (i, c) => {
        if (
          typeof i === 'string' &&
          /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(i)
        ) {
          const buffer = Uint8Array.from(atob(i), c => c.charCodeAt(0)) // Buffer.from(i, 'base64');
          if (
            !length ||
            (buffer.length === length && strict) ||
            (buffer.length >= length && !strict)
          ) {
            return t.success(buffer);
          }
          t.failure(buffer, c, `Invalid length: expected ${length} but got ${buffer.length}`);
        }
        return t.failure(i, c, 'Invalid base64');
      },
      b => btoa(String.fromCharCode.apply(null, [...b])),
    );
  }
}

export const Base64 = new BufferFromBase64('Base64');
export type Base64 = t.TypeOf<typeof Base64>;
