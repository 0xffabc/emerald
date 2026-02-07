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

        socketWrapper.socket.addEventListener(
          "message",
          new Proxy(value, {
            apply(target, thisArg, args: [event: MessageEvent]) {
              const result = target.apply(thisArg, args);

              socketWrapper.onmessageHandlers.forEach((handler) =>
                handler(args[0]),
              );

              return result;
            },
          }),
        );

        SocketController.addWsServer(value.bind(socketWrapper.socket));

        socketWrapper.dispatchEvent(SocketHook.EVENT);
      },
    };
  }
}
