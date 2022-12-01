# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-alpha.9](https://github.com/sarakusha/novastar/compare/v2.0.0-alpha.8...v2.0.0-alpha.9) (2022-12-01)


### Bug Fixes

* fixed bug in exports parameter ([6501581](https://github.com/sarakusha/novastar/commit/65015819349d6e90f9bb64bfece94f189ff00961)), closes [#611](https://github.com/sarakusha/novastar/issues/611)





# [2.0.0-alpha.8](https://github.com/sarakusha/novastar/compare/v2.0.0-alpha.7...v2.0.0-alpha.8) (2022-10-28)


### Bug Fixes

* calculation of the position of the cabinet and the size of the screen, if they were not set ([3aa6197](https://github.com/sarakusha/novastar/commit/3aa6197716722515e10b42f2e185bd37c9534b98))


### Features

* export of public symbols ([da1d07f](https://github.com/sarakusha/novastar/commit/da1d07f5b10a64a6857a09c37b2411fdec1923eb))





# [2.0.0-alpha.7](https://github.com/sarakusha/novastar/compare/v2.0.0-alpha.6...v2.0.0-alpha.7) (2022-10-14)


### Bug Fixes

* overlapped requests ([5b7d803](https://github.com/sarakusha/novastar/commit/5b7d8033a600179acec21f23367e7e669d5d269f))


### Features

* added function to remove dead pixels ([886701c](https://github.com/sarakusha/novastar/commit/886701cf19ad32da338e1e4d077a7b0835ead257))
* added the ability to search by address or subnet ([f799a41](https://github.com/sarakusha/novastar/commit/f799a412b1cfddc7cba555f9e10c8d8be99a4c95))
* replacing buffer with uint8array ([693ff3f](https://github.com/sarakusha/novastar/commit/693ff3f0b2f981a904aa1d7d960924e6bdddb42d))





# [2.0.0-alpha.6](https://github.com/sarakusha/novastar/compare/v1.0.5...v2.0.0-alpha.6) (2022-05-26)


### Bug Fixes

* **connection:** catching data transmission errors ([8e74593](https://github.com/sarakusha/novastar/commit/8e74593453fec98aebb84134d67e833e57a71f36))
* decoding many packets at a time ([6fd7b3f](https://github.com/sarakusha/novastar/commit/6fd7b3f726d5542d498f965881f4ce91d258c6e9))
* replace @blu3r4y/lzma with esm-compatible @sarakusha/lzma ([9e93441](https://github.com/sarakusha/novastar/commit/9e93441e72be7451f775dede886d8250f83395a8))


### Features

* added debug output ([91e891a](https://github.com/sarakusha/novastar/commit/91e891a8103d9c59665353b99a851628bfec3c44))
* added methods to populate the list of known devices ([9d71d33](https://github.com/sarakusha/novastar/commit/9d71d33a7899657b8c7166eb00aa8432e151f2e7))
* added trySend method ([87e5ec4](https://github.com/sarakusha/novastar/commit/87e5ec428c12bf4b9a9bca0a767ccfb3a0f4d1da))
* automatic splitting into chunks when the maximum data size is exceeded ([1198d22](https://github.com/sarakusha/novastar/commit/1198d228a841b84292cd0c7f465c0be655c991b4))
* custom errors ([79df51f](https://github.com/sarakusha/novastar/commit/79df51f5b935ecad0961926c649ed785723eb0b2))
* hybrid npm package via package.json exports map ([609aef7](https://github.com/sarakusha/novastar/commit/609aef7a0f9f71d35a8a88a281f299cebb931f33))
* **session:** expandable session ([e5a3024](https://github.com/sarakusha/novastar/commit/e5a30243585467caba7cb60ce965e57ecac9d9b4))
* some helper functions ([14f504f](https://github.com/sarakusha/novastar/commit/14f504f6fc65d45c13629976ddff0a38a1f3d13d))
* some helper functions ([09acf48](https://github.com/sarakusha/novastar/commit/09acf48e2956d84571e1d8d6541cc61f0add3023))


### Reverts

* 1.0.8 ([a59bda0](https://github.com/sarakusha/novastar/commit/a59bda0e9acd1660280dc32ac4a0e732c4148ee4))


### BREAKING CHANGES

* **session:** Session no longer contains API methods out of the box





# [2.0.0-alpha.5](https://github.com/sarakusha/novastar/compare/v1.0.5...v2.0.0-alpha.5) (2022-05-25)


### Bug Fixes

* **connection:** catching data transmission errors ([8e74593](https://github.com/sarakusha/novastar/commit/8e74593453fec98aebb84134d67e833e57a71f36))
* decoding many packets at a time ([6fd7b3f](https://github.com/sarakusha/novastar/commit/6fd7b3f726d5542d498f965881f4ce91d258c6e9))


### Features

* added debug output ([91e891a](https://github.com/sarakusha/novastar/commit/91e891a8103d9c59665353b99a851628bfec3c44))
* added methods to populate the list of known devices ([9d71d33](https://github.com/sarakusha/novastar/commit/9d71d33a7899657b8c7166eb00aa8432e151f2e7))
* added trySend method ([87e5ec4](https://github.com/sarakusha/novastar/commit/87e5ec428c12bf4b9a9bca0a767ccfb3a0f4d1da))
* automatic splitting into chunks when the maximum data size is exceeded ([1198d22](https://github.com/sarakusha/novastar/commit/1198d228a841b84292cd0c7f465c0be655c991b4))
* custom errors ([79df51f](https://github.com/sarakusha/novastar/commit/79df51f5b935ecad0961926c649ed785723eb0b2))
* hybrid npm package via package.json exports map ([609aef7](https://github.com/sarakusha/novastar/commit/609aef7a0f9f71d35a8a88a281f299cebb931f33))
* **session:** expandable session ([e5a3024](https://github.com/sarakusha/novastar/commit/e5a30243585467caba7cb60ce965e57ecac9d9b4))
* some helper functions ([14f504f](https://github.com/sarakusha/novastar/commit/14f504f6fc65d45c13629976ddff0a38a1f3d13d))
* some helper functions ([09acf48](https://github.com/sarakusha/novastar/commit/09acf48e2956d84571e1d8d6541cc61f0add3023))


### Reverts

* 1.0.8 ([a59bda0](https://github.com/sarakusha/novastar/commit/a59bda0e9acd1660280dc32ac4a0e732c4148ee4))


### BREAKING CHANGES

* **session:** Session no longer contains API methods out of the box





# [2.0.0-alpha.4](https://github.com/sarakusha/novastar/compare/v1.0.5...v2.0.0-alpha.4) (2022-05-25)


### Bug Fixes

* **connection:** catching data transmission errors ([8e74593](https://github.com/sarakusha/novastar/commit/8e74593453fec98aebb84134d67e833e57a71f36))
* decoding many packets at a time ([6fd7b3f](https://github.com/sarakusha/novastar/commit/6fd7b3f726d5542d498f965881f4ce91d258c6e9))


### Features

* added debug output ([91e891a](https://github.com/sarakusha/novastar/commit/91e891a8103d9c59665353b99a851628bfec3c44))
* added methods to populate the list of known devices ([9d71d33](https://github.com/sarakusha/novastar/commit/9d71d33a7899657b8c7166eb00aa8432e151f2e7))
* added trySend method ([87e5ec4](https://github.com/sarakusha/novastar/commit/87e5ec428c12bf4b9a9bca0a767ccfb3a0f4d1da))
* automatic splitting into chunks when the maximum data size is exceeded ([1198d22](https://github.com/sarakusha/novastar/commit/1198d228a841b84292cd0c7f465c0be655c991b4))
* custom errors ([79df51f](https://github.com/sarakusha/novastar/commit/79df51f5b935ecad0961926c649ed785723eb0b2))
* **session:** expandable session ([e5a3024](https://github.com/sarakusha/novastar/commit/e5a30243585467caba7cb60ce965e57ecac9d9b4))
* some helper functions ([14f504f](https://github.com/sarakusha/novastar/commit/14f504f6fc65d45c13629976ddff0a38a1f3d13d))
* some helper functions ([09acf48](https://github.com/sarakusha/novastar/commit/09acf48e2956d84571e1d8d6541cc61f0add3023))


### Reverts

* 1.0.8 ([a59bda0](https://github.com/sarakusha/novastar/commit/a59bda0e9acd1660280dc32ac4a0e732c4148ee4))


### BREAKING CHANGES

* **session:** Session no longer contains API methods out of the box





# [2.0.0-alpha.3](https://github.com/sarakusha/novastar/compare/v1.0.5...v2.0.0-alpha.3) (2022-05-24)


### Bug Fixes

* **connection:** catching data transmission errors ([8e74593](https://github.com/sarakusha/novastar/commit/8e74593453fec98aebb84134d67e833e57a71f36))
* decoding many packets at a time ([6fd7b3f](https://github.com/sarakusha/novastar/commit/6fd7b3f726d5542d498f965881f4ce91d258c6e9))


### Features

* added debug output ([91e891a](https://github.com/sarakusha/novastar/commit/91e891a8103d9c59665353b99a851628bfec3c44))
* added methods to populate the list of known devices ([9d71d33](https://github.com/sarakusha/novastar/commit/9d71d33a7899657b8c7166eb00aa8432e151f2e7))
* added trySend method ([87e5ec4](https://github.com/sarakusha/novastar/commit/87e5ec428c12bf4b9a9bca0a767ccfb3a0f4d1da))
* automatic splitting into chunks when the maximum data size is exceeded ([1198d22](https://github.com/sarakusha/novastar/commit/1198d228a841b84292cd0c7f465c0be655c991b4))
* custom errors ([79df51f](https://github.com/sarakusha/novastar/commit/79df51f5b935ecad0961926c649ed785723eb0b2))
* **session:** expandable session ([e5a3024](https://github.com/sarakusha/novastar/commit/e5a30243585467caba7cb60ce965e57ecac9d9b4))
* some helper functions ([14f504f](https://github.com/sarakusha/novastar/commit/14f504f6fc65d45c13629976ddff0a38a1f3d13d))
* some helper functions ([09acf48](https://github.com/sarakusha/novastar/commit/09acf48e2956d84571e1d8d6541cc61f0add3023))


### Reverts

* 1.0.8 ([a59bda0](https://github.com/sarakusha/novastar/commit/a59bda0e9acd1660280dc32ac4a0e732c4148ee4))


### BREAKING CHANGES

* **session:** Session no longer contains API methods out of the box





# [2.0.0-alpha.2](https://github.com/sarakusha/novastar/compare/v1.0.5...v2.0.0-alpha.2) (2022-02-08)


### Bug Fixes

* **connection:** catching data transmission errors ([8e74593](https://github.com/sarakusha/novastar/commit/8e74593453fec98aebb84134d67e833e57a71f36))
* decoding many packets at a time ([6fd7b3f](https://github.com/sarakusha/novastar/commit/6fd7b3f726d5542d498f965881f4ce91d258c6e9))


### Features

* added debug output ([91e891a](https://github.com/sarakusha/novastar/commit/91e891a8103d9c59665353b99a851628bfec3c44))
* added methods to populate the list of known devices ([9d71d33](https://github.com/sarakusha/novastar/commit/9d71d33a7899657b8c7166eb00aa8432e151f2e7))
* added trySend method ([87e5ec4](https://github.com/sarakusha/novastar/commit/87e5ec428c12bf4b9a9bca0a767ccfb3a0f4d1da))
* automatic splitting into chunks when the maximum data size is exceeded ([1198d22](https://github.com/sarakusha/novastar/commit/1198d228a841b84292cd0c7f465c0be655c991b4))
* custom errors ([79df51f](https://github.com/sarakusha/novastar/commit/79df51f5b935ecad0961926c649ed785723eb0b2))
* **session:** expandable session ([e5a3024](https://github.com/sarakusha/novastar/commit/e5a30243585467caba7cb60ce965e57ecac9d9b4))
* some helper functions ([14f504f](https://github.com/sarakusha/novastar/commit/14f504f6fc65d45c13629976ddff0a38a1f3d13d))
* some helper functions ([09acf48](https://github.com/sarakusha/novastar/commit/09acf48e2956d84571e1d8d6541cc61f0add3023))


### Reverts

* 1.0.8 ([a59bda0](https://github.com/sarakusha/novastar/commit/a59bda0e9acd1660280dc32ac4a0e732c4148ee4))


### BREAKING CHANGES

* **session:** Session no longer contains API methods out of the box





# [2.0.0-alpha.1](https://github.com/sarakusha/novastar/compare/v1.0.5...v2.0.0-alpha.1) (2022-02-08)


### Bug Fixes

* **connection:** catching data transmission errors ([8e74593](https://github.com/sarakusha/novastar/commit/8e74593453fec98aebb84134d67e833e57a71f36))
* decoding many packets at a time ([6fd7b3f](https://github.com/sarakusha/novastar/commit/6fd7b3f726d5542d498f965881f4ce91d258c6e9))


### Features

* added debug output ([91e891a](https://github.com/sarakusha/novastar/commit/91e891a8103d9c59665353b99a851628bfec3c44))
* added methods to populate the list of known devices ([9d71d33](https://github.com/sarakusha/novastar/commit/9d71d33a7899657b8c7166eb00aa8432e151f2e7))
* added trySend method ([87e5ec4](https://github.com/sarakusha/novastar/commit/87e5ec428c12bf4b9a9bca0a767ccfb3a0f4d1da))
* automatic splitting into chunks when the maximum data size is exceeded ([1198d22](https://github.com/sarakusha/novastar/commit/1198d228a841b84292cd0c7f465c0be655c991b4))
* custom errors ([79df51f](https://github.com/sarakusha/novastar/commit/79df51f5b935ecad0961926c649ed785723eb0b2))
* **session:** expandable session ([e5a3024](https://github.com/sarakusha/novastar/commit/e5a30243585467caba7cb60ce965e57ecac9d9b4))
* some helper functions ([14f504f](https://github.com/sarakusha/novastar/commit/14f504f6fc65d45c13629976ddff0a38a1f3d13d))
* some helper functions ([09acf48](https://github.com/sarakusha/novastar/commit/09acf48e2956d84571e1d8d6541cc61f0add3023))


### Reverts

* 1.0.8 ([a59bda0](https://github.com/sarakusha/novastar/commit/a59bda0e9acd1660280dc32ac4a0e732c4148ee4))


### BREAKING CHANGES

* **session:** Session no longer contains API methods out of the box





# [2.0.0-alpha.0](https://github.com/sarakusha/novastar/compare/v1.0.5...v2.0.0-alpha.0) (2022-02-08)


### Bug Fixes

* **connection:** catching data transmission errors ([8e74593](https://github.com/sarakusha/novastar/commit/8e74593453fec98aebb84134d67e833e57a71f36))
* decoding many packets at a time ([6fd7b3f](https://github.com/sarakusha/novastar/commit/6fd7b3f726d5542d498f965881f4ce91d258c6e9))


### Features

* added debug output ([5a43159](https://github.com/sarakusha/novastar/commit/5a43159e55c8174be2b77c5bd88f04d4e9a7f156))
* added methods to populate the list of known devices ([bf128a6](https://github.com/sarakusha/novastar/commit/bf128a63b0e4e44d27941cab94878f600fdd4ef7))
* added trySend method ([e15cc80](https://github.com/sarakusha/novastar/commit/e15cc809531e62492ae9a6963e791594f790bf71))
* automatic splitting into chunks when the maximum data size is exceeded ([05b9b55](https://github.com/sarakusha/novastar/commit/05b9b55dea01755e060f8a4e936e00cd3c931f99))
* custom errors ([4de00a7](https://github.com/sarakusha/novastar/commit/4de00a72c28ebf9f07daaeb29e4a0e30a96097e0))
* **session:** expandable session ([f76e614](https://github.com/sarakusha/novastar/commit/f76e614df467d1b685f81b8f7f8d0eef0b479cab))
* some helper functions ([63ca277](https://github.com/sarakusha/novastar/commit/63ca2775155e1c64ecde14ad1c298b1e0f61d6f8))
* some helper functions ([3aa30dd](https://github.com/sarakusha/novastar/commit/3aa30ddbb11f3ba29aab6c518d0c3247b524ddeb))


### Reverts

* 1.0.8 ([84a1dfc](https://github.com/sarakusha/novastar/commit/84a1dfce8ecc4ca1b642c620d2c15046586009f5))


### BREAKING CHANGES

* **session:** Session no longer contains API methods out of the box





## [1.0.8](https://github.com/sarakusha/novastar/compare/v1.0.5...v1.0.8) (2021-06-07)


### Bug Fixes

* decoding many packets at a time ([6fd7b3f](https://github.com/sarakusha/novastar/commit/6fd7b3f726d5542d498f965881f4ce91d258c6e9))
* **connection:** catching data transmission errors ([8e74593](https://github.com/sarakusha/novastar/commit/8e74593453fec98aebb84134d67e833e57a71f36))





## [1.0.7](https://github.com/sarakusha/novastar/compare/v1.0.5...v1.0.7) (2021-05-20)


### Bug Fixes

* **connection:** catching data transmission errors ([8e74593](https://github.com/sarakusha/novastar/commit/8e74593453fec98aebb84134d67e833e57a71f36))





# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### 1.0.1 (2021-05-18)
