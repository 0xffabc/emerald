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
    public static BackTrack = class {
      static Delay = 0;
    };

    public static RandomHP = new Timer()
      .withTimeout(100)
      .withName("RandomHP")
      .withCallback(() => {
        World.PlayerManager.players.forEach((player) => {
          player.setHealth(Math.random() * 100);
        });
      })
      .build();

    public static InfiniteWeapon = new Timer()
      .withTimeout(1000)
      .withName("InfiniteWeapon")
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
      .withName("RapidFire")
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
      .withName("InvisibleHit")
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

  static Keybinds = class {
    private static activeKeybinds: Map<string, string> = new Map();

    public static keybindManagerElement: HTMLDivElement;

    private static pullKeybindManagerData() {
      return JSON.parse(localStorage.getItem("keybinds") || "{}");
    }

    public static remove(key: string) {
      const data = this.pullKeybindManagerData();

      delete data[key];

      localStorage.setItem("keybinds", JSON.stringify(data));

      this.updateKeybindsList();
    }

    public static add(key: string, value: string) {
      const data = this.pullKeybindManagerData();

      data[key] = value;

      localStorage.setItem("keybinds", JSON.stringify(data));

      this.updateKeybindsList();
    }

    public static updateKeybindsList() {
      const data = this.pullKeybindManagerData();

      const keybindsList = document.getElementById("keybindsList");

      if (!keybindsList) return;

      keybindsList.innerHTML = "";

      for (const [key, value] of Object.entries(data)) {
        const li = document.createElement("li");

        li.textContent = `${key}: ${value}`;

        keybindsList.appendChild(li);
      }
    }

    public static checkKeybindAndExecute(key: string) {
      const keyToggleInfo = this.activeKeybinds.has(key);

      const data = this.pullKeybindManagerData();

      const keyData = Object.keys(data).find((k) => data[k] === key);

      if (!keyData) return;

      const trash = document.getElementById(key);

      if (trash) {
        this.removeBottomText(key);

        return;
      }

      if (keyToggleInfo) {
        this.activeKeybinds.delete(key);

        const element = document.getElementById(key);

        if (element) {
          element.style.opacity = "0";
          element.style.transform = "translateX(200px)";

          setTimeout(() => {
            element.remove();
          }, 700);
        }
      } else {
        this.activeKeybinds.set(key, "true");

        this.addBottomText(
          key,
          `${key}: ${keyData.split(".").slice(1, 4).join("/")}`,
          /Weapon|Permanent/gim.test(keyData),
        );
      }

      eval("window." + keyData);
    }

    public static addBottomText(
      id: string,
      text: string,
      isTemp: boolean = false,
    ) {
      this.keybindManagerElement.innerHTML += `<p style = "
        margin-bottom: 2px;
        font-size: 8px;
        height: auto;
        border-top: 1px solid;
        border-color: rgb(0, 180, 0);
        background-color: rgba(0, 0, 0, 0.5);
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateX(200px);"
        id = "${id}">${text}</p>`;

      const element = document.getElementById(id)!;

      setTimeout(() => {
        element.style.opacity = "1";
        element.style.transform = "translateX(0)";

        if (isTemp) {
          setTimeout(() => this.removeBottomText(id), 1200);
        }
      }, 20);
    }

    public static removeBottomText(id: string) {
      const element = document.getElementById(id);

      if (element) {
        element.style.opacity = "0";
        element.style.transform = "translateX(200px)";

        setTimeout(() => {
          element.remove();
        }, 700);
      }
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
