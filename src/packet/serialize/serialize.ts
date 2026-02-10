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

  protected constructor(header: PHOTON_HEADERS, flag: PHOTON_FLAGS) {
    this.#buffer.push(243);

    // 243, 4, 30, 0, 3, 23, 105, 0, 4, 20, 103, 73, 68, 0, 0, 0, 1, 115, 0, 11, 99, 117, 114, 114, 101, 110, 116, 73, 116, 101, 109, 68, 0, 0, 0, 3, 115, 0, 4, 116, 121, 112, 101, 105, 0, 0, 0, 4, 115, 0, 9, 118, 97, 114, 105, 97, 110, 116, 73, 100, 105, 0, 0, 0, 0, 115, 0, 15, 117, 112, 100, 97, 116, 101, 73, 116, 101, 109, 83, 116, 97, 116, 101, 105, 0, 0, 0, 4, 254, 105, 0, 0, 0, 171
    if (flag == PHOTON_FLAGS.ACTION) {
      this.raw([header]);
    }

    this.integerU32(flag, false);
  }

  /**
   * @name raw
   * @description Adds a raw byte array to the buffer
   * @param value The byte array to add
   * @returns
   */
  public raw(value: number[]): Serializer {
    this.#buffer.push(...value);

    return this;
  }

  /**
   * @name integerU32
   * @description Adds a 32-bit unsigned integer to the buffer
   * @param value The integer to add
   * @param flag Whether to add the marker byte
   * @returns
   */
  public integerU32(value: number, flag: boolean = true): Serializer {
    if (flag) {
      this.#buffer.push(SerializerMarkers.U32);
    }

    const bytes = Array.from(to32xConvertedByte(value));

    this.#buffer.push(...bytes);

    return this;
  }

  /**
   * @name integerU16
   * @description Adds a 16-bit unsigned integer to the buffer
   * @param value The integer to add
   * @param flag Whether to add the marker byte
   * @returns
   */
  public integerU16(value: number, flag: boolean = true): Serializer {
    this.#buffer.push(
      ...(flag ? [SerializerMarkers.U32] : []),
      ...to16xConvertedByte(value),
    );

    return this;
  }

  /**
   * @name string
   * @description Adds a string to the buffer
   * @param value The string to add
   * @param flag Whether to add the marker byte
   * @returns
   */
  public string(value: string, flag: boolean = true): Serializer {
    const bytes = new TextEncoder().encode(value);

    if (flag) {
      this.#buffer.push(SerializerMarkers.STRING);
      this.#buffer.push(...to16xConvertedByte(bytes.length));
    }

    this.#buffer.push(...bytes);

    return this;
  }

  /**
   * @name float32
   * @description Adds a 32-bit floating point number to the buffer
   * @param value The number to add
   * @param flag Whether to add the marker byte
   * @returns
   */
  public float32(value: number): Serializer {
    this.#buffer.push(SerializerMarkers.FLOAT32);
    this.#buffer.push(...to32xConvertedFloat(value));

    return this;
  }

  /**
   * @name btrue
   * @description Adds a boolean true value to the buffer
   * @param flag Whether to add the marker byte
   * @returns
   */
  public btrue(): Serializer {
    this.#buffer.push(SerializerMarkers.TRUE);

    return this;
  }

  /**
   * @name bfalse
   * @description Adds a boolean false value to the buffer
   * @param flag Whether to add the marker byte
   * @returns
   */
  public bfalse(): Serializer {
    this.#buffer.push(SerializerMarkers.FALSE);

    return this;
  }

  /**
   * @name end
   * @description Adds an end marker to the buffer
   * @param flag Whether to add the marker byte
   * @returns
   */
  public end(flag: boolean = true): number[] {
    if (flag) {
      this.#buffer.push(SerializerMarkers.END);
    }

    return this.#buffer;
  }
}
