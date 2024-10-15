import { chain, isLeft } from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import * as t from 'io-ts';
import { PathReporter } from 'io-ts/PathReporter';

export * from './integers';
export * from './types';

const Point = t.type({
  x: t.number,
  y: t.number,
});

export type Point = t.TypeOf<typeof Point>;

export const PointFromString = new t.Type<Point, `${bigint}, ${bigint}`>(
  'Point',
  (u): u is Point => Point.is(u),
  (u, c) => {
    if (typeof u === 'string') {
      const values = u.split(',');
      if (values.length === 2) {
        const [x, y] = values.map(Number);
        if (Number.isInteger(x) && Number.isInteger(y))
          return t.success({
            x,
            y,
          });
      }
    } else if (Point.is(u)) return t.success(u);
    return t.failure(u, c, `Invalid Point: ${typeof u}, ${JSON.stringify(u)}`);
  },
  a => `${BigInt(a.x)}, ${BigInt(a.y)}`
);

const toArray = <T>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value]);

const capitalizeFirstLetter = <T extends string>(str: T): Capitalize<T> =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}` as Capitalize<T>;

export const XMLArray = <C extends t.Mixed>(item: C, itemTypeName: string): t.ArrayC<C> =>
  new t.ArrayType(
    `${capitalizeFirstLetter(itemTypeName)}Array`,
    (u): u is Array<t.TypeOf<C>> => t.UnknownArray.is(u) && u.every(item.is),
    (u, c) =>
      !u
        ? t.success([])
        : pipe(
            t
              .array(item)
              .validate(
                toArray(
                  Object.prototype.hasOwnProperty.call(u, itemTypeName)
                    ? (u as Record<string, unknown>)[itemTypeName]
                    : u
                ),
                c
              ),
            chain(a => t.success(a))
          ),
    item.encode === t.identity ? t.identity : a => a.map(item.encode),
    item
  );
type Mix<A, B> = {
  [P in keyof (A | B)]: A[P] | B[P];
};
type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};
type ExcludeFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? never : Key;
};
type AllowedNames<Base, Condition> = FilterFlags<Base, Condition>[keyof Base];
type ExcludeNames<Base, Condition> = ExcludeFlags<Base, Condition>[keyof Base];
export type SubType<Base, Condition> = Pick<Base, AllowedNames<Base, Condition>>;
type RequiredKeys<T> = {
  [K in keyof T]-?: T[K] extends Exclude<T[K], undefined> ? K : never;
}[keyof T];
export type Id<T> = {} & { [P in keyof T]: T[P] };

// type DeepPartial<T> = {
//   [P in keyof T]?: DeepPartial<T[P]>;
// };

export function makeStruct<C extends t.Mixed, I extends Mix<t.TypeOf<C>, t.OutputOf<C>>>(
  codec: C,
  initializer: Partial<I>
): Id<
  Required<Pick<t.TypeOf<C>, RequiredKeys<I>>> & Pick<t.TypeOf<C>, ExcludeNames<I, undefined>>
> {
  const v = codec.decode(initializer);
  if (isLeft(v)) throw new TypeError(`Invalid value: ${PathReporter.report(v)}`);
  return v.right;
}

function getProps<T extends t.HasProps>(codec: T): t.Props {
  // eslint-disable-next-line no-underscore-dangle
  switch (codec._tag) {
    case 'RefinementType':
    case 'ReadonlyType':
      return getProps(codec.type);
    case 'InterfaceType':
    case 'StrictType':
    case 'PartialType':
      return codec.props;
    case 'IntersectionType':
      return codec.types.reduce<t.TypeOf<T>>(
        (props, type) => Object.assign(props, getProps(type)),
        {}
      );
    default:
      throw new TypeError('Invalid codec');
  }
}

export const omit = <C extends t.HasProps, O extends keyof t.TypeOf<C>>(codec: C, k: O) => {
  const { [k]: prop, ...props } = getProps(codec);
  return t.type(props);
};
