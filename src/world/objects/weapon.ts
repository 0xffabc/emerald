import { HackInterface } from "../../global/interface";
import { Weapons } from "../../packet/constants/weapons";
import {
  WeaponImplServer,
  WeaponPacketType,
} from "../../packet/impl/weapon/server";
import { Serializer } from "../../packet/serialize/serialize";

export class Weapon {
  public static objectID = 0;

  public get id(): number {
    return Weapons.NONE;
  }

  public get type(): number {
    return 1;
  }

  public get dataType(): number {
    return 3;
  }

  /**
   * @name toString
   * @description Returns a string representation of the weapon.
   * @returns {string} The string representation of the weapon.
   */
  public toString(): string {
    return `Weapon(name=${Weapons[this.id] ?? "Unknown"}, id=${this.id})`;
  }

  public intermediateProcess(_packet: Serializer) {}

  /**
   * @name toFireEvent
   * @description Sends a fire event packet to the server.
   * @param forPlayer The player ID to send the packet to.
   * @returns
   */
  public toFireEvent(forPlayer: number): Uint8Array {
    return new Uint8Array(
      new WeaponImplServer(WeaponPacketType.FIRE_EVENT, forPlayer).serialize(),
    );
  }

  /**
   * @name toServerUseBytes
   * @description Sends a use event packet to the server.
   * @param forPlayer The player ID to send the packet to.
   * @returns
   */
  public toServerUseBytes(forPlayer: number): Uint8Array {
    HackInterface.Keybinds.addBottomText(
      this.toString(),
      `${this.toString()}`,
      true,
    );

    return new Uint8Array(
      new WeaponImplServer(WeaponPacketType.SET_EVENT, forPlayer, {
        intermediateProcess: this.intermediateProcess.bind(this),
        dataType: this.dataType,
        id: this.id,
      }).serialize(),
    );
  }
}
