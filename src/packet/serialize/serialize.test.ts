import { expect, test } from "@rstest/core";
import { Serializer } from "./serialize";
import { PHOTON_FLAGS, PHOTON_HEADERS } from "../constants/photon";

const uint8array = Uint8Array;
const uint32array = Uint32Array;

const GLOBAL_PID = 45;

const to32xConvertedByte = (n: number) => {
  return new uint8array(new uint32array([n]).buffer).reverse();
};

const sword = (pid = GLOBAL_PID): Uint8Array => {
  return new Uint8Array([
    243,
    4,
    29,
    0,
    3,
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
    11,
    99,
    117,
    114,
    114,
    101,
    110,
    116,
    73,
    116,
    101,
    109,
    68,
    0,
    0,
    0,
    3,
    115,
    0,
    4,
    116,
    121,
    112,
    101,
    105,
    0,
    0,
    0,
    8,
    115,
    0,
    9,
    118,
    97,
    114,
    105,
    97,
    110,
    116,
    73,
    100,
    105,
    0,
    0,
    0,
    0,
    115,
    0,
    15,
    117,
    112,
    100,
    97,
    116,
    101,
    73,
    116,
    101,
    109,
    83,
    116,
    97,
    116,
    101,
    105,
    0,
    0,
    0,
    4,
    254,
    105,
    0,
    0,
    0,
    0,
  ]);
};

const betterSword = (pid = GLOBAL_PID): Uint8Array => {
  const packet: Serializer = new Serializer(
    PHOTON_HEADERS.TYPE_4,
    PHOTON_FLAGS.ACTION,
  );

  packet.integerU32(pid);
  packet.integerU16(17988, false); // probably ITEM_WEAPON

  /* It's either 1 or 2, probably 2 for weapons that modify entity properties or
   spawn other items/objects/entities
  */
  packet.integerU32(1, false);
  packet.string("currentItem");

  /* They indicate something. I have no idea what it is */
  packet.integerU32(1140850688, false);
  packet.integerU32(57868292, false);
  packet.integerU32(1954115685, false);

  /* Sword ID */
  packet.integerU32(8);

  packet.string("variantId");
  packet.integerU32(0);

  packet.string("updateItemState");
  packet.integerU32(4);

  /* Trail */
  packet.raw([254]);
  packet.integerU32(0);

  const buffer = packet.end(false);

  return new Uint8Array(buffer);
};

test("Serializer matches expected", () => {
  expect(betterSword()).toEqual(sword());
});
