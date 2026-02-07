import { ImmortalityExploit } from "../../hack/exploits/immortality";
import { InfiniteWeaponExploit } from "../../hack/exploits/infinite-weapon";
import { RapidFireExploit } from "../../hack/exploits/rapid-fire";
import { to32xConvertedByte } from "../../packet/core/utils";
import SocketController from "../../socket/controller/controller";
import type { Weapon } from "./weapon";

export class Player {
  public id: number;
  public x: number;
  public y: number;
  public weapon?: Weapon;

  constructor(id: number, x: number, y: number, weapon?: Weapon) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.weapon = weapon;
  }

  setWeapon(weapon: Weapon) {
    const packet = weapon.toServerUseBytes(this.id);

    SocketController.simulateServerPacket(Array.from(packet));

    this.weapon = weapon;
  }

  setHealth(health: number) {
    SocketController.simulateServerPacket([
      243,
      4,
      29,
      0,
      3,
      22,
      105,
      ...to32xConvertedByte(this.id),
      70,
      68,
      0,
      0,
      0,
      1,
      115,
      0,
      6,
      104,
      101,
      97,
      108,
      116,
      104,
      102,
      ...new Uint8Array(new Float32Array([health]).buffer).reverse(),
      254,
      105,
      0,
      0,
      0,
      0,
    ]);

    SocketController.simulateServerPacket([
      243,
      4,
      29,
      0,
      3,
      22,
      105,
      ...to32xConvertedByte(this.id),
      70,
      68,
      0,
      0,
      0,
      1,
      115,
      0,
      9,
      109,
      97,
      120,
      72,
      101,
      97,
      108,
      116,
      104,
      105,
      ...new Uint8Array(new Float32Array([health]).buffer).reverse(),
      254,
      105,
      0,
      0,
      0,
      0,
    ]);
  }

  applyImmortalityExploit() {
    const exploit = new ImmortalityExploit(this.id);

    exploit.send();
  }

  applyRapidFireExploit(weapon: Weapon) {
    const exploit = new RapidFireExploit(weapon, this);

    exploit.send();
  }

  applyInfiniteWeaponExploit(weapon: Weapon) {
    const exploit = new InfiniteWeaponExploit(weapon, this);

    exploit.send();
  }
}
