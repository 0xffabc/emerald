import { PHOTON_FLAGS, PHOTON_HEADERS } from "../../packet/constants/photon";
import { Serializer } from "../../packet/serialize/serialize";
import SocketController from "../../socket/controller/controller";

class DebugBadPacket extends Serializer {
  constructor() {
    super(PHOTON_HEADERS.TYPE_4, PHOTON_FLAGS.ACTION);
  }

  /**
   * @name serialize
   * @description Serializes the packet data.
   * @returns Debug test for whether websocket hook is working. The game
   * will print a spurious error if it does.
   */
  public serialize() {
    this.string("0xffabc!");

    return this.end();
  }
}

export class Debug {
  /**
   * @name TestBadMsg
   * @description Sends a debug packet to test the websocket hook.
   */
  public static TestBadMsg() {
    const packet = new DebugBadPacket().serialize();

    SocketController.simulateServerPacket(packet);
  }
}
