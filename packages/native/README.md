# @novastar/native

Structures and APIs in typescript automatically generated from decompiled *NovaStar* .NET libraries.

Go to [API](https://sarakusha.github.io/novastar/modules/_novastar_native.html) documentation.

## Installation

Using npm:

```bash
$ npm install --save @novastar/native@next
```
or yarn:

```bash
$ yarn add @novastar/native@next
```

## Usage

Since the native API contains more than 1000 methods, not all of which you will use,
you can include the methods you need. To do this, create a file `api.ts` and import 
the functionality you need.

// api.ts
```ts
import '@novastar/native/api/ReadDviMode';
import '@novastar/native/api/ReadDviSelect';
import '@novastar/native/api/ReadGlobalBrightness';
import '@novastar/native/api/ReadIsHasDVI';
import '@novastar/native/api/ReadAllBrightnessInfo';
import '@novastar/native/api/ReadSelfTestMode';
import '@novastar/native/api/SetGlobalBrightness';
import '@novastar/native/api/SetSelfTestMode';
import '@novastar/native/api/SetGamma';
import '@novastar/native/api/ReadGamma';
import '@novastar/native/api/ReadScanner_McuProgramRemarks';
import '@novastar/native/api/ReadScanner_FPGAProgramRemarks';
```
Each import adds new methods to the `Session` class and extends `API` interface.
If you import the file `MethodName`, then the async methods `MethodName` and `tryMethodName` will be added.
The first method for reading the value will return a promise with a non-negative number if the response has
a buffer size of 1, 2, or 4 bytes and a promise with a buffer otherwise. If the response is not received,
or the status of the response contains an error, an exception will be rejected.
The second method, which starts with `try`, will return the answer, or `null` if there is none.
In this case, don't forget to check the status `res.ack` of the response .


Then create a `Session.ts` file that will export the resulting type containing all of your selected methods.

// Session.ts
```ts
import { API, Session } from '@novastar/codec';

import './api';

export type SessionAPI = API & Session;

export type { API };
```
Now you can use the resulting type:

```ts
import net from '@novastar/net';
import { SessionAPI } from './Session';

const session: SessionAPI = net.open('192.168.1.40');
await session.SetGamma(0, 0, 0, false, 2.6);
```

Structs and enumerations are also best imported via direct paths.

Enum types end with `Enum` in their names.
Each file contains, in addition to the type, a codec that can be used to validate
and convert input data. See [io-ts](https://www.npmjs.com/package/io-ts) for details.

## Troubleshooting
Not all APIs have been automatically converted from decompiled code. In addition,
the resulting code may contain errors. There is also no description of API,
and we can only guess about its purpose based on its name.
Unfortunately, many names may contain syntax and semantic errors (original names are preserved).
Refer to the decompiled code if in doubt.

## Important note

This repository only contains C# scripts, some wrapping for the generated API, and
the original binary libraries. All useful content is automatically generated from the decompiled
code of binary libraries. You will either have to do it yourself according to the supplied
instructions, or use a [@novastar/native](https://www.npmjs.com/package/@novastar/native) package.
A description of the generated API is also available [here](https://sarakusha.github.io/novastar/modules/_novastar_native.html).

## Development

Install dependencies
```bash
# npm
npm install
# yarn
yarn install
```

To decompile binary libraries, [dotnet](https://dotnet.microsoft.com/en-us/download)
version 5 or higher is required, and the `ilspycmd` package must also be installed.

To check the prerequisites, run the command
```bash
# npm
npm run requirements
# yarn
yarn run requirements
```

To install `ilspycmd` run the command:
```bash
# npm
npm run ilspycmd:install
# yarn
yarn run ilspycmd:install
```
To automatically generate the typescript code, run the command:
```bash
# npm
npm run gen
# yarn
yarn run gen
```
