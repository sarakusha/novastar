/**
 * Nova.LCT.GigabitSystem.ScreenAreaAcquirer.dll
 *
 */
import { Point } from '@novastar/native/lib/common';

import { isComplexScreen, isSimpleScreen, isStandardScreen, LEDDisplayInfo } from './common';
import getScreenLocation, { notEmptyXY } from './getScreenLocation';

export type Rectangle = Point & {
  width: number;
  height: number;
};

export type CutMapInfo = {
  address: number;
  length: number;
};

export type ScanBoardSelectedAreaInfo = {
  // ScanBoardInfo: ScanBoardRegionInfo;
  SelectedRectInSB: Rectangle[];
  SelectedSbPosInScreen: Point;
};

/**
 * UC_FullScreenSelect::GetAllSBSelectedAreaInfo
 */

export const fullScreenSelect = (screen: LEDDisplayInfo): ScanBoardSelectedAreaInfo[] => {
  const { leftTop } = getScreenLocation(screen);
  if (isStandardScreen(screen)) {
    return screen.ScannerRegionList.filter(notEmptyXY)
      .filter(sbInfo => sbInfo.SenderIndex !== 255)
      .map(sbInfo => ({
        SelectedRectInSB: [{ x: 0, y: 0, width: sbInfo.Width, height: sbInfo.Height }],
        SelectedSbPosInScreen: { x: sbInfo.X - leftTop.x, y: sbInfo.Y - leftTop.y },
      }));
  }
  if (isComplexScreen(screen)) {
    return screen.ScanBoardRegionInfoList.filter(notEmptyXY).map(sbInfo => ({
      SelectedRectInSB: [{ x: 0, y: 0, width: sbInfo.Width, height: sbInfo.Height }],
      SelectedSbPosInScreen: { x: sbInfo.X - leftTop.x, y: sbInfo.Y - leftTop.y },
    }));
  }
  if (isSimpleScreen(screen)) {
    throw new TypeError('Not implemented');
    // See SimpleLEDDisplayInfo::GetScanBdRegionInfo
    // return screen.PortScanBdInfoList
    //   .map()
  }
  throw new TypeError('Invalid LEDDisplay type');
};
