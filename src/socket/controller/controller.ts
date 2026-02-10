import { Intermediate } from "../../gui/intermediate";

export default class SocketController {
  public static sockets: WebSocket[] = [];
  public static wsServers: ((event: any) => void)[] = [];

  /**
   * @name addSocket
   * @description Adds a new socket to the list of sockets.
   * @param socket The WebSocket instance to add.
   */
  public static addSocket(socket: WebSocket) {
    Intermediate.notification(`Socket ${socket.url} connected`);

    this.sockets.push(socket);
  }

  /**
   * @name addWsServer
   * @description Adds a new onmessage listener to the list of servers.
   * @param server The onmessage listener to add.
   */
  public static addWsServer(server: (event: any) => void) {
    this.wsServers.push(server);
  }

  /**
   * @name simulateServerPacket
   * @description Simulates a server packet by calling all registered onmessage listeners.
   * @param packet The packet to simulate.
   */
  public static simulateServerPacket(packet: number[]) {
    this.wsServers.forEach((server) =>
      server({ data: new Uint8Array(packet).buffer }),
    );
  }

  /**
   * @name simulateClientPacket
   * @description Simulates a client packet by sending it to all registered sockets.
   * @param packet The packet to simulate.
   */
  public static simulateClientPacket(packet: number[]) {
    this.sockets.forEach((socket) => socket.send(new Uint8Array(packet)));
  }
}
