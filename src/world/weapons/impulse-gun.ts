import { Weapons } from "../../packet/constants/weapons";
import { Serializer } from "../../packet/serialize/serialize";
import { Weapon } from "../objects/weapon";

export class ImpulseGun extends Weapon {
  public constructor() {
    super();
  }

  public override get type(): number {
    return 2;
  }

  public intermediateProcess(packet: Serializer): void {
    /*packet.string("animation");

    packet.raw([68]);
    packet.integerU32(2, false);

    packet.string("state");
    packet.string("Idle");
    packet.string("timeStamp");

    packet.integerU32(1183055080);*/
  }

  public get id() {
    return Weapons.IMPULSE_GUN;
  }
}
