import { Weapons } from "../../packet/constants/weapons";
import type { Serializer } from "../../packet/serialize/serialize";
import { Weapon } from "../objects/weapon";

export class CubeGun extends Weapon {
  public constructor(materialId: number = 1) {
    super();

    this.materialId = materialId;
  }

  public get dataType(): number {
    return 4;
  }

  materialId: number = 1;

  public intermediateProcess(packet: Serializer): void {
    packet.string("itemData");

    packet.raw([68]);
    packet.integerU32(1, false);

    packet.string("material");
    packet.raw([98, this.materialId]);
  }

  public get id() {
    return Weapons.CUBE_GUN;
  }
}
