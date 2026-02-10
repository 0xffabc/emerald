import { HackInterface } from "../../../global/interface";
import { Intermediate } from "../../../gui/intermediate";
import { WeaponMerger } from "../../../hack/exploits/weapon-merger";
import { Weapons } from "../../../packet/constants/weapons";
import { Deserializer } from "../../../packet/deserialize/deserialize";
import { CentralGun } from "../../../world/weapons/central-gun";
import { World } from "../../../world/world";
import { HandlerResponse } from "../handler/response-factory";

export class ReceiveCurrentItem extends Deserializer {
  constructor(packet: number[]) {
    super(packet);
  }

  private readonly INTEGER_LENGTH = 4;

  private byteArrToInteger(byteArr: number[]) {
    return new Uint32Array(new Uint8Array(byteArr.reverse()).buffer)[0];
  }

  private getPidArr() {
    const pidIndex = this.getNthU32(0).index + 1;
    const pid = this.packet.slice(pidIndex, pidIndex + this.INTEGER_LENGTH);

    return pid;
  }

  private getItemIdArr() {
    const itemIdIndex = this.getNthU32(1).index + 1;
    const itemIdArr = this.packet.slice(
      itemIdIndex,
      itemIdIndex + this.INTEGER_LENGTH,
    );

    return new Uint32Array(new Uint8Array(itemIdArr.reverse()).buffer)[0];
  }

  /**
   * @name handleCurrentItem
   * @description Handles the current item packet.
   * The player ID starts from magic 105 (starts at index 6)
   * The item ID starts from magic 105 too (starts at index 43)
   * @param packet
   * @returns
   */
  public handleCurrentItem() {
    const pid = this.getPidArr();

    if (World?.myPlayer?.id! == this.byteArrToInteger(pid)) {
      const itemId = this.getItemIdArr();

      const weaponName = Weapons[itemId];

      if (!weaponName) {
        return HandlerResponse.accept();
      }

      const weaponInstance = WeaponMerger.nameToWeapon(weaponName);

      if (
        HackInterface.Exploits.RapidFire.status == "Paused" ||
        !(weaponInstance instanceof CentralGun)
      ) {
        Intermediate.notification(`${weaponInstance.toString()}`);

        World.myPlayer?.setWeaponInformal(weaponInstance);
      }
    }
  }
}
