import type { Player } from "../objects/player";

export class PlayerManager {
  static players: Player[] = [];

  /**
   * @name addPlayer
   * @description Adds a player to the player manager.
   * @param player The player to add.
   */
  public static addPlayer(player: Player) {
    this.players.push(player);
  }

  /**
   * @name removePlayer
   * @description Removes a player from the player manager.
   * @param player The player to remove.
   */
  public static removePlayer(player: Player) {
    const index = this.players.indexOf(player);

    if (index !== -1) {
      this.players.splice(index, 1);
    }
  }

  /**
   * @name getPlayerById
   * @description Gets a player by their ID.
   * @param id The ID of the player to get.
   * @returns The player with the given ID, or undefined if not found.
   */
  public static getPlayerById(id: number): Player | undefined {
    return this.players.find((player) => player.id === id);
  }

  /**
   * @name getPlayerByName
   * @description Gets a player by their name.
   * @param name The name of the player to get.
   * @returns The player with the given name, or undefined if not found.
   */
  public static getPlayerByName(name: string): Player | undefined {
    return this.players.find((player) => player.name === name);
  }
}
