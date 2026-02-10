import { Weapons } from "../../packet/constants/weapons";
import { Weapon } from "../objects/weapon";

export class ImpulseGun extends Weapon {
  public constructor() {
    super();
  }

  public override get type(): number {
    return 2;
  }

  public get id() {
    return Weapons.IMPULSE_GUN;
  }
}
