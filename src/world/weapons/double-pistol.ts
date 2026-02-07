import { Weapons } from "../../packet/constants/weapons";
import { Weapon } from "../objects/weapon";

export class DoublePistol extends Weapon {
  constructor() {
    super();
  }

  get id() {
    return Weapons.DOUBLE_PISTOL;
  }
}
