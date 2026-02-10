import SocketHook from "../hook/hook";
import SocketController from "../controller/controller";
import { World } from "../../world/world";
import { Player } from "../../world/objects/player";
import { Intermediate } from "../../gui/intermediate";
import { HackInterface } from "../../global/interface";
import { Weapons } from "../../packet/constants/weapons";
import { WeaponMerger } from "../../hack/exploits/weapon-merger";
import { CentralGun } from "../../world/weapons/central-gun";

export default class SocketHandler extends SocketHook {
  constructor() {
    super();

    this.withOnMessageHandler(this.onMessage.bind(this)).build();

    this.addEventListener("socket-hook-init", () => {
      SocketController.addSocket(this.socket!!);
    });
  }

  public onMessage(message: MessageEvent): {
    result: string;
    delay?: number;
    packet?: number[];
  } {
    if (!message.isTrusted) return { result: "accept", delay: 0 };

    const { data } = message;

    const packet = Array.from(new Uint8Array(data));

    const decodedText = String.fromCharCode.apply(null, packet);

    if (!World.myPlayerInit?.username?.length) {
      const match = decodedText.match(/\"username":\"(\w+)\"/gim);

      if (match && match.length > 0) {
        World.myPlayerInit = {
          username: match[0].split(':"')[1].split('"')[0],
        };

        Intermediate.notification(
          `Username match: ${World.myPlayerInit.username}`,
        );

        HackInterface.Logging.log(
          "Set MyPlayer.Username=" + World.myPlayerInit.username,
        );
      }
    }

    if (decodedText.includes("activeSpawnRole")) {
      const players = String.fromCharCode
        .apply(null, packet)
        .replace(/[^\x20-\x7E\r\n\t{}\[\],:"'0-9a-zA-Z\s\-\.]/g, "");

      HackInterface.Logging.log(
        "Received raw player format with corresponding IDs: " + players,
      );

      const playerList = players.matchAll(
        /"UserName":"([^"]+)".*?"activeSpawnRole":(\d+)/gim,
      )!;

      for (const match of playerList) {
        const [_, username, id] = match;

        if (!username || isNaN(+id)) continue;

        const player = new Player(+id, username, 0, 0, 0);

        World.PlayerManager.addPlayer(player);

        try {
          const e = document.createElement("option");

          e.innerHTML = "" + player.name;
          e.value = "" + player.name;

          document.querySelector("#select1")!!.append(e);
        } catch (error) {
          Intermediate.notification(`Error creating option element: ${error}`);
        }
      }

      HackInterface.Logging.log(
        `Received player list: ${playerList.toString()}`,
      );

      document.querySelector("#players")!!.innerHTML = decodedText;

      if (!World.myPlayer) {
        const sidMatches = players.match(
          /"DefaultPlayModeSpawnRole":(\d{6})/gim,
        )!!;

        const myPlayerSid = sidMatches[0].split(":")[1];

        World.myPlayer = World.PlayerManager.players.find(
          (player) => "" + player.id == myPlayerSid,
        )!!;

        Intermediate.notification(`Set MyPlayer.PID=${World.myPlayer.id}`);

        HackInterface.Logging.log(`MyPlayer.PID is ${World.myPlayer.id}`);

        this.dispatchEvent(new Event("world-ready"));
      }
    } else if (packet[2] == 2) {
      return { result: "delay", delay: HackInterface.Exploits.BackTrack.Delay };
    } else if (decodedText.includes("currentItem")) {
      (top as any).console.log("Correct: ", packet.join(" "));

      const pid = packet.slice(7, 11);

      if (
        World?.myPlayer?.id! ==
        new Uint32Array(new Uint8Array(pid.reverse()).buffer)[0]
      ) {
        const itemId = new Uint32Array(
          new Uint8Array(packet.slice(44, 48).reverse()).buffer,
        )[0];

        const weaponName = Weapons[itemId];

        if (!weaponName) {
          return { result: "success", delay: 0 };
        }

        const weaponInstance = WeaponMerger.nameToWeapon(weaponName);

        if (
          HackInterface.Exploits.RapidFire.status == "Paused" ||
          !(weaponInstance instanceof CentralGun)
        ) {
          Intermediate.notification(`${weaponInstance.toString()}`);

          World.myPlayer?.setWeaponInformal(weaponInstance);
        }
      }
    } else if (/<voffset|<quad/gm.test(decodedText)) {
      // <voffset=-9999999999999999999999999></alph> crashes the client
      // fixing this while the developers redesigning their main pages to increase space for ads

      const reEncoded = decodedText.replaceAll(/</gm, ".");
      const packet = reEncoded.split("").map((e) => e.charCodeAt(0));

      return { result: "override", packet };
    }

    return { result: "success", delay: 0 };
  }
}
