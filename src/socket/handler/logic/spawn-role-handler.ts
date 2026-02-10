import { HackInterface } from "../../../global/interface";
import { GUIElement } from "../../../gui/template/element";
import { Player } from "../../../world/objects/player";
import { World } from "../../../world/world";

export enum SpawnRoleStatus {
  Skip,
  Handled,
}

export class ReceivePlayers {
  /**
   * @name pollutePlayerList
   * @description Pollutes the player list with players from the given iterator.
   * In format of [fullRegexMatch, username: string, id: string][]
   * Id is guaranteed to be a number.
   * @param playerList
   */
  private static pollutePlayerList(
    playerList: RegExpStringIterator<RegExpExecArray>,
  ) {
    for (const match of playerList) {
      const [_, username, id] = match;

      if (!username || isNaN(+id)) continue;

      const player = new Player(+id, username, 0, 0, 0);

      World.PlayerManager.addPlayer(player);

      const select: HTMLElement | null = document.querySelector("#select1");

      if (select) {
        new GUIElement(select, "option")
          .html(player.name)
          .value(player.name)
          .build();
      }
    }
  }

  /**
   * @name initMyPlayerUsernameFromDecodedText
   * @description Initializes the username of the player from the decoded text.
   * @param decodedText
   */
  public static initMyPlayerUsernameFromDecodedText(decodedText: string) {
    const match = decodedText.match(/\"username":\"(\w+)\"/gim);

    if (match && match.length > 0) {
      World.myPlayerInit = {
        username: match[0].split(':"')[1].split('"')[0],
      };

      HackInterface.Logging.log(
        "Set MyPlayer.Username=" + World.myPlayerInit.username,
      );
    }
  }

  /**
   * @name initMyPlayerFromPlayerJSON
   * @description Initializes the player from the player JSON.
   * @param players
   */
  private static initMyPlayerFromPlayerJSON(players: string) {
    const sidMatches = players.match(/"DefaultPlayModeSpawnRole":(\d{6})/gim)!!;

    const myPlayerSid = sidMatches[0].split(":")[1];

    World.myPlayer = World.PlayerManager.players.find(
      (player) => "" + player.id == myPlayerSid,
    )!!;

    HackInterface.Logging.log(`MyPlayer.PID is ${World.myPlayer.id}`);
  }

  /**
   * @name handleSpawnRole
   * @description Handles the spawn role packet.
   * Adds every player to the player list.
   * @param packet
   * @param decodedText
   */
  public static handleSpawnRole(
    packet: number[],
    decodedText: string,
  ): SpawnRoleStatus {
    const players = String.fromCharCode
      .apply(null, packet)
      .replace(/[^\x20-\x7E\r\n\t{}\[\],:"'0-9a-zA-Z\s\-\.]/g, "");

    const playerList = players.matchAll(
      /"UserName":"([^"]+)".*?"activeSpawnRole":(\d+)/gim,
    )!;

    this.pollutePlayerList(playerList);

    HackInterface.Logging.log(`Received player list: ${playerList.toString()}`);

    document.querySelector("#players")!!.innerHTML = decodedText;

    if (!World.myPlayer) {
      this.initMyPlayerFromPlayerJSON(players);

      return SpawnRoleStatus.Handled;
    }

    return SpawnRoleStatus.Skip;
  }
}
