import { Weapons } from "../../packet/constants/weapons";
import { Weapon } from "../objects/weapon";

export class CentralGun extends Weapon {
  constructor() {
    super();
  }

  get id() {
    return Weapons.CENTRAL_GUN;
  }
}
