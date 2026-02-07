export function to32xConvertedByte(n: number) {
  return new Uint8Array(new Uint32Array([n]).buffer).reverse();
}

export function to16xConvertedByte(n: number) {
  return new Uint8Array(new Uint16Array([n]).buffer).reverse();
}

export function to32xConvertedFloat(n: number) {
  return new Uint8Array(new Float32Array([n]).buffer);
}
