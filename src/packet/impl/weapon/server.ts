import { PHOTON_FLAGS, PHOTON_HEADERS } from "../../constants/photon";
import { Serializer } from "../../serialize/serialize";

export enum WeaponPacketType {
  FIRE_EVENT = 0,
  SET_EVENT = 1,
}

type WeaponImplConfig = {
  intermediateProcess?: (packet: Serializer) => void;
  dataType?: number;
  id?: number;
};

export class WeaponImplServer extends Serializer {
  private pid: number;
  private type: WeaponPacketType;
  private config: WeaponImplConfig;

  constructor(
    type: WeaponPacketType,
    pid: number,
    config: WeaponImplConfig = {},
  ) {
    super(PHOTON_HEADERS.TYPE_4, PHOTON_FLAGS.ACTION);

    this.pid = pid;
    this.type = type;
    this.config = config;
  }

  public serialize() {
    switch (this.type) {
      case WeaponPacketType.FIRE_EVENT:
        return this.serializeFireEvent();
      case WeaponPacketType.SET_EVENT:
        return this.serializeSetEvent();
      default:
        throw new Error(`Unknown weapon packet type: ${this.type}`);
    }
  }

  private serializeFireEvent() {
    this.integerU32(this.pid);
    this.integerU16(18756, false);

    this.integerU32(1, false);
    this.string("isFiring");

    this.integerU16(28417, false);

    this.raw([254]);
    this.integerU32(0);

    return this.end(false);
  }

  private serializeSetEvent() {
    this.integerU32(this.pid);
    this.string("ID", false);

    this.integerU32(this.type, false);
    this.string("currentItem");

    this.raw([68]);
    this.integerU32(this.config.dataType!, false);
    this.string("type");

    this.integerU32(this.config.id!);

    this.string("variantId");
    this.integerU32(0);

    this.string("updateItemState");
    this.integerU32(4);

    this.config.intermediateProcess!(this);

    this.raw([254]);
    this.integerU32(~~(Math.random() * 255));

    return this.end(false);
  }
}
