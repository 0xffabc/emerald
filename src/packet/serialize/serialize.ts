import {
  to16xConvertedByte,
  to32xConvertedByte,
  to32xConvertedFloat,
} from "../core/utils";
import { PHOTON_FLAGS, PHOTON_HEADERS } from "../constants/photon";

enum SerializerMarkers {
  U32 = 105,
  STRING = 115,
  FLOAT32 = 102,
  TRUE = 98,
  FALSE = 111,
  END = 254,
}

export class Serializer {
  #buffer: number[] = [];

  constructor(header: PHOTON_HEADERS, flag: PHOTON_FLAGS) {
    this.#buffer.push(243);

    // 243, 4, 30, 0, 3, 23, 105, 0, 4, 20, 103, 73, 68, 0, 0, 0, 1, 115, 0, 11, 99, 117, 114, 114, 101, 110, 116, 73, 116, 101, 109, 68, 0, 0, 0, 3, 115, 0, 4, 116, 121, 112, 101, 105, 0, 0, 0, 4, 115, 0, 9, 118, 97, 114, 105, 97, 110, 116, 73, 100, 105, 0, 0, 0, 0, 115, 0, 15, 117, 112, 100, 97, 116, 101, 73, 116, 101, 109, 83, 116, 97, 116, 101, 105, 0, 0, 0, 4, 254, 105, 0, 0, 0, 171
    if (flag == PHOTON_FLAGS.ACTION) {
      this.raw([header]);
    }

    this.integerU32(flag, false);
  }

  raw(value: number[]): Serializer {
    this.#buffer.push(...value);

    return this;
  }

  integerU32(value: number, flag: boolean = true): Serializer {
    if (flag) {
      this.#buffer.push(SerializerMarkers.U32);
    }

    const bytes = Array.from(to32xConvertedByte(value));

    this.#buffer.push(...bytes);

    return this;
  }

  integerU16(value: number, flag: boolean = true): Serializer {
    this.#buffer.push(
      ...(flag ? [SerializerMarkers.U32] : []),
      ...to16xConvertedByte(value),
    );

    return this;
  }

  string(value: string): Serializer {
    const bytes = new TextEncoder().encode(value);

    this.#buffer.push(SerializerMarkers.STRING);
    this.#buffer.push(...to16xConvertedByte(bytes.length));
    this.#buffer.push(...bytes);

    return this;
  }

  float32(value: number): Serializer {
    this.#buffer.push(SerializerMarkers.FLOAT32);
    this.#buffer.push(...to32xConvertedFloat(value));

    return this;
  }

  btrue(): Serializer {
    this.#buffer.push(SerializerMarkers.TRUE);

    return this;
  }

  bfalse(): Serializer {
    this.#buffer.push(SerializerMarkers.FALSE);

    return this;
  }

  end(flag: boolean = true): number[] {
    if (flag) {
      this.#buffer.push(SerializerMarkers.END);
    }

    return this.#buffer;
  }
}
