import { Weapons } from "../../packet/constants/weapons";
import { Weapon } from "../objects/weapon";

export class RailGun extends Weapon {
  constructor() {
    super();
  }

  get id() {
    return Weapons.RAIL_GUN;
  }
}
