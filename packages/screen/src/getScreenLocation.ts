import type { Point } from '@novastar/native/common';
import last from 'lodash/last';
import sortBy from 'lodash/sortBy';

import { hasProps, isSimpleScreen, isStandardScreen, LEDDisplayInfo } from './common';

export type Location = {
  leftTop: Point;
  rightBottom: Point;
  cols: number;
  rows: number;
};
export const notEmptyXY = hasProps('X', 'Y', 'Width', 'Height');

export default function getScreenLocation(screen: LEDDisplayInfo): Location {
  if (isSimpleScreen(screen)) {
    const cols = screen?.ScanBdCols ?? 0;
    const rows = screen?.ScanBdRows ?? 0;
    const width = cols * (screen?.PixelColsInScanBd ?? 0);
    const height = rows * (screen?.PixelRowsInScanBd ?? 0);
    const x = screen?.X ?? 0;
    const y = screen?.Y ?? 0;
    return {
      leftTop: {
        x,
        y,
      },
      rightBottom: {
        x: x + width,
        y: y + height,
      },
      cols,
      rows,
    };
  }
  const xy =
    (isStandardScreen(screen)
      ? screen.ScannerRegionList?.filter(notEmptyXY)
      : screen.ScanBoardRegionInfoList?.filter(notEmptyXY)) ?? [];

  if (xy.length === 0)
    return {
      leftTop: {
        x: 0,
        y: 0,
      },
      rightBottom: {
        x: 0,
        y: 0,
      },
      cols: 0,
      rows: 0,
    };
  const xx = sortBy(xy, ['X']);
  const yy = sortBy(xy, ['Y']);
  const xLast = last(xx)!;
  const yLast = last(yy)!;

  const left = Math.max(0, xx[0].X);
  const top = Math.max(0, yy[0].Y);
  const right = Math.max(0, xLast.X + xLast.Width);
  const bottom = Math.max(0, yLast.Y + yLast.Height);
  const [uniqX, uniqY] = xy.reduce((
    [xSet, ySet],
    {
      X,
      Y,
    }) => {
    xSet.add(X);
    ySet.add(Y);
    return [xSet, ySet];
  }, [new Set<number>(), new Set<number>()]);
  const firstColumn = xx[0].ColIndexInScreen;
  const lastColumn = xLast.ColIndexInScreen;
  const firstRow = xx[0].RowIndexInScreen;
  const lastRow = xLast.RowIndexInScreen;
  const [cols, rows] = isStandardScreen(screen) && screen.ScanBoardCols && screen.ScanBoardRows
    ? [screen.ScanBoardCols, screen.ScanBoardRows]
    : [
      lastColumn != null && firstColumn != null
        ? Math.max(lastColumn - firstColumn + 1, 0)
        : uniqX.size,
      lastRow != null && firstRow != null
        ? Math.max(lastRow - firstRow + 1, 0)
        : uniqY.size,
    ];

  return {
    leftTop: {
      x: left,
      y: top,
    },
    rightBottom: {
      x: right,
      y: bottom,
    },
    cols,
    rows,
  };
}
