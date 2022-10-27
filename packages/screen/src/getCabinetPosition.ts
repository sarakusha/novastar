import {
  isHorizontalConnection,
  isLeftConnection,
  isSimpleScreen,
  isStandardScreen,
  isTopConnection,
  LEDDisplayInfo,
} from './common';
import { notEmptyXY } from './getScreenLocation';

export type CabinetPosition = {
  column: number;
  row: number;
  left: number;
  top: number;
  sender: number;
  port: number;
  card: number;
};

const getCabinetPosition = (
  screen: LEDDisplayInfo,
  sender: number,
  port: number,
  card: number,
): CabinetPosition | null => {
  if (isSimpleScreen(screen)) {
    if (screen.SenderIndex !== sender) return null;
    const portInfo = screen.PortScanBdInfoList.find(({ PortIndex }) => PortIndex === port);
    if (!portInfo) return null;
    const {
      ConnectType = 0,
      ScanBdBegColNo = 0,
      ScanBdEndColNo = 0,
      ScanBdBegRowNo = 0,
      ScanBdEndRowNo = 0,
    } = portInfo;
    const cols = ScanBdEndColNo - ScanBdBegColNo;
    const rows = ScanBdEndRowNo - ScanBdBegRowNo;
    if (cols === 0 || rows === 0) return null;
    let [column, row] = isHorizontalConnection(ConnectType)
      ? [card % cols, Math.floor(card / cols)]
      : [Math.floor(card / rows), card % rows];
    if ((row % 2 === 1) === isLeftConnection(ConnectType)) {
      column = cols - column;
    }
    if ((column % 2 === 1) === isTopConnection(ConnectType)) {
      row = rows - row;
    }
    return {
      sender,
      port,
      card,
      column,
      row,
      left: column * screen.PixelColsInScanBd,
      top: row * screen.PixelRowsInScanBd,
    };
  }
  const list = isStandardScreen(screen)
    ? screen.ScannerRegionList.filter(notEmptyXY)
    : screen.ScanBoardRegionInfoList.filter(notEmptyXY);
  const cabinet = list.find(
    ({
      SenderIndex,
      PortIndex,
      ConnectIndex,
    }) =>
      SenderIndex === sender && PortIndex === port && ConnectIndex === card,
  );
  if (!cabinet) return null;
  const [uniqX, uniqY] = list.reduce((
    [xSet, ySet],
    {
      X,
      Y,
    }) => {
    xSet.add(X);
    ySet.add(Y);
    return [xSet, ySet];
  }, [new Set<number>(), new Set<number>()]);
  const sortedX = [...uniqX.values()].sort();
  const sortedY = [...uniqY.values()].sort();
  return {
    sender,
    port,
    card,
    row: cabinet.RowIndexInScreen ?? sortedY.findIndex(y => y === cabinet.Y),
    column: cabinet.ColIndexInScreen ?? sortedX.findIndex(x => x === cabinet.X),
    left: cabinet.X ?? 0,
    top: cabinet.Y ?? 0,
  };
};

export default getCabinetPosition;
