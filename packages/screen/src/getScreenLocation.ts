import { Point } from '@novastar/native/lib/common';
import sortBy from 'lodash/sortBy';
import last from 'lodash/last';

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

  const left = Math.min(0, xx[0].X);
  const top = Math.min(0, yy[0].Y);
  const right = Math.max(0, xLast.X + xLast.Width);
  const bottom = Math.max(0, yLast.Y + yLast.Height);
  const firstColumn = xx[0].ColIndexInScreen ?? 0;
  const lastColumn = xLast.ColIndexInScreen ?? 0;
  const firstRow = xx[0].RowIndexInScreen ?? 0;
  const lastRow = xLast.RowIndexInScreen ?? 0;
  const [cols, rows] = isStandardScreen(screen)
    ? [screen.ScanBoardCols, screen.ScanBoardRows]
    : [Math.max(lastColumn - firstColumn, 0), Math.max(lastRow - firstRow, 0)];

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
