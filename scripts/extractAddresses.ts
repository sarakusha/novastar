import fs from 'node:fs';
import path from 'node:path';

import AddressMapping from '../packages/native/generated/AddressMapping';

const stream = fs.createWriteStream(path.resolve(__dirname, '../wireshark/addressMapping.lua'));
const map = new Map<number, string>();

Object.entries(AddressMapping).forEach(([name, value]) => {
  const lowName = name.toLowerCase();
  if (typeof value === 'number' && !lowName.includes('ccupancy') && !lowName.endsWith('index') && value) {
    if (!map.has(value)) {
      map.set(value, name);
    } else {
      map.set(
        value,
        lowName.includes('addr') && !lowName.includes('base')
          ? `${name}, ${map.get(value)}`
          : `${map.get(value)}, ${name}`
      );
    }
  }
});

stream.write('local addresses = {\n');
map.forEach((value, key) => {
  stream.write(
    `  [${key}] = "${value.length > 230 ? `0x${key.toString(16).padStart(8, '0')} ` : ''}${value}",\n`
  );
});
stream.write('}\n\n');
stream.write('return addresses\n');
stream.end();
