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
  public name: string;
  public x: number;
  public y: number;
  public z: number;
  public weapon?: Weapon;

  public constructor(
    id: number,
    name: string,
    x: number,
    y: number,
    z: number,
    weapon?: Weapon,
  ) {
    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;
    this.z = z;
    this.weapon = weapon;
  }

  /**
   * @name setWeaponInformal
   * @description Sets the weapon without sending a packet.
   * @param weapon The weapon to set.
   */
  public setWeaponInformal(weapon: Weapon) {
    this.weapon = weapon;
  }

  /**
   * @name setWeaponFormal
   * @description Sets the weapon and sends a packet.
   * @param weapon The weapon to set.
   */
  public setWeaponFormal(weapon: Weapon) {
    const packet = weapon.toServerUseBytes(this.id);

    SocketController.simulateServerPacket(Array.from(packet));

    (top as any).console.log("Wrong: ", packet.join(" "));
  }

  /**
   * @name setWeapon
   * @description Sets the weapon and sends a packet.
   * @param weapon The weapon to set.
   */
  public setWeapon(weapon: Weapon) {
    this.setWeaponFormal(weapon);
    this.setWeaponInformal(weapon);
  }

  /**
   * @name setHealth
   * @description Sets the health and sends a packet.
   * @param health The health to set.
   */
  public setHealth(health: number) {
    SocketController.simulateServerPacket([
      243,
      4,
      30,
      0,
      3,
      23,
      105,
      ...to32xConvertedByte(this.id),
      73,
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
      30,
      0,
      3,
      23,
      105,
      ...to32xConvertedByte(this.id),
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

  /**
   * @name applyImmortalityExploit
   * @description Applies the immortality exploit.
   */
  public applyImmortalityExploit() {
    const exploit = new ImmortalityExploit(this.id);

    exploit.send();
  }

  /**
   * @name applyRapidFireExploit
   * @description Applies the rapid fire exploit.
   * @param weapon The weapon to use.
   */
  public applyRapidFireExploit(weapon: Weapon) {
    const exploit = new RapidFireExploit(weapon, this);

    exploit.send();
  }

  /**
   * @name applyInfiniteWeaponExploit
   * @description Applies the infinite weapon exploit.
   * @param weapon The weapon to use.
   */
  public applyInfiniteWeaponExploit(weapon: Weapon) {
    const exploit = new InfiniteWeaponExploit(weapon, this);

    exploit.send();
  }

  /**
   * @name applyInvisibleHitExploit
   * @description Applies the invisible hit exploit.
   * @param weapon The weapon to use.
   */
  public applyInvisibleHitExploit(weapon: Weapon) {
    const exploit = new InvisibleHitExploit(weapon, this);

    exploit.send();
  }

  /**
   * @name applyInfiniteHealthExploit
   * @description Applies the crash health exploit.
   */
  public performCrashMovement() {
    SocketController.simulateServerPacket(Array.from(Mix.movement(this.id)));
  }

  /**
   * @name performOldKick
   * @description Tries to kick the player from the game
   */
  public performOldKick() {
    SocketController.simulateServerPacket(Array.from(Mix.oldKick(this.id)));
  }

  /**
   * @name spawnCrashClone
   * @description Spawns a crash clone.
   */
  public spawnCrashClone() {
    SocketController.simulateServerPacket(
      Array.from(Mix.cube(this.id, this.x, this.y, this.z)),
    );
  }
}
