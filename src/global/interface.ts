import { Intermediate } from "../gui/intermediate";
import { PHOTON_FLAGS, PHOTON_HEADERS } from "../packet/constants/photon";
import { Mix } from "../packet/mix/mix";
import { Serializer } from "../packet/serialize/serialize";
import SocketController from "../socket/controller/controller";
import type { Player } from "../world/objects/player";
import { Weapon } from "../world/objects/weapon";
import { Bazooka } from "../world/weapons/bazooka";
import { CentralGun } from "../world/weapons/central-gun";
import { DoublePistol } from "../world/weapons/double-pistol";
import { FlameThrower } from "../world/weapons/flame-thrower";
import { GrowthGun } from "../world/weapons/growth-gun";
import { HealGun } from "../world/weapons/heal-gun";
import { ImpulseGun } from "../world/weapons/impulse-gun";
import { Pistol } from "../world/weapons/pistol";
import { RailGun } from "../world/weapons/rail-gun";
import { Shotgun } from "../world/weapons/shotgun";
import { Shuriken } from "../world/weapons/shuriken";
import { Sword } from "../world/weapons/sword";
import { World } from "../world/world";
import { Timer } from "./lib/timer";

class HackInterface {
  static Communism = class {
    private static Weapons: any = {
      none: Weapon,
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
      World.PlayerManager.players.forEach((player) => {
        if (player.id == World.myPlayer?.id) return;

        callback(player);
      });
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
  };

  static Debug = class {
    static TestBadMsg() {
      const packet = new Serializer(PHOTON_HEADERS.TYPE_4, PHOTON_FLAGS.ACTION);

      packet.string("0xffabc!");

      SocketController.simulateServerPacket(packet.end());
    }
  };

  static Logging = class {
    static log(message: string) {
      const element = document.getElementById("logging");

      if (element) {
        element.innerHTML += `<p style = "font-size: 9px">${message}</p>`;
      }
    }
  };

  static Exploits = class {
    public static RandomHP = new Timer()
      .withTimeout(100)
      .withCallback(() => {
        World.PlayerManager.players.forEach((player) => {
          player.setHealth(Math.random() * 100);
        });
      })
      .build();

    public static InfiniteWeapon = new Timer()
      .withTimeout(1000)
      .withCallback(() => {
        if (!World.myPlayer?.weapon) {
          this.InfiniteWeapon.stop();

          return Intermediate.notification("No weapon equipped");
        }

        World.myPlayer.applyInfiniteWeaponExploit(World.myPlayer.weapon!!);
      })
      .build();

    public static RapidFire = new Timer()
      .withTimeout(200)
      .withCallback(() => {
        if (!World.myPlayer?.weapon) {
          this.RapidFire.stop();

          return Intermediate.notification("No weapon equipped");
        }

        World.myPlayer.applyRapidFireExploit(World.myPlayer.weapon!!);
      })
      .build();

    public static InvisibleHit = new Timer()
      .withTimeout(1000)
      .withCallback(() => {
        if (!World.myPlayer?.weapon) {
          this.InvisibleHit.stop();

          return Intermediate.notification("No weapon equipped");
        }

        World.myPlayer.applyInvisibleHitExploit(World.myPlayer.weapon!!);
      })
      .build();

    public static Immortality() {
      World.myPlayer?.applyImmortalityExploit();
    }
  };

  static Weapons = class {
    static Bazooka() {
      World.myPlayer?.setWeapon(new Bazooka());
    }

    static CentralGun() {
      World.myPlayer?.setWeapon(new CentralGun());
    }

    static DoublePistol() {
      World.myPlayer?.setWeapon(new DoublePistol());
    }

    static FlameThrower() {
      World.myPlayer?.setWeapon(new FlameThrower());
    }

    static GrowthGun() {
      World.myPlayer?.setWeapon(new GrowthGun());
    }

    static HealGun() {
      World.myPlayer?.setWeapon(new HealGun());
    }

    static ImpulseGun() {
      World.myPlayer?.setWeapon(new ImpulseGun());
    }

    static Pistol() {
      World.myPlayer?.setWeapon(new Pistol());
    }

    static RailGun() {
      World.myPlayer?.setWeapon(new RailGun());
    }

    static Shotgun() {
      World.myPlayer?.setWeapon(new Shotgun());
    }

    static Shuriken() {
      World.myPlayer?.setWeapon(new Shuriken());
    }

    static Sword() {
      World.myPlayer?.setWeapon(new Sword());
    }
  };
}

(window as any).HackInterface = HackInterface;

export { HackInterface };
