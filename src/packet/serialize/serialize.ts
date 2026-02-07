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

    if (flag == PHOTON_FLAGS.ACTION) {
      this.#buffer.push(header);
    }

    this.#buffer.push(flag);
  }

  raw(value: number[]): Serializer {
    this.#buffer.push(...value);

    return this;
  }

  integerU32(value: number, flag: boolean = true): Serializer {
    if (flag) {
      this.#buffer.push(SerializerMarkers.U32);
    }

    this.#buffer.push(...to32xConvertedByte(value));

    return this;
  }

  integerU16(value: number, flag: boolean = true): Serializer {
    this.#buffer.push(
      ...(flag ? [SerializerMarkers.U32] : []),
      ...to16xConvertedByte(value),
    );

    return this;
  }

  string(value: string, retract: number = 0): Serializer {
    const bytes = new TextEncoder().encode(value);

    this.#buffer.push(SerializerMarkers.STRING);
    this.#buffer.push(...to32xConvertedByte(bytes.length + retract));
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
