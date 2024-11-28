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

## Wireshark Lua/Dissector ![Logo](https://www.wireshark.org/assets/icons/wireshark-fin.png)

Using Dissector (`./wireshark/novastar.lua`) you can independently examine the novastar exchange protocol using the [Wireshark](https://www.wireshark.org) network protocol analyzer. It will add a new protocol `novastar`, which you can use as a filter and analyze the packet content. I recommend changing the default profile to classic or "no reassembly" to avoid conflicts with current protocols.

Create an ```init.lua``` file in wireshark plugins folder or add the following line to an existing one:

```lua
dofile("/full_path_to/wireshark/novastar.lua")
```

`addressMapping.lua` must be located in the same folder as `novastar.lua`.

On Windows the personal plugin folder is ```%APPDATA%\Wireshark\plugins```.

On Unix-like systems the personal plugin folder is ```~/.local/lib/wireshark/plugins```
![Wireshark](https://github.com/sarakusha/novastar/blob/main/wireshark/Dissector.png)
