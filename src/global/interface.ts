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
