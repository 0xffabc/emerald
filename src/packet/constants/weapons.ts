import type { IWeaponProvider } from "../../types/weapon-provider";

export enum Weapons {
  NONE = 5,
  RAIL_GUN = 6,
  SWORD = 8,
  GROWTH_GUN = 62,
  PISTOL = 12,
  CUBE_GUN = 11,
  IMPULSE_GUN = 2,
  BAZOOKA = 4,
  HEAL_GUN = 70,
  DOUBLE_PISTOL = 13,
  CENTRAL_GUN = 1,
  SHOTGUN = 9,
  FLAME_THROWER = 10,
  SHURIKEN = 45,
}

export class WeaponProvider implements IWeaponProvider {
  private weapons: Map<number, string>;

  constructor() {
    this.weapons = new Map<number, string>();
    this.weapons.set(Weapons.NONE, "NONE");
    this.weapons.set(Weapons.RAIL_GUN, "RAIL_GUN");
    this.weapons.set(Weapons.SWORD, "SWORD");
    this.weapons.set(Weapons.GROWTH_GUN, "GROWTH_GUN");
    this.weapons.set(Weapons.PISTOL, "PISTOL");
    this.weapons.set(Weapons.CUBE_GUN, "CUBE_GUN");
    this.weapons.set(Weapons.IMPULSE_GUN, "IMPULSE_GUN");
    this.weapons.set(Weapons.BAZOOKA, "BAZOOKA");
    this.weapons.set(Weapons.HEAL_GUN, "HEAL_GUN");
    this.weapons.set(Weapons.DOUBLE_PISTOL, "DOUBLE_PISTOL");
    this.weapons.set(Weapons.CENTRAL_GUN, "CENTRAL_GUN");
    this.weapons.set(Weapons.SHOTGUN, "SHOTGUN");
    this.weapons.set(Weapons.FLAME_THROWER, "FLAME_THROWER");
    this.weapons.set(Weapons.SHURIKEN, "SHURIKEN");
  }

  getWeaponNameById(id: number): string | undefined {
    return this.weapons.get(id);
  }

  getWeaponIdByName(name: string): number | undefined {
    return Array.from(this.weapons.entries()).find(
      ([_, value]) => value === name,
    )?.[0];
  }
}
