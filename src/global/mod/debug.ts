import { PHOTON_FLAGS, PHOTON_HEADERS } from "../../packet/constants/photon";
import { Serializer } from "../../packet/serialize/serialize";
import SocketController from "../../socket/controller/controller";

export class Debug {
  static TestBadMsg() {
    const packet = new Serializer(PHOTON_HEADERS.TYPE_4, PHOTON_FLAGS.ACTION);

    packet.string("0xffabc!");

    SocketController.simulateServerPacket(packet.end());
  }
}
