import { PHOTON_FLAGS, PHOTON_HEADERS } from "../../packet/constants/photon";
import { Serializer } from "../../packet/serialize/serialize";
import SocketController from "../../socket/controller/controller";

class DebugBadPacket extends Serializer {
  constructor() {
    super(PHOTON_HEADERS.TYPE_4, PHOTON_FLAGS.ACTION);
  }

  public serialize() {
    this.string("0xffabc!");

    return this.end();
  }
}

export class Debug {
  static TestBadMsg() {
    const packet = new DebugBadPacket().serialize();

    SocketController.simulateServerPacket(packet);
  }
}
