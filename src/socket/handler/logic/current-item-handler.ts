import { WeaponImplServerDeserializer } from "../../../packet/impl/weapon/server";
import type { IWeaponProvider } from "../../../types/weapon-provider";
import type { Player } from "../../../world/objects/player";
import {
  HandlerResponse,
  type HandlerResult,
} from "../handler/response-factory";

export class ReceiveCurrentItem {
  private packet: number[];
  private player: Player;
  private weapons: IWeaponProvider;

  constructor(packet: number[], player: Player, weapons: IWeaponProvider) {
    this.packet = packet;
    this.player = player;
    this.weapons = weapons;
  }

  /**
   * @name handleCurrentItem
   * @description Handles the current item packet.
   * The player ID starts from magic 105 (starts at index 6)
   * The item ID starts from magic 105 too (starts at index 43)
   * @param packet
   * @returns
   */
  public handleCurrentItem(): HandlerResult {
    const deserializer = new WeaponImplServerDeserializer(this.packet);

    const pid = deserializer.getPid();

    if (this.player.id == pid) {
      const itemId = deserializer.getItemId();

      const weaponName = this.weapons.getWeaponNameById(itemId);

      if (!weaponName) {
        return HandlerResponse.accept();
      }

      this.player.setWeaponTo(weaponName);
    }

    return HandlerResponse.accept();
  }
}
