import { Intermediate } from "../../gui/intermediate";
import { Mix } from "../../packet/mix/mix";
import SocketController from "../../socket/controller/controller";
import type { Player } from "../../world/objects/player";
import { Weapon } from "../../world/objects/weapon";
import { Bazooka } from "../../world/weapons/bazooka";
import { CentralGun } from "../../world/weapons/central-gun";
import { CubeGun } from "../../world/weapons/cube-gun";
import { DoublePistol } from "../../world/weapons/double-pistol";
import { FlameThrower } from "../../world/weapons/flame-thrower";
import { GrowthGun } from "../../world/weapons/growth-gun";
import { HealGun } from "../../world/weapons/heal-gun";
import { ImpulseGun } from "../../world/weapons/impulse-gun";
import { Pistol } from "../../world/weapons/pistol";
import { RailGun } from "../../world/weapons/rail-gun";
import { Shotgun } from "../../world/weapons/shotgun";
import { Shuriken } from "../../world/weapons/shuriken";
import { Sword } from "../../world/weapons/sword";
import { World } from "../../world/world";

export class Communism {
  private static Weapons: any = {
    none: Weapon,
    cube_gun: CubeGun,
    bazooka: Bazooka,
    central: CentralGun,
    pistols: DoublePistol,
    flame: FlameThrower,
    growthgun: GrowthGun,
    heal_gun: HealGun,
    impulse_gun: ImpulseGun,
    pistol: Pistol,
    rail: RailGun,
    shotgun: Shotgun,
    shuriken: Shuriken,
    sword: Sword,
  };

  static globalExecute(callback: (_: Player) => void) {
    const target = (document.querySelector("#select1")! as HTMLSelectElement)
      .value;

    if (target == "all") {
      World.PlayerManager.players.forEach((player) => {
        callback(player);
      });
    } else if (target == "allme") {
      World.PlayerManager.players.forEach((player) => {
        if (player.id == World.myPlayer?.id) return;

        callback(player);
      });
    } else if (target == "me") {
      callback(World.myPlayer!);
    } else {
      const player = World.PlayerManager.getPlayerByName(target);

      if (player) {
        callback(player);
      } else {
        Intermediate.notification(
          "Player not found! I was looking for " + target,
        );
      }
    }
  }

  static marxism(action: string) {
    switch (action) {
      case "immortality":
        this.globalExecute((player) => {
          player.applyImmortalityExploit();
        });
        return;
      case "setScale":
        this.globalExecute((player) => {
          const packet = Mix.enlarged(player.id);

          SocketController.simulateServerPacket(Array.from(packet));
        });
        return;
      case "cube":
        this.globalExecute((player) => {
          const queue = [
            Mix.cube(player.id, 0, 0, 0),
            Mix.oldKick(player.id),
            Mix.movement(player.id),
          ];

          queue.forEach((packet) =>
            SocketController.simulateServerPacket(Array.from(packet)),
          );
        });
        return;
      case "hpGlitch":
        this.globalExecute((player) => {
          player.setHealth(Math.random() * 100);
        });
        return;
    }

    const weaponClass = this.Weapons[action] as Weapon;

    if (weaponClass) {
      const weapon: Weapon = new (weaponClass as any)();

      this.globalExecute((player) => {
        player.setWeapon(weapon);
      });
    }
  }
}
