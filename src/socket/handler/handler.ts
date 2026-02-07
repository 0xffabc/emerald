import SocketHook from "../hook/hook";
import SocketController from "../controller/controller";
import { ServerPackets } from "../../packet/constants/server";
import { World } from "../../world/world";
import { Player } from "../../world/objects/player";

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

    switch (packet[2]) {
      case ServerPackets.RECEIVE_PLAYERS:
        const players = String.fromCharCode.apply(null, packet);

        const gamePlayers = [
          ...new Set(players.match(/(\d+)/gm)!!.filter((e) => e.length == 6)),
        ];

        gamePlayers.forEach((id) => {
          const player = new Player(+id, 0, 0, 0);

          World.PlayerManager.addPlayer(player);
        });

        World.myPlayer = World.PlayerManager.players[0];

        this.dispatchEvent(new Event("world-ready"));

        break;
    }
  }
}
