import { Weapons } from "../../../packet/constants/weapons";
import { WeaponImplServerDeserializer } from "../../../packet/impl/weapon/server";
import { World } from "../../../world/world";
import { HandlerResponse } from "../handler/response-factory";

export class ReceiveCurrentItem {
  private packet: number[];

  constructor(packet: number[]) {
    this.packet = packet;
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
    const deserializer = new WeaponImplServerDeserializer(this.packet);

    const pid = deserializer.getPid();

    if (!World.myPlayer?.id) return HandlerResponse.accept();

    if (World.myPlayer.id == pid) {
      const itemId = deserializer.getItemId();

      const weaponName = Weapons[itemId];

      if (!weaponName) {
        return HandlerResponse.accept();
      }

      World.myPlayer.setWeaponTo(weaponName);
    }
  }
}
