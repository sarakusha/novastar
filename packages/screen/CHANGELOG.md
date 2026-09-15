# Change Log

## 2.4.2

### Patch Changes

- e52422b: Preserve the public ScreenConfigurator method types in generated declarations.

## 2.4.1

### Patch Changes

- 5fc404c: Match NovaLCT NCP write timing, readiness polling, and All Rv Cards addressing.

## 2.4.0

### Minor Changes

- 0953421: Decode and validate receiving-card firmware embedded in NovaLCT NCP packages, and add typed Taurus
  APIs for reading card versions, applying firmware to explicit targets, and tracking file and overall
  progress without ADB.

## 2.3.0

### Minor Changes

- 1587b87: Expose NovaLCT NCP package inspection for file paths and buffers.
- c122191: <!-- cspell:ignore RCCB -->

  Expose the original NCP cabinet RCCB binary and add Taurus APIs for authenticated FTP upload,
  applying a device-local receiving-card configuration, and progress reporting.

- 254d2b6: Decode current encrypted NovaLCT NCP packages and send a selected cabinet configuration to an explicitly addressed receiving card.
- f57c1cc: Expose the existing NovaLCT SCR decoder and its result type through the public package API.

## 2.2.2

### Patch Changes

- 8c04db2: - fix(screen): support VX400 device discovery
  - fix(screen): tolerate unavailable optional device properties

## 2.2.1

### Patch Changes

- 051d77e: Publish resolvable internal dependency ranges instead of workspace protocols.
- Updated dependencies [051d77e]
  - @novastar/codec@2.2.1
  - @novastar/native@2.2.1
  - @novastar/net@2.2.1
  - @novastar/serial@2.2.1

## 2.2.0

### Patch Changes

- efd8973: tsup -> tsdown
  disable request blocking for network transport
  BREAKING CHANGE: replaced default export with named export in packages/screen/src/index.ts
- Updated dependencies [efd8973]
  - @novastar/codec@2.2.0
  - @novastar/native@2.2.0
  - @novastar/net@2.2.0
  - @novastar/serial@2.2.0

## 2.2.0-alpha.3

### Patch Changes

- tsup -> tsdown
  disable request blocking for network transport
  BREAKING CHANGE: replaced default export with named export in packages/screen/src/index.ts
- Updated dependencies
  - @novastar/codec@2.2.0-alpha.3
  - @novastar/native@2.2.0-alpha.3
  - @novastar/net@2.2.0-alpha.3
  - @novastar/serial@2.2.0-alpha.3

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.2.0-alpha.2](https://github.com/sarakusha/novastar/compare/v2.2.0-alpha.0...v2.2.0-alpha.2) (2026-01-30)

**Note:** Version bump only for package @novastar/screen

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.2.0-alpha.0](https://github.com/sarakusha/novastar/compare/v2.1.0...v2.2.0-alpha.0) (2025-04-28)

### Features

- broadcast SetGlobalBrightness
  ([21af6f8](https://github.com/sarakusha/novastar/commit/21af6f842cbe93c0919721efe71360673247ecd5))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.1.0](https://github.com/sarakusha/novastar/compare/v2.0.0...v2.1.0) (2024-10-28)

### Features

- export common methods
  ([fc94abe](https://github.com/sarakusha/novastar/commit/fc94abec30cad41d7a2f36915c78593cd6442ac6))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/sarakusha/novastar/compare/v2.0.0-alpha.12...v2.0.0) (2024-10-16)

**Note:** Version bump only for package @novastar/screen

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-alpha.12](https://github.com/sarakusha/novastar/compare/v2.0.0-alpha.11...v2.0.0-alpha.12) (2024-10-16)

**Note:** Version bump only for package @novastar/screen

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-alpha.11](https://github.com/sarakusha/novastar/compare/v2.0.0-alpha.10...v2.0.0-alpha.11) (2023-10-02)

**Note:** Version bump only for package @novastar/screen

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-alpha.10](https://github.com/sarakusha/novastar/compare/v2.0.0-alpha.9...v2.0.0-alpha.10) (2023-02-02)

**Note:** Version bump only for package @novastar/screen

# [2.0.0-alpha.9](https://github.com/sarakusha/novastar/compare/v2.0.0-alpha.8...v2.0.0-alpha.9) (2022-12-01)

### Bug Fixes

- fixed bug in exports parameter
  ([6501581](https://github.com/sarakusha/novastar/commit/65015819349d6e90f9bb64bfece94f189ff00961)),
  closes [#611](https://github.com/sarakusha/novastar/issues/611)

# [2.0.0-alpha.8](https://github.com/sarakusha/novastar/compare/v2.0.0-alpha.7...v2.0.0-alpha.8) (2022-10-28)

### Bug Fixes

- calculation of the position of the cabinet and the size of the screen, if they were not set
  ([3aa6197](https://github.com/sarakusha/novastar/commit/3aa6197716722515e10b42f2e185bd37c9534b98))

# [2.0.0-alpha.7](https://github.com/sarakusha/novastar/compare/v2.0.0-alpha.6...v2.0.0-alpha.7) (2022-10-14)

### Features

- added function to remove dead pixels
  ([886701c](https://github.com/sarakusha/novastar/commit/886701cf19ad32da338e1e4d077a7b0835ead257))

# [2.0.0-alpha.6](https://github.com/sarakusha/novastar/compare/v1.0.5...v2.0.0-alpha.6) (2022-05-26)

### Bug Fixes

- replace @blu3r4y/lzma with esm-compatible @sarakusha/lzma
  ([9e93441](https://github.com/sarakusha/novastar/commit/9e93441e72be7451f775dede886d8250f83395a8))

### Features

- hybrid npm package via package.json exports map
  ([609aef7](https://github.com/sarakusha/novastar/commit/609aef7a0f9f71d35a8a88a281f299cebb931f33))

# [2.0.0-alpha.5](https://github.com/sarakusha/novastar/compare/v1.0.5...v2.0.0-alpha.5) (2022-05-25)

### Features

- hybrid npm package via package.json exports map
  ([609aef7](https://github.com/sarakusha/novastar/commit/609aef7a0f9f71d35a8a88a281f299cebb931f33))

# [2.0.0-alpha.4](https://github.com/sarakusha/novastar/compare/v1.0.5...v2.0.0-alpha.4) (2022-05-25)

**Note:** Version bump only for package @novastar/screen

# [2.0.0-alpha.3](https://github.com/sarakusha/novastar/compare/v1.0.5...v2.0.0-alpha.3) (2022-05-24)

**Note:** Version bump only for package @novastar/screen

# [2.0.0-alpha.2](https://github.com/sarakusha/novastar/compare/v1.0.5...v2.0.0-alpha.2) (2022-02-08)

**Note:** Version bump only for package @novastar/screen

# [2.0.0-alpha.1](https://github.com/sarakusha/novastar/compare/v1.0.5...v2.0.0-alpha.1) (2022-02-08)

**Note:** Version bump only for package @novastar/screen

# [2.0.0-alpha.0](https://github.com/sarakusha/novastar/compare/v1.0.5...v2.0.0-alpha.0) (2022-02-08)

**Note:** Version bump only for package @novastar/screen
