/**
 * Nova.LCT.GigabitSystem.DataClass, Nova.LCT.GigabitSystem.Common::CustomTransform
 */

import { ChipTypeEnum } from '@novastar/native/ChipType';
import { NSCardTypeEnum } from '@novastar/native/NSCardType';
import { ScreenDriveTypeEnum } from '@novastar/native/ScreenDriveType';

export const GetSmartMode = (
  isSmartMode: boolean,
  screenDriverType: ScreenDriveTypeEnum,
  chipType: ChipTypeEnum
): number => {
  if (!isSmartMode) return 0;
  if (chipType === ChipTypeEnum.Chip_MBI5359 || chipType === ChipTypeEnum.Chip_MBI5353) return 1;
  if (
    screenDriverType === ScreenDriveTypeEnum.Concurrent &&
    (chipType === ChipTypeEnum.Chip_MBI5042 ||
      chipType === ChipTypeEnum.Chip_SM16136 ||
      chipType === ChipTypeEnum.Chip_MBI5030 ||
      chipType === ChipTypeEnum.Chip_RFT3630 ||
      chipType === ChipTypeEnum.Chip_MY9262 ||
      chipType === ChipTypeEnum.Chip_MY9263 ||
      chipType === ChipTypeEnum.Chip_MBI5040 ||
      chipType === ChipTypeEnum.Chip_IT1505 ||
      chipType === ChipTypeEnum.Chip_MBI5042B ||
      chipType === ChipTypeEnum.Chip_MBI5043 ||
      chipType === ChipTypeEnum.Chip_MBI5041B ||
      chipType === ChipTypeEnum.Chip_MBIA043 ||
      chipType === ChipTypeEnum.Chip_MBI5041Q ||
      chipType === ChipTypeEnum.Chip_SUM2028 ||
      chipType === ChipTypeEnum.Chip_MBI5045 ||
      chipType === ChipTypeEnum.Chip_GW6205 ||
      chipType === ChipTypeEnum.Chip_UCS1912 ||
      chipType === ChipTypeEnum.Chip_LD1512 ||
      chipType === ChipTypeEnum.Chip_MBI6030 ||
      chipType === ChipTypeEnum.Chip_MBI6023 ||
      chipType === ChipTypeEnum.Chip_MY9231 ||
      chipType === ChipTypeEnum.Chip_MY9221)
  )
    return 3;
  return 2;
};

export const IsSaveScreenCfgToHW = (cardType: NSCardTypeEnum): boolean =>
  cardType === NSCardTypeEnum.NovaProHD ||
  cardType === NSCardTypeEnum.NovaProHD_II ||
  cardType === NSCardTypeEnum.V800 ||
  cardType === NSCardTypeEnum.V700 ||
  cardType === NSCardTypeEnum.V900 ||
  cardType === NSCardTypeEnum.VX400S ||
  cardType === NSCardTypeEnum.VX2 ||
  cardType === NSCardTypeEnum.VX4 ||
  cardType === NSCardTypeEnum.VX4S ||
  cardType === NSCardTypeEnum.VX4S_N ||
  cardType === NSCardTypeEnum.VX5 ||
  cardType === NSCardTypeEnum.K4 ||
  cardType === NSCardTypeEnum.K4S ||
  cardType === NSCardTypeEnum.K4S_N ||
  cardType === NSCardTypeEnum.K4A ||
  cardType === NSCardTypeEnum.VD43 ||
  cardType === NSCardTypeEnum.VP200 ||
  cardType === NSCardTypeEnum.VS1 ||
  cardType === NSCardTypeEnum.VS2 ||
  cardType === NSCardTypeEnum.TVctrl_230R ||
  cardType === NSCardTypeEnum.VX4U ||
  cardType === NSCardTypeEnum.K4U ||
  cardType === NSCardTypeEnum.VX2U ||
  cardType === NSCardTypeEnum.K2U ||
  cardType === NSCardTypeEnum.VX2S ||
  cardType === NSCardTypeEnum.VS3 ||
  cardType === NSCardTypeEnum.MCTRL4K ||
  cardType === NSCardTypeEnum.MCTRLR5 ||
  cardType === NSCardTypeEnum.VX6 ||
  cardType === NSCardTypeEnum.VX6S ||
  cardType === NSCardTypeEnum.VX5S ||
  cardType === NSCardTypeEnum.MCTRL1600 ||
  cardType === NSCardTypeEnum.SD2000E ||
  cardType === NSCardTypeEnum.HDMICard ||
  cardType === NSCardTypeEnum.MP8_JF ||
  cardType === NSCardTypeEnum.MCTRL600_A ||
  cardType === NSCardTypeEnum.MCTRL660_Pro ||
  cardType === NSCardTypeEnum.MCTRL660_ROE ||
  cardType === NSCardTypeEnum.K16 ||
  cardType === NSCardTypeEnum.Prime_4K ||
  cardType === NSCardTypeEnum.V1260 ||
  cardType === NSCardTypeEnum.VX16s ||
  cardType === NSCardTypeEnum.K6s ||
  cardType === NSCardTypeEnum.V1060 ||
  cardType === NSCardTypeEnum.UTA3000 ||
  cardType === NSCardTypeEnum.ProUHD_Jr ||
  cardType === NSCardTypeEnum.ProUHD ||
  cardType === NSCardTypeEnum.V760 ||
  cardType === NSCardTypeEnum.VX1 ||
  cardType === NSCardTypeEnum.VS0 ||
  cardType === NSCardTypeEnum.KT3 ||
  cardType === NSCardTypeEnum.PJ1 ||
  cardType === NSCardTypeEnum.MCTRL4K_ViewPro ||
  cardType === NSCardTypeEnum.VD28 ||
  cardType === NSCardTypeEnum.E8000_2 ||
  cardType === NSCardTypeEnum.E8000_3 ||
  cardType === NSCardTypeEnum.V960 ||
  cardType === NSCardTypeEnum.SX100 ||
  cardType === NSCardTypeEnum.KT8 ||
  cardType === NSCardTypeEnum.Mee200 ||
  cardType === NSCardTypeEnum.Mee400 ||
  cardType === NSCardTypeEnum.Mee400C ||
  cardType === NSCardTypeEnum.KT16E ||
  cardType === NSCardTypeEnum.KT8E ||
  cardType === NSCardTypeEnum.KT16C ||
  cardType === NSCardTypeEnum.KT16E_CE ||
  cardType === NSCardTypeEnum.H9 ||
  cardType === NSCardTypeEnum.H_20 ||
  cardType === NSCardTypeEnum.V1160 ||
  cardType === NSCardTypeEnum.VX1000 ||
  cardType === NSCardTypeEnum.VX600 ||
  cardType === NSCardTypeEnum.V1060n ||
  cardType === NSCardTypeEnum.MTX4000 ||
  cardType === NSCardTypeEnum.TVSend_4K ||
  cardType === NSCardTypeEnum.TwoInOne;

export const IsSystemController = (cardType: NSCardTypeEnum): boolean =>
  cardType === NSCardTypeEnum.Controller ||
  cardType === NSCardTypeEnum.HDMICard ||
  cardType === NSCardTypeEnum.E500 ||
  cardType === NSCardTypeEnum.Thundervier_S1 ||
  cardType === NSCardTypeEnum.KT3 ||
  cardType === NSCardTypeEnum.HDMICard6P ||
  cardType === NSCardTypeEnum.Sender ||
  cardType === NSCardTypeEnum.TVCard ||
  cardType === NSCardTypeEnum.VirtualSender ||
  cardType === NSCardTypeEnum.NovaProHD ||
  cardType === NSCardTypeEnum.NovaProHD_II ||
  cardType === NSCardTypeEnum.K4A ||
  cardType === NSCardTypeEnum.V800 ||
  cardType === NSCardTypeEnum.V700 ||
  cardType === NSCardTypeEnum.V900 ||
  cardType === NSCardTypeEnum.VX2 ||
  cardType === NSCardTypeEnum.VX4 ||
  cardType === NSCardTypeEnum.VX4S ||
  cardType === NSCardTypeEnum.VX4S_N ||
  cardType === NSCardTypeEnum.VX5 ||
  cardType === NSCardTypeEnum.Nova3DHD ||
  cardType === NSCardTypeEnum.VP200 ||
  cardType === NSCardTypeEnum.MCTRL4K ||
  cardType === NSCardTypeEnum.MCTRLR5 ||
  cardType === NSCardTypeEnum.VX6 ||
  cardType === NSCardTypeEnum.VX5S ||
  cardType === NSCardTypeEnum.VX6S ||
  cardType === NSCardTypeEnum.MCTRL1600 ||
  cardType === NSCardTypeEnum.K4 ||
  cardType === NSCardTypeEnum.K4S ||
  cardType === NSCardTypeEnum.K4S_N ||
  cardType === NSCardTypeEnum.VD43 ||
  cardType === NSCardTypeEnum.VS1 ||
  cardType === NSCardTypeEnum.VS2 ||
  cardType === NSCardTypeEnum.VS0 ||
  cardType === NSCardTypeEnum.V760 ||
  cardType === NSCardTypeEnum.VS3 ||
  cardType === NSCardTypeEnum.VS4 ||
  cardType === NSCardTypeEnum.TVctrl_230R ||
  cardType === NSCardTypeEnum.D_DV18 ||
  cardType === NSCardTypeEnum.VP200U ||
  cardType === NSCardTypeEnum.VX4U ||
  cardType === NSCardTypeEnum.K4U ||
  cardType === NSCardTypeEnum.K2U ||
  cardType === NSCardTypeEnum.VX2U ||
  cardType === NSCardTypeEnum.VX2S ||
  cardType === NSCardTypeEnum.D_HM14_4K ||
  cardType === NSCardTypeEnum.JZ_AX100 ||
  cardType === NSCardTypeEnum.T3 ||
  cardType === NSCardTypeEnum.JT100 ||
  cardType === NSCardTypeEnum.T1 ||
  cardType === NSCardTypeEnum.T2 ||
  cardType === NSCardTypeEnum.T8 ||
  cardType === NSCardTypeEnum.T6 ||
  cardType === NSCardTypeEnum.T1_4G ||
  cardType === NSCardTypeEnum.T2_4G ||
  cardType === NSCardTypeEnum.MCTRL660_Pro ||
  cardType === NSCardTypeEnum.MCTRL660_ROE ||
  cardType === NSCardTypeEnum.K6s ||
  cardType === NSCardTypeEnum.V1060 ||
  cardType === NSCardTypeEnum.K16 ||
  cardType === NSCardTypeEnum.H9 ||
  cardType === NSCardTypeEnum.H_20 ||
  cardType === NSCardTypeEnum.Prime_4K ||
  cardType === NSCardTypeEnum.V1260 ||
  cardType === NSCardTypeEnum.VX16s ||
  cardType === NSCardTypeEnum.PJ1 ||
  cardType === NSCardTypeEnum.ProUHD_Jr ||
  cardType === NSCardTypeEnum.ProUHD ||
  cardType === NSCardTypeEnum.MCTRL4K_ViewPro ||
  cardType === NSCardTypeEnum.C3 ||
  cardType === NSCardTypeEnum.T4 ||
  cardType === NSCardTypeEnum.TCC60_YJ ||
  cardType === NSCardTypeEnum.VD28 ||
  cardType === NSCardTypeEnum.Unknown ||
  cardType === NSCardTypeEnum.TCC50 ||
  cardType === NSCardTypeEnum.ATM ||
  cardType === NSCardTypeEnum.E8000_2 ||
  cardType === NSCardTypeEnum.E8000_3 ||
  cardType === NSCardTypeEnum.V960 ||
  cardType === NSCardTypeEnum.JT50 ||
  cardType === NSCardTypeEnum.SX100 ||
  cardType === NSCardTypeEnum.KT8 ||
  cardType === NSCardTypeEnum.TVSend_4K ||
  cardType === NSCardTypeEnum.VX1 ||
  cardType === NSCardTypeEnum.Mee200 ||
  cardType === NSCardTypeEnum.Mee400 ||
  cardType === NSCardTypeEnum.Mee400C ||
  cardType === NSCardTypeEnum.KT16E ||
  cardType === NSCardTypeEnum.KT8E ||
  cardType === NSCardTypeEnum.KT16C ||
  cardType === NSCardTypeEnum.T30 ||
  cardType === NSCardTypeEnum.T80 ||
  cardType === NSCardTypeEnum.V1160 ||
  cardType === NSCardTypeEnum.VX1000 ||
  cardType === NSCardTypeEnum.VX600 ||
  cardType === NSCardTypeEnum.VX400S;

export type PortCount = 1 | 2 | 4 | 6 | 8 | 10 | 16 | 20 | 24 | 32;

export const GetPortNumber = (cardType: NSCardTypeEnum): PortCount => {
  switch (cardType) {
    case NSCardTypeEnum.VirtualSender:
    case NSCardTypeEnum.Thundervier_S1:
    case NSCardTypeEnum.T1:
    case NSCardTypeEnum.T2:
    case NSCardTypeEnum.TCC70:
    case NSCardTypeEnum.JT20:
    case NSCardTypeEnum.LCC70:
    case NSCardTypeEnum.TCC60_YJ:
    case NSCardTypeEnum.T1_4G:
    case NSCardTypeEnum.JT50:
    case NSCardTypeEnum.T2_4G:
    case NSCardTypeEnum.MCTRL4K_ViewPro:
    case NSCardTypeEnum.SX100:
    case NSCardTypeEnum.TCC50:
      return 1;
    case NSCardTypeEnum.Sender:
    case NSCardTypeEnum.FunctionCard:
    case NSCardTypeEnum.V800:
    case NSCardTypeEnum.V700:
    case NSCardTypeEnum.VX2:
    case NSCardTypeEnum.VX2U:
    case NSCardTypeEnum.VX2S:
    case NSCardTypeEnum.K2U:
    case NSCardTypeEnum.T3:
    case NSCardTypeEnum.T3H:
    case NSCardTypeEnum.JT100:
    case NSCardTypeEnum.VX1:
    case NSCardTypeEnum.C3:
    case NSCardTypeEnum.T30:
    case NSCardTypeEnum.T4:
    case NSCardTypeEnum.T4H:
    case NSCardTypeEnum.T4A:
    case NSCardTypeEnum.T40:
    case NSCardTypeEnum.T50:
    case NSCardTypeEnum.JT200:
      return 2;
    case NSCardTypeEnum.Controller:
    case NSCardTypeEnum.HDMICard:
    case NSCardTypeEnum.MCTRL600_A:
    case NSCardTypeEnum.NovaProHD:
    case NSCardTypeEnum.V900:
    case NSCardTypeEnum.VX4:
    case NSCardTypeEnum.VX4U:
    case NSCardTypeEnum.K4U:
    case NSCardTypeEnum.VX4S:
    case NSCardTypeEnum.VX4S_N:
    case NSCardTypeEnum.VX5:
    case NSCardTypeEnum.K4:
    case NSCardTypeEnum.K4S:
    case NSCardTypeEnum.K4S_N:
    case NSCardTypeEnum.K4A:
    case NSCardTypeEnum.VD43:
    case NSCardTypeEnum.VP200:
    case NSCardTypeEnum.VS1:
    case NSCardTypeEnum.E500:
    case NSCardTypeEnum.KT3:
    case NSCardTypeEnum.JZ_AX100:
    case NSCardTypeEnum.T8:
    case NSCardTypeEnum.T8H:
    case NSCardTypeEnum.T6:
    case NSCardTypeEnum.T6H:
    case NSCardTypeEnum.V960:
    case NSCardTypeEnum.T80:
    case NSCardTypeEnum.VX400S:
    case NSCardTypeEnum.SD2000E:
    case NSCardTypeEnum.TVSend_4K:
    case NSCardTypeEnum.MCTRL660_ROE:
    case NSCardTypeEnum.T60:
      return 4;
    case NSCardTypeEnum.HDMICard6P:
    case NSCardTypeEnum.MCTRL660_Pro:
    case NSCardTypeEnum.VX6:
    case NSCardTypeEnum.VX6S:
    case NSCardTypeEnum.K6s:
    case NSCardTypeEnum.V1060:
    case NSCardTypeEnum.UTA3000:
    case NSCardTypeEnum.VX5S:
    case NSCardTypeEnum.PJ1:
    case NSCardTypeEnum.VX600:
    case NSCardTypeEnum.V1060n:
    case NSCardTypeEnum.TVctrl_230R:
      return 6;
    case NSCardTypeEnum.Nova3DHD:
    case NSCardTypeEnum.MCTRLR5:
    case NSCardTypeEnum.NovaProHD_II:
    case NSCardTypeEnum.E8000_2:
    case NSCardTypeEnum.KT16C:
    case NSCardTypeEnum.Mee400C:
    case NSCardTypeEnum.KT8:
      return 8;
    case NSCardTypeEnum.V1160:
    case NSCardTypeEnum.VX1000:
      return 10;
    case NSCardTypeEnum.MCTRL4K:
    case NSCardTypeEnum.MCTRL1600:
    case NSCardTypeEnum.K16:
    case NSCardTypeEnum.H9:
    case NSCardTypeEnum.Prime_4K:
    case NSCardTypeEnum.V1260:
    case NSCardTypeEnum.Mee200:
    case NSCardTypeEnum.VX16s:
    case NSCardTypeEnum.ProUHD:
    case NSCardTypeEnum.MP8_JF:
    case NSCardTypeEnum.ProUHD_Jr:
    case NSCardTypeEnum.KT8E:
    case NSCardTypeEnum.E8000_3:
      return 16;
    case NSCardTypeEnum.H_20:
    case NSCardTypeEnum.MTX4000:
    case NSCardTypeEnum.TwoInOne:
      return 20;
    case NSCardTypeEnum.KT16E_CE:
      return 24;
    case NSCardTypeEnum.Mee400:
    case NSCardTypeEnum.KT16E:
      return 32;
    default:
      return 2;
  }
};
