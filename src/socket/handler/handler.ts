import SocketHook from "../hook/hook";
import SocketController from "../controller/controller";
import { World } from "../../world/world";
import { HackInterface } from "../../global/interface";
import { ServerPackets } from "../../packet/constants/server";
import { ReceivePlayers, SpawnRoleStatus } from "./logic/spawn-role-handler";
import { ReceiveCurrentItem } from "./logic/current-item-handler";
import { CrashMessageHandler } from "./logic/crash-message";
import {
  HandlerResponse,
  type HandlerResult,
} from "./handler/response-factory";

export default class SocketHandler extends SocketHook {
  constructor() {
    super();

    this.withOnMessageHandler(this.onMessage.bind(this)).build();

    this.addEventListener("socket-hook-init", () => {
      if (!this.socket) {
        throw new Error("Socket is not initialized");
      }

      SocketController.addSocket(this.socket);
    });
  }

  /**
   * @name handleBacktrackVerdict
   * @description Handles the backtrack verdict packet.
   * delay if backtrack is enabled, otherwise skip.
   * @returns
   */
  private getBacktrackVerdict(): string {
    if (HackInterface.Exploits.BackTrack.Delay > 0) {
      return "delay";
    }

    return "success";
  }

  /**
   * @name onMessage
   * @description Handles every message received from the server.
   * @param message
   * @returns
   */
  public onMessage(message: MessageEvent): HandlerResult {
    if (!message.isTrusted) return HandlerResponse.accept();

    const { data } = message;

    const packet = Array.from(new Uint8Array(data));

    const decodedText = String.fromCharCode.apply(null, packet);

    if (!World.myPlayerInit?.username?.length) {
      ReceivePlayers.initMyPlayerUsernameFromDecodedText(decodedText);
    }

    switch (packet[2]) {
      case ServerPackets.RECEIVE_PLAYERS:
        if (
          ReceivePlayers.handleSpawnRole(packet, decodedText) ===
          SpawnRoleStatus.Handled
        ) {
          this.dispatchEvent(new Event("world-ready"));
        }

        break;
      case ServerPackets.USE_WEAPON:
        const receiver = new ReceiveCurrentItem(
          packet,
          World.myPlayer!,
          World.weaponProvider,
        );

        receiver.handleCurrentItem();

        break;
      case ServerPackets.MOVEMENT:
        return {
          result: this.getBacktrackVerdict(),
          delay: HackInterface.Exploits.BackTrack.Delay,
        };
      default:
        if (/<voffset|<quad/gm.test(decodedText)) {
          return CrashMessageHandler.handleCrashChatMessanges(decodedText);
        }

        break;
    }

    return { result: "accept", delay: 0 };
  }
}
