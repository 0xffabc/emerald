import type { Player } from "../objects/player";

export class PlayerManager {
  static players: Player[] = [];

  public static addPlayer(player: Player) {
    this.players.push(player);
  }

  public static removePlayer(player: Player) {
    const index = this.players.indexOf(player);

    if (index !== -1) {
      this.players.splice(index, 1);
    }
  }

  public static getPlayerById(id: number): Player | undefined {
    return this.players.find((player) => player.id === id);
  }

  public static getPlayerByName(name: string): Player | undefined {
    return this.players.find((player) => player.name === name);
  }
}
