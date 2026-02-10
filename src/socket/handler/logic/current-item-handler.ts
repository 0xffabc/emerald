import { Weapons } from "../../../packet/constants/weapons";
import { Deserializer } from "../../../packet/deserialize/deserialize";
import { World } from "../../../world/world";
import { HandlerResponse } from "../handler/response-factory";

export class ReceiveCurrentItem extends Deserializer {
  constructor(packet: number[]) {
    super(packet);
  }

  private readonly INTEGER_LENGTH = 4;

  private byteArrToInteger(byteArr: number[]) {
    if (byteArr.length !== this.INTEGER_LENGTH) {
      throw new Error("Invalid byte array length");
    }

    return new Uint32Array(new Uint8Array(byteArr.toReversed()).buffer)[0];
  }

  private getPidArr(): number[] {
    const pidIndex = this.getNthU32(0).index + 1;
    const pid = this.packet.slice(pidIndex, pidIndex + this.INTEGER_LENGTH);

    return pid;
  }

  private getItemId(): number {
    const itemIdIndex = this.getNthU32(1).index + 1;
    const itemIdArr = this.packet.slice(
      itemIdIndex,
      itemIdIndex + this.INTEGER_LENGTH,
    );

    return this.byteArrToInteger(itemIdArr);
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

    if (!World.myPlayer?.id) return HandlerResponse.accept();

    if (World.myPlayer.id == this.byteArrToInteger(pid)) {
      const itemId = this.getItemId();

      const weaponName = Weapons[itemId];

      if (!weaponName) {
        return HandlerResponse.accept();
      }

      World.myPlayer.setWeaponTo(weaponName);
    }
  }
}
