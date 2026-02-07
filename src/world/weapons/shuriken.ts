import { Weapons } from "../../packet/constants/weapons";
import { Weapon } from "../objects/weapon";

export class Shuriken extends Weapon {
  constructor() {
    super();
  }

  get id() {
    return Weapons.SHURIKEN;
  }
}
