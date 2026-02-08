import { ImmortalityExploit } from "../../hack/exploits/immortality";
import { InfiniteWeaponExploit } from "../../hack/exploits/infinite-weapon";
import { InvisibleHitExploit } from "../../hack/exploits/invisible-hit";
import { RapidFireExploit } from "../../hack/exploits/rapid-fire";
import { to32xConvertedByte } from "../../packet/core/utils";
import { Mix } from "../../packet/mix/mix";
import SocketController from "../../socket/controller/controller";
import type { Weapon } from "./weapon";

export class Player {
  public id: number;
  public x: number;
  public y: number;
  public z: number;
  public weapon?: Weapon;

  public constructor(
    id: number,
    x: number,
    y: number,
    z: number,
    weapon?: Weapon,
  ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.z = z;
    this.weapon = weapon;
  }

  public setWeapon(weapon: Weapon) {
    const packet = weapon.toServerUseBytes(this.id);

    SocketController.simulateServerPacket(Array.from(packet));

    this.weapon = weapon;
  }

  public setHealth(health: number) {
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

  public applyImmortalityExploit() {
    const exploit = new ImmortalityExploit(this.id);

    exploit.send();
  }

  public applyRapidFireExploit(weapon: Weapon) {
    const exploit = new RapidFireExploit(weapon, this);

    exploit.send();
  }

  public applyInfiniteWeaponExploit(weapon: Weapon) {
    const exploit = new InfiniteWeaponExploit(weapon, this);

    exploit.send();
  }

  public applyInvisibleHitExploit(weapon: Weapon) {
    const exploit = new InvisibleHitExploit(weapon, this);

    exploit.send();
  }

  public performCrashMovement() {
    SocketController.simulateServerPacket(Array.from(Mix.movement(this.id)));
  }

  public performOldKick() {
    SocketController.simulateServerPacket(Array.from(Mix.oldKick(this.id)));
  }

  public spawnCrashClone() {
    SocketController.simulateServerPacket(
      Array.from(Mix.cube(this.id, this.x, this.y, this.z)),
    );
  }
}
