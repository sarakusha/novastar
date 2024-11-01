import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum LCTCommandsEnum {
  INVALID_ID = 0,
  CP_KILLDISPLAY = 1,
  CP_SETDISPLAYSECTION = 2,
  CP_SETDISPLAYSECTIONRGB = 3,
  CP_WEITECOEF = 4,
  CP_WRITECOEFTOFLASH = 5,
  CP_CHECKSCREENINFO = 6,
  CP_SETCORRECTIONMODE = 7,
  CP_SETDISPLAYSECTIONBYPIXEL = 8,
  CP_SETDISPLAYSECTIONRGBBYPIXEL = 9,
  CP_WEITECOEFBYPIXEL = 10, // 0xA
  CP_WRITECOEFTOFLASHBYPIXEL = 11, // 0xB
  CP_ENABELCORRECTION = 12, // 0xC
  CP_SETCURRENTDISPLAYINDEX = 13, // 0xD
  CP_GETDISPLAYCOUNT = 14, // 0xE
  CP_GETDISPLAYINFO = 15, // 0xF
  CP_SENDFILE = 16, // 0x10
  CP_GETFILE = 17, // 0x11
  CP_SENDDATA = 18, // 0x12
  CP_GETDATA = 19, // 0x13
  CP_SETUPLOADCOEFSMODE = 20, // 0x14
  CP_NOTIFYUPLOADCOEFSPERCENTCHANGED = 21, // 0x15
  CP_GETCONTROLLERVERSION = 22, // 0x16
  CP_SETCUSTOMBITMAP = 23, // 0x17
  CP_RELOADCOEFFICIENT = 24, // 0x18
  CP_SETCORRECTMODE_PIXEL = 25, // 0x19
  CP_GETSCRRECT_AVERCOEFS = 26, // 0x1A
  CP_REPLAYSCRRECT_AVERCOEFS = 27, // 0x1B
  CP_NOTIFYCUSTOMBITMAP_SETTED = 28, // 0x1C
  CP_MODULEFLASH_OPEARTION = 29, // 0x1D
  CP_NOTIFY_MODULEFLASH_RES = 30, // 0x1E
  CP_MODULEFLASH_OPEARTION_RECT = 31, // 0x1F
  CP_MODULEFLASH_OPEARTION_RES_RECT = 32, // 0x20
  CP_GET_FIRSTSCANNERID = 33, // 0x21
  CP_SET_FIRSTSCANNERID = 34, // 0x22
  CP_MODULEFLASH_OPEARTION_RES_RECT_EX = 35, // 0x23
  CP_SOLIDIFY = 36, // 0x24
  CP_QUICKLYADJUSTLINES = 37, // 0x25
  CP_SETCURRENTDISPLAYNAME = 38, // 0x26
  CP_GETDISPLAYCOUNTNEW = 39, // 0x27
  CP_GETDISPLAYINFONEW = 40, // 0x28
  CP_GET_HWDISPLAYSCREEN = 41, // 0x29
  CP_ENABEL2053IPCORE = 51, // 0x33
  CP_GET_CURRENTSCREENUSEMODE = 42, // 0x2A
  CP_SET_CURRENTSCREENUSEMODE = 43, // 0x2B
  CP_GET_DVICONNECTRES = 44, // 0x2C
  CP_SET_HWDISPLAYSCREEN = 45, // 0x2D
  CP_MODULEFLASH_WRITECOEF_RES = 46, // 0x2E
  CP_SET_GAMMA = 47, // 0x2F
  CP_SET_MRVID = 48, // 0x30
  CP_PASSTHROUGH = 49, // 0x31
  CP_GETDISPLAY_COM = 50, // 0x32
  CP_DELAYTIME = 52, // 0x34
  CP_SET_TEXTTOSCREEN = 53, // 0x35
  CP_SCANBDPROPRESULT = 54, // 0x36
  CP_SCANBDPROPMAXWAITTIME = 55, // 0x37
  CP_Get_MAXWAITTIME = 56, // 0x38
  CP_GETDEVICETYPE = 57, // 0x39
  CP_GET_WATETIMEFORSCANBD = 58, // 0x3A
  CP_LOWLUMWEITECOEF = 59, // 0x3B
  CP_SETLOWLUMCORRECTMODE_PIXEL = 60, // 0x3C
  CP_SETDISPLAYBYPIXEL = 61, // 0x3D
  CP_BLUEWHITEWEITECOEF = 62, // 0x3E
  CP_SET_CORRECTIONMODESWITCH = 63, // 0x3F
  CP_GET_CORRECTIONCONFIG = 64, // 0x40
  CP_SOLIDSCANER = 65, // 0x41
  CP_BRIGHTDARKLINEFIXCOEFUPLOAD = 66, // 0x42
  CP_CANCELBRIGHTDARKLINEFIXCOEFUPLOAD = 67, // 0x43
  CP_SETBRIGHTDARKLINEFIXSTATE = 68, // 0x44
  CP_SOLIDBRIGHTDARKLINEFIXSTATE = 69, // 0x45
  CP_SOLIDBRIGHTDARKLINEFIXCOEF = 70, // 0x46
  CP_GETSCANNERFUNCTIONINFOS = 71, // 0x47
  CP_POINTTOPOINT_DISPLAY_SCREEN = 72, // 0x48
  CP_MULTILAYER_CORRECTION_COEF_UPLOAD = 73, // 0x49
  CP_SET_MULTILAYER_CORRECTION_STATE = 74, // 0x4A
  CP_SOLID_MULTILAYER_CORRECTION_STATE = 75, // 0x4B
  CP_SOLID_MULTILAYER_CORRECTION_COEF = 76, // 0x4C
  CP_SET_EFFECT_SWITCH_STATE = 77, // 0x4D
  CP_GET_GAMMA_TABLE = 78, // 0x4E
  CP_GET_MODULE_TOPOLOGY_INFO = 100, // 0x64
  CP_GET_IS_MODULE_FLASH_SUPPORT = 101, // 0x65
  CP_GET_GLOBALBRIGHT = 102, // 0x66
  CP_SET_GLOBALBRIGHT = 103, // 0x67
  CP_CANCELCOMMONCORRECTIONCOEFUPLOAD = 104, // 0x68
  CP_CANCELMULTILAYERBRIGHTCOEFUPLOAD = 105, // 0x69
  CP_SET_CHESSBOARDSCREEN_DISPLAY = 106, // 0x6A
  CP_GET_CHESSBOARDSCREEN_SUPPORT = 107, // 0x6B
  CP_INTERVALPOINT_DISPLAY_SCREEN = 108, // 0x6C
  CP_GET_UPLOADLAYERS = 109, // 0x6D
  CP_OBTAIN_SUBPIXELSCREEN_INFORMATION = 116, // 0x74
  CP_SUBPIXELPOINT_BYPOINT_DISPLAY = 117, // 0x75
  CP_SUBPIXELCHECKERBOARD_SCREEN = 118, // 0x76
  CP_CALIBRATIONSOFTWARE_THREE_IDENTIFICATION = 119, // 0x77
  CP_GET_SCANBOARDINFO = 114, // 0x72
  CP_GET_ALLSCREENINFO = 115, // 0x73
  CP_SETSCREENDISPLAYMETHOD = 120, // 0x78
  CP_COEFUPLOAD = 126, // 0x7E
  CP_COEFSTATE = 127, // 0x7F
  CP_COEFSOLID = 128, // 0x80
  CP_GETLOWMODEL = 129, // 0x81
  CP_COEFSOLIDTOFLASH = 130, // 0x82
  CP_DEVICESTATUS = 131, // 0x83
  CP_GET_ISSUPPORT_MODULE_FLASH = 132, // 0x84
  CP_HWDISPLAYSCREENRETURN = 133, // 0x85
  CP_SETBRIGHTNESS_MOD = 134, // 0x86
  CP_CAMERASEAMREPAIR = 135, // 0x87
  CP_ISVALID_NCP = 136, // 0x88
  CP_SETCOMPAREFILE_NCP = 137, // 0x89
  CP_CHECKNCP_IS_SAME = 138, // 0x8A
  CP_GETSWITCHSTATE = 141, // 0x8D
  CP_SEND_CONPLETE_RCFGX = 142, // 0x8E
  CP_IMAGEENGINE_ISDONE = 143, // 0x8F
  CP_IMAGEENGINE_READ_SWITCH = 144, // 0x90
  CP_SENDFILE_NCP = 145, // 0x91
  CP_READ_CABINETID = 146, // 0x92
  CP_FILEINFOOFNCP = 147, // 0x93
  CP_MODULEIDSETINGS = 148,
}
/**
 * Codec for {@link LCTCommandsEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.CorrectionProtocol.decompiled.cs:44
 */
export const LCTCommands = EnumFromString(LCTCommandsEnum, 'LCTCommands');
