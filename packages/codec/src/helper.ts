export type ArrayLike = unknown[] | Buffer | string;

/**
 * Split array/buffer/string into chunks
 * @param array - source array
 * @param len - chunk size
 */
function chunkArray<T extends ArrayLike>(array: T, len: number): T[] {
  const ret: T[] = [];
  const size = Math.ceil(array.length / len);
  ret.length = size;
  let offset;

  for (let i = 0; i < size; i += 1) {
    offset = i * len;
    ret[i] = array.slice(offset, offset + len) as T;
  }

  return ret;
}

/**
 * Buffer formatting
 * @param buffer
 */
export function printBuffer(buffer: Buffer): string {
  return chunkArray(chunkArray(buffer.toString('hex'), 2), 16)
    .map(chunk => chunk.join('-'))
    .join('=');
}

/**
 * Create a promise which resolves after the specified milliseconds.
 * @param ms
 */
export const delay = (ms: number): Promise<void> =>
  new Promise<void>(resolve => {
    setTimeout(resolve, ms);
  });

/**
 * Performs an asynchronous operation sequentially on all elements of an array
 * @param array
 * @param action
 */
export function series<T, R>(
  array: ReadonlyArray<T>,
  action: (item: T, index: number, arr: ReadonlyArray<T>, results: ReadonlyArray<R>) => Promise<R>
): Promise<R[]> {
  return array.reduce<Promise<R[]>>(
    (acc, item, index) =>
      acc.then(async items => {
        const result = await action(item, index, array, items);
        return [...items, result];
      }),
    Promise.resolve<R[]>([])
  );
}

/**
 * 'Not Empty' type guard
 * @param value
 */
export function notEmpty<TValue>(value: TValue | null | undefined | void): value is TValue {
  return (
    value !== undefined && value !== null && (typeof value !== 'number' || !Number.isNaN(value))
  );
}
