import { MouseManager } from "./managers/mouse-manager";
import { PlayerManager } from "./managers/player-manager";
import type { Player } from "./objects/player";

export class World {
  public static myPlayer: Player | null = null;

  public static myPlayerInit = { username: "" };

  public static PlayerManager = PlayerManager;

  public static MouseManager = MouseManager;
}
