import SocketHook from "../hook/hook";
import SocketController from "../controller/controller";
import { World } from "../../world/world";
import { Player } from "../../world/objects/player";
import { Intermediate } from "../../gui/intermediate";

export default class SocketHandler extends SocketHook {
  constructor() {
    super();

    this.withOnMessageHandler(this.onMessage.bind(this)).build();

    this.addEventListener("socket-hook-init", () => {
      SocketController.addSocket(this.socket!!);
    });
  }

  public onMessage(message: MessageEvent) {
    const { data } = message;

    const packet = Array.from(new Uint8Array(data));

    const decodedText = String.fromCharCode.apply(null, packet);

    if (decodedText.includes("activeSpawnRole")) {
      const players = String.fromCharCode.apply(null, packet);

      const gamePlayers = [
        ...new Set(players.match(/(\d+)/gm)!!.filter((e) => e.length == 6)),
      ];

      gamePlayers.forEach((id) => {
        const player = new Player(+id, 0, 0, 0);

        World.PlayerManager.addPlayer(player);
      });

      World.myPlayer = World.PlayerManager.players[0];

      Intermediate.notification(`Set myPlayer.PID to ${World.myPlayer.id}`);

      this.dispatchEvent(new Event("world-ready"));
    }
  }
}
