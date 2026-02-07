import { Weapons } from "../../packet/constants/weapons";
import { Weapon } from "../objects/weapon";

export class Shotgun extends Weapon {
  constructor() {
    super();
  }

  get id() {
    return Weapons.SHOTGUN;
  }
}
