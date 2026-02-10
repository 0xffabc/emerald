type BufferScanResult = { index: number; byte: number }[];

export class Deserializer {
  protected packet: number[];

  protected readonly MAGIC_U32 = 105;

  constructor(packet: number[]) {
    this.packet = packet;
  }

  protected scanBuffer(byte: number): BufferScanResult {
    const scanResult: BufferScanResult = [];

    this.packet.forEach((byte_, index) => {
      if (byte === byte_) {
        scanResult.push({
          index,
          byte,
        });
      }
    });

    return scanResult;
  }

  protected getNthU32(index: number) {
    const integerIndexes: BufferScanResult = this.scanBuffer(this.MAGIC_U32);

    return integerIndexes[index];
  }
}
