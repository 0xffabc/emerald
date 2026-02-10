import { HackInterface } from "../../global/interface";
import { Intermediate } from "../../gui/intermediate";
import SocketController from "../controller/controller";

export default class SocketHook extends EventTarget {
  static EVENT = new Event("socket-hook-init");

  private onmessageHandlers: ((event: MessageEvent) => {
    result: string;
    delay: number;
  })[] = [];
  public socket?: WebSocket;

  constructor() {
    super();
  }

  public withOnMessageHandler(
    handler: (event: MessageEvent) => { result: string; delay: number },
  ): this {
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
          (event: MessageEvent) => {
            const verdicts: Array<{ result: string; delay: number }> = [];

            socketWrapper.onmessageHandlers.forEach((handler) =>
              verdicts.push(handler(event)),
            );

            const delayVerdict = verdicts.find((e) => e.result == "delay");

            if (delayVerdict) {
              setTimeout(() => {
                value(event);
              }, delayVerdict.delay);
            } else {
              value(event);
            }
          },
        );

        SocketController.addWsServer(value);

        Intermediate.notification("Socket initialized");

        socketWrapper.dispatchEvent(SocketHook.EVENT);
      },
    };
  }
}
