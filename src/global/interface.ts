import { Intermediate } from "../gui/intermediate";
import { PHOTON_FLAGS, PHOTON_HEADERS } from "../packet/constants/photon";
import { Serializer } from "../packet/serialize/serialize";
import SocketController from "../socket/controller/controller";
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

class HackInterface {
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
    private static infWeaponInterval: number = 0;
    private static rapidFireInterval: number = 0;
    private static invisibleHitInterval: number = 0;

    static infiniteWeapon() {
      if (this.infWeaponInterval > 0) {
        clearInterval(this.infWeaponInterval);

        this.infWeaponInterval = 0;

        return;
      }

      if (!World.myPlayer?.weapon) {
        return Intermediate.notification("No weapon equipped");
      }

      const interval = setInterval(() => {
        World.myPlayer?.applyInfiniteWeaponExploit(World.myPlayer.weapon!!);
      }, 4000);

      this.infWeaponInterval = interval;

      return Intermediate.notification("Infinite weapon exploit activated");
    }

    static rapidFireExploit() {
      if (this.rapidFireInterval > 0) {
        clearInterval(this.rapidFireInterval);

        this.rapidFireInterval = 0;

        return;
      }

      if (!World.myPlayer?.weapon) {
        return Intermediate.notification("No weapon equipped");
      }

      const interval = setInterval(() => {
        if (World.MouseManager.isLeftDown()) {
          World.myPlayer?.applyRapidFireExploit(World.myPlayer.weapon!!);
          SocketController.simulateServerPacket(
            Array.from(
              World.myPlayer?.weapon?.toFireEvent(World.myPlayer.id)!!,
            ),
          );
        }
      }, 400);

      this.rapidFireInterval = interval;

      return Intermediate.notification("Rapid fire exploit activated");
    }

    static invisibleHitExploit() {
      if (this.invisibleHitInterval > 0) {
        clearInterval(this.invisibleHitInterval);

        this.invisibleHitInterval = 0;

        return;
      }

      if (!World.myPlayer?.weapon) {
        return Intermediate.notification("No weapon equipped");
      }

      const interval = setInterval(() => {
        if (World.MouseManager.isLeftDown()) {
          World.myPlayer?.applyInvisibleHitExploit(World.myPlayer.weapon!!);
        }
      }, 700);

      this.invisibleHitInterval = interval;

      return Intermediate.notification("Invisible hit exploit activated");
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
