import { Communism } from "./mod/communism";
import { Debug } from "./mod/debug";
import { Exploits } from "./mod/exploits";
import { Keybinds } from "./mod/keybinds";
import { Logging } from "./mod/logging";
import { Weapons } from "./mod/weapons";

class HackInterface {
  static Communism = Communism;
  static Debug = Debug;
  static Logging = Logging;
  static Exploits = Exploits;
  static Keybinds = Keybinds;
  static Weapons = Weapons;
}

(window as any).HackInterface = HackInterface;

export { HackInterface };
