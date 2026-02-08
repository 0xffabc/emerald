import { Intermediate } from "../../gui/intermediate";
import SocketController from "../controller/controller";

export default class SocketHook extends EventTarget {
  static EVENT = new Event("socket-hook-init");

  private onmessageHandlers: ((event: MessageEvent) => void)[] = [];
  public socket?: WebSocket;

  constructor() {
    super();
  }

  public withOnMessageHandler(handler: (event: MessageEvent) => void): this {
    this.onmessageHandlers.push(handler);

    return this;
  }

  public build() {
    Object.defineProperty(
      WebSocket.prototype,
      "onmessage",
      this.internalOnMessageHandler,
    );

    return this;
  }

  get internalOnMessageHandler() {
    const socketWrapper = this;

    return {
      __proto__: null,
      configurable: true,
      get() {
        return null;
      },
      set(value: (event: MessageEvent) => void) {
        socketWrapper.socket = this as unknown as WebSocket;

        socketWrapper.socket.addEventListener("message", value);
        socketWrapper.socket.addEventListener(
          "message",
          (event: MessageEvent) => {
            socketWrapper.onmessageHandlers.forEach((handler) =>
              handler(event),
            );
          },
        );

        SocketController.addWsServer(value);

        ((top as any).console as Console).log(value.toString());

        Intermediate.notification("Socket initialized");

        socketWrapper.dispatchEvent(SocketHook.EVENT);
      },
    };
  }
}
