import * as t from 'io-ts';

type Id<T> = {} & { [P in keyof T]: T[P] };

export const Test = t.type({
  a: t.string,
  b: t.number,
});

/** {@link Wrapper | Wrapper interface} */
export const Wrapper = t.type({
  test: Test,
});

export type Z = {
  a: number;
  z: string;
};

export type Y = Pick<Z, 'a'>;

export type TestType = t.TypeOf<typeof Test>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Wrapper extends t.TypeOf<typeof Wrapper> {}
