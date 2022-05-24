import { NSCardTypeEnum } from '@novastar/native/lib/generated/NSCardType';

/**
 * SenderStateForm
 */
export default function GetDeviceTypeLanguage(deviceType: NSCardTypeEnum): string {
  switch (deviceType) {
    case NSCardTypeEnum.Controller:
      return 'MCTRL500';
    case NSCardTypeEnum.Sender:
      return 'MCTRL300';
    case NSCardTypeEnum.HDMICard6P:
      return 'MCTRL700';
    case NSCardTypeEnum.HDMICard:
      return 'MCTRL600/660';
    case NSCardTypeEnum.VS4:
      return 'J6';
    case NSCardTypeEnum.MCTRL660_Pro:
      return 'MCTRL660 PRO';
    case NSCardTypeEnum.MCTRL660_ROE:
      return 'MCTRL660 ROE';
    case NSCardTypeEnum.E8000_1:
    case NSCardTypeEnum.E8000_2:
    case NSCardTypeEnum.E8000_3:
      return 'E8000';
    case NSCardTypeEnum.Prime_4K:
      return '4K-Prime';
    case NSCardTypeEnum.ProUHD:
      return 'NovaPro UHD';
    case NSCardTypeEnum.ProUHD_Jr:
      return 'NovaPro UHD Jr';
    case NSCardTypeEnum.H9:
    case NSCardTypeEnum.H_20:
      return 'H series';
    default:
      return NSCardTypeEnum[deviceType] ?? 'Unknown';
  }
}
