import { to16xConvertedByte, to32xConvertedByte } from "../core/utils";

export class Mix {
  /**
   * @name enlarged
   * @description Enlarges the target woID
   * @param pid
   * @returns
   */
  public static enlarged(pid: number) {
    return new Uint8Array([
      243,
      4,
      30,
      0,
      3,
      23,
      105,
      ...to32xConvertedByte(pid),
      73,
      68,
      0,
      0,
      0,
      1,
      115,
      0,
      9,
      109,
      111,
      100,
      105,
      102,
      105,
      101,
      114,
      115,
      68,
      0,
      0,
      0,
      1,
      115,
      0,
      9,
      95,
      69,
      110,
      108,
      97,
      114,
      103,
      101,
      100,
      98,
      0,
      254,
      105,
      0,
      0,
      0,
      0,
    ]);
  }

  /**
   * @name movement
   * @description I have no idea what it does now, but it was sent every time
   * a player left the game
   * @param pid
   * @returns
   */
  public static movement(pid: number) {
    return new Uint8Array([
      243,
      2,
      0,
      7,
      22,
      ...to32xConvertedByte(pid),
      0,
      0,
      0,
      0,
      0,
      0,
    ]);
  }

  /**
   * @name cube
   * @description Supposed to assist spawning cubes
   * @param _pid
   * @param x
   * @param y
   * @param z
   * @param material
   * @returns
   */
  public static cube(
    _pid: number,
    x: number,
    y: number,
    z: number,
    material: number = 4,
  ) {
    return new Uint8Array([
      243,
      4,
      10,
      0,
      3,
      47,
      105,
      ...to32xConvertedByte(1),
      49,
      120,
      0,
      0,
      0,
      material > -1 ? 9 : 7,
      material > -1 ? 2 : 0,
      ...to16xConvertedByte(x),
      ...to16xConvertedByte(y),
      ...to16xConvertedByte(z),
      ...(material ? [7, material] : []),
      254,
      105,
      0,
      0,
      0,
      0,
    ]);
  }

  /**
   * @name oldKick
   * @description Sends a packet to kick a player from the game, worked in 2021
   * @param pid
   * @returns
   */
  public static oldKick(pid: number) {
    return new Uint8Array([
      243,
      2,
      25,
      0,
      2,
      22,
      105,
      ...to32xConvertedByte(pid),
      70,
      68,
      0,
      0,
      0,
      1,
      115,
      0,
      4,
      115,
      105,
      122,
      101,
      102,
      63,
      128,
      0,
      0,
    ]);
  }
}
