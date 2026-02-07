import { Weapons } from "../../packet/constants/weapons";
import { Weapon } from "../objects/weapon";

export class FlameThrower extends Weapon {
  constructor() {
    super();
  }

  get id() {
    return Weapons.FLAME_THROWER;
  }
}
