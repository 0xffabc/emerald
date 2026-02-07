import { Weapons } from "../../packet/constants/weapons";
import { Weapon } from "../objects/weapon";

export class HealGun extends Weapon {
  constructor() {
    super();
  }

  get id() {
    return Weapons.HEAL_GUN;
  }
}
