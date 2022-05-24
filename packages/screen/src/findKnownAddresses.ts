import AddressMapping from '@novastar/native/lib/generated/AddressMapping';

const knownAddresses = new Map<number, string[]>();

Object.entries(AddressMapping).forEach(([key, address]) => {
  if (typeof address === 'number') {
    const value = knownAddresses.get(address);
    if (value !== undefined) value.push(key);
    else knownAddresses.set(address, [key]);
  }
});

export default function findKnownAddresses(address: number): string | undefined {
  return knownAddresses.get(address)?.join(', ');
}
