# @novastar/taurus

## 0.3.0

### Minor Changes

- 0953421: Decode and validate receiving-card firmware embedded in NovaLCT NCP packages, and add typed Taurus
  APIs for reading card versions, applying firmware to explicit targets, and tracking file and overall
  progress without ADB.

## 0.2.0

### Minor Changes

- c122191: <!-- cspell:ignore RCCB -->

  Expose the original NCP cabinet RCCB binary and add Taurus APIs for authenticated FTP upload,
  applying a device-local receiving-card configuration, and progress reporting.

- 39acff0: Add typed video-source mode, HDMI signal and EDID, scaling, video offset, and physical LED screen
  geometry APIs.

## 0.1.0

### Minor Changes

- b526755: Add a client for authenticated Taurus player management, brightness, and ambient light.
