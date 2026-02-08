import { Intermediate } from "../../gui/intermediate";

export default class SocketController {
  static sockets: WebSocket[] = [];
  static wsServers: ((event: any) => void)[] = [];

  static addSocket(socket: WebSocket) {
    Intermediate.notification(`Socket ${socket.url} connected`);

    this.sockets.push(socket);
  }

  static addWsServer(server: (event: any) => void) {
    this.wsServers.push(server);
  }

  static simulateServerPacket(packet: number[]) {
    this.wsServers.forEach((server) =>
      server({ data: new Uint8Array(packet).buffer }),
    );
  }

  static simulateClientPacket(packet: number[]) {
    this.sockets.forEach((socket) => socket.send(new Uint8Array(packet)));
  }
}
