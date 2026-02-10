import { Bazooka } from "../../world/weapons/bazooka";
import { CentralGun } from "../../world/weapons/central-gun";
import { CubeGun } from "../../world/weapons/cube-gun";
import { DoublePistol } from "../../world/weapons/double-pistol";
import { FlameThrower } from "../../world/weapons/flame-thrower";
import { GrowthGun } from "../../world/weapons/growth-gun";
import { HealGun } from "../../world/weapons/heal-gun";
import { ImpulseGun } from "../../world/weapons/impulse-gun";
import { Pistol } from "../../world/weapons/pistol";
import { RailGun } from "../../world/weapons/rail-gun";
import { Shotgun } from "../../world/weapons/shotgun";
import { Shuriken } from "../../world/weapons/shuriken";
import { Sword } from "../../world/weapons/sword";
import { World } from "../../world/world";

export class Weapons {
  static CubeGunMaterial = 1;

  public static CubeGun(material: number = -1) {
    if (material === -1) {
      material = this.CubeGunMaterial;
    }

    World.myPlayer?.setWeapon(new CubeGun(material));
  }

  public static Bazooka() {
    World.myPlayer?.setWeapon(new Bazooka());
  }

  public static CentralGun() {
    World.myPlayer?.setWeapon(new CentralGun());
  }

  public static DoublePistol() {
    World.myPlayer?.setWeapon(new DoublePistol());
  }

  public static FlameThrower() {
    World.myPlayer?.setWeapon(new FlameThrower());
  }

  public static GrowthGun() {
    World.myPlayer?.setWeapon(new GrowthGun());
  }

  public static HealGun() {
    World.myPlayer?.setWeapon(new HealGun());
  }

  public static ImpulseGun() {
    World.myPlayer?.setWeapon(new ImpulseGun());
  }

  public static Pistol() {
    World.myPlayer?.setWeapon(new Pistol());
  }

  public static RailGun() {
    World.myPlayer?.setWeapon(new RailGun());
  }

  public static Shotgun() {
    World.myPlayer?.setWeapon(new Shotgun());
  }

  public static Shuriken() {
    World.myPlayer?.setWeapon(new Shuriken());
  }

  public static Sword() {
    World.myPlayer?.setWeapon(new Sword());
  }
}
