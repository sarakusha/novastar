# novastar.js

This JavaScript library (written in TypeScript) is an attempt, using reverse engineering,
to write an API wrapper for working with [NovaStar](https://www.novastar.tech) devices.
Compatible with Windows, Linux and macOS.

This monorepo consists of the following packages:

- [@novastar/codec](https://github.com/sarakusha/novastar/blob/main/packages/codec/README.md) - core API for communication with devices using *NovaStar* protocol
- [@novastar/serial](https://github.com/sarakusha/novastar/blob/main/packages/serial/README.md) - binding to a serial interface
- [@novastar/net](https://github.com/sarakusha/novastar/blob/main/packages/net/README.md) - binding to a network interface
- [@novastar/native](https://github.com/sarakusha/novastar/blob/main/packages/native/README.md) - structures and APIs in typescript automatically generated from decompiled *NovaStar* .NET libraries
- [@novastar/screen](https://github.com/sarakusha/novastar/blob/main/packages/screen/README.md) - API wrapper
