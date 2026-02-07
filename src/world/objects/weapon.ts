import { PHOTON_FLAGS, PHOTON_HEADERS } from "../../packet/constants/photon";
import { Weapons } from "../../packet/constants/weapons";
import { Serializer } from "../../packet/serialize/serialize";

export class Weapon {
  get id(): number {
    return Weapons.NONE;
  }

  toString(): string {
    return `Weapon(name=${Weapons[this.id] ?? "Unknown"}, id=${this.id})`;
  }

  toServerUseBytes(forPlayer: number): Uint8Array {
    const packet: Serializer = new Serializer(
      PHOTON_HEADERS.TYPE_4,
      PHOTON_FLAGS.ACTION,
    );

    packet.integerU32(forPlayer);
    packet.integerU16(17988, false);

    packet.integerU32(1, false);
    packet.string("currentItem");

    packet.integerU32(1140850688, false);
    packet.integerU32(57868292, false);
    packet.integerU32(1954115685, false);

    packet.integerU32(this.id);

    packet.string("variantId");
    packet.integerU32(0);

    packet.string("updateItemState");
    packet.integerU32(4);

    packet.raw([254]);
    packet.integerU32(0);

    const buffer = packet.end(false);

    return new Uint8Array(buffer);
  }
}
