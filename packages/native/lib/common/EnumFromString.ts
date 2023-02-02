import { chain } from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import * as t from 'io-ts';

const EnumFromString = <T extends Record<string, unknown>>(enumObj: T, enumName = 'enum') =>
  new t.Type<T[keyof T], keyof T>(
    enumName,
    (u): u is T[keyof T] => typeof u === 'number' && Object.values(enumObj).includes(u),
    (u, c) =>
      typeof u === 'number' && Object.values(enumObj).includes(u)
        ? t.success(u as unknown as T[keyof T])
        : pipe(
          t.keyof(enumObj).validate(u, c),
          chain(s => t.success(enumObj[s as keyof T])),
        ),
    a => enumObj[a as unknown as keyof T] as unknown as keyof T,
  );

export default EnumFromString;
