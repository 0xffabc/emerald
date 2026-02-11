import { Intermediate } from "../../gui/intermediate";
import SocketController from "../controller/controller";

export default class SocketHook extends EventTarget {
  static EVENT = new Event("socket-hook-init");

  private onmessageHandlers: ((event: MessageEvent) => {
    result: string;
    delay?: number;
    packet?: number[];
  })[] = [];

  public socket?: WebSocket;

  constructor() {
    super();
  }

  /**
   * @name withOnMessageHandler
   * @description Adds a new onmessage handler to the list of handlers.
   * @param handler The handler to add.
   * @returns
   */
  public withOnMessageHandler(
    handler: (event: MessageEvent) => {
      result: string;
      delay?: number;
      packet?: number[];
    },
  ): this {
    this.onmessageHandlers.push(handler);

    return this;
  }

  /**
   * @name build
   * @description Builds the hook.
   * @returns
   */
  public build() {
    Object.defineProperty(
      WebSocket.prototype,
      "onmessage",
      this.internalOnMessageHandler,
    );

    return this;
  }

  /**
   * @name internalOnMessageHandler
   * @description The internal onmessage handler.
   * @returns
   */
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
            const verdicts: Array<{
              result: string;
              delay?: number;
              packet?: number[];
            }> = [];

            socketWrapper.onmessageHandlers.forEach((handler) =>
              verdicts.push(handler(event)),
            );

            const overrideVerdict = verdicts.find(
              (e) => e.result == "override",
            );

            const delayVerdict = verdicts.find((e) => e.result == "delay");

            if (overrideVerdict) {
              value({
                data: overrideVerdict.packet!,
              } as unknown as MessageEvent);
            } else if (delayVerdict) {
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
