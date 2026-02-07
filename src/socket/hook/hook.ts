import SocketController from "../controller/controller";

export default class SocketHook extends EventTarget {
  static EVENT = new Event("socket-hook-init");

  private onmessage?: (event: MessageEvent) => void;
  public socket?: WebSocket;

  constructor() {
    super();
  }

  public withOnMessageHandler(handler: (event: MessageEvent) => void): this {
    this.onmessage = handler;

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
      get() {
        return null;
      },
      set(value: (event: MessageEvent) => void) {
        socketWrapper.socket = this as unknown as WebSocket;

        socketWrapper.socket.addEventListener("message", value);

        SocketController.addWsServer(value.bind(socketWrapper.socket));

        if (typeof socketWrapper.onmessage === "function") {
          socketWrapper.socket.addEventListener(
            "message",
            socketWrapper.onmessage.bind(this),
          );
        }

        socketWrapper.dispatchEvent(SocketHook.EVENT);
      },
    };
  }
}
