import { PHOTON_FLAGS, PHOTON_HEADERS } from "../../packet/constants/photon";
import { Weapons } from "../../packet/constants/weapons";
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

  public toString(): string {
    return `Weapon(name=${Weapons[this.id] ?? "Unknown"}, id=${this.id})`;
  }

  public intermediateProcess(_packet: Serializer) {}

  public toFireEvent(forPlayer: number): Uint8Array {
    const packet: Serializer = new Serializer(
      PHOTON_HEADERS.TYPE_4,
      PHOTON_FLAGS.ACTION,
    );

    packet.integerU32(forPlayer);
    packet.integerU16(17988, false);

    packet.integerU32(1, false);
    packet.string("isFiring");

    packet.integerU16(28417, false);

    packet.raw([254]);
    packet.integerU32(0);

    const buffer = packet.end(false);

    return new Uint8Array(buffer);
  }

  public toServerUseBytes(forPlayer: number): Uint8Array {
    const packet: Serializer = new Serializer(
      PHOTON_HEADERS.TYPE_4,
      PHOTON_FLAGS.ACTION,
    );

    packet.integerU32(forPlayer);
    packet.string("ID", false);

    packet.integerU32(this.type, false);
    packet.string("currentItem");

    packet.raw([68]);
    packet.integerU32(this.dataType, false);
    packet.string("type");

    packet.integerU32(this.id);

    packet.string("variantId");
    packet.integerU32(0);

    packet.string("updateItemState");
    packet.integerU32(4);

    this.intermediateProcess(packet);

    packet.raw([254]);
    packet.integerU32(Weapon.objectID++ % 255);

    const buffer = packet.end(false);

    return new Uint8Array(buffer);
  }
}
