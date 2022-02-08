type Preset = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

// eslint-disable-next-line import/prefer-default-export
export declare function LZMA(): {
  compress(
    buf: Buffer | string,
    mode: Preset,
    on_finish: (result: number[] | null, err?: unknown) => void,
    on_progress?: (progress: number) => void
  ): void;
  decompress(
    buf: Buffer | string,
    on_finish: (result: number[] | null, err?: unknown) => void,
    on_progress?: (progress: number) => void
  ): void;
};
