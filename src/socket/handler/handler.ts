import SocketHook from "../hook/hook";
import SocketController from "../controller/controller";

export default class SocketHandler extends SocketHook {
  constructor() {
    super();

    this.withOnMessageHandler(this.onMessage.bind(this)).build();

    this.addEventListener("socket-hook-init", () => {
      SocketController.addSocket(this.socket!!);
    });
  }

  public onMessage(message: MessageEvent) {
    const { data } = message;
    const packet = Array.from(new Uint8Array(data));
  }
}
