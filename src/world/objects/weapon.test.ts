import { expect, test } from "@rstest/core";
import { to32xConvertedByte } from "../../packet/core/utils";
import { Weapon } from "./weapon";

const weapon = new Weapon();

const pid = 45;

const event = weapon.toFireEvent(pid);

const oneEvent = new Uint8Array([
  243,
  4,
  30,
  0,
  3,
  23,
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
  8,
  105,
  115,
  70,
  105,
  114,
  105,
  110,
  103,
  111,
  1,
  254,
  105,
  0,
  0,
  0,
  0,
]);

test("weapon.toFireEvent should work properly", () => {
  expect(event).toStrictEqual(oneEvent);
});
