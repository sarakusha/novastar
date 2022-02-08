import { Point } from '@novastar/native/build/main/common';

import { isSimpleScreen, isStandardScreen, LEDDisplayInfo, notEmptyProps } from './common';

export type Location = {
  leftTop: Point;
  rightBottom: Point;
};
export const notEmptyXY = notEmptyProps('X', 'Y');

export default function getScreenLocation(screen: LEDDisplayInfo): Location {
  if (isSimpleScreen(screen)) {
    const width = (screen?.ScanBdCols ?? 0) * (screen?.PixelColsInScanBd ?? 0);
    const height = (screen?.ScanBdRows ?? 0) * (screen?.PixelRowsInScanBd ?? 0);
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
    };
  }
  const xy =
    (isStandardScreen(screen)
      ? screen.ScannerRegionList?.filter(notEmptyXY)
      : screen.ScanBoardRegionInfoList?.filter(notEmptyXY)) ?? [];

  const xx = xy.map(({ X }) => X);
  const yy = xy.map(({ Y }) => Y);
  const left = Math.min(0, ...xx);
  const top = Math.min(0, ...yy);
  const right = Math.max(0, ...xx);
  const bottom = Math.max(0, ...yy);
  return {
    leftTop: {
      x: left,
      y: top,
    },
    rightBottom: {
      x: right,
      y: bottom,
    },
  };
}
