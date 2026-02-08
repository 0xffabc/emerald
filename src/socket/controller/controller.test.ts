import { expect, test } from "@rstest/core";
import SocketController from "./controller";
import SocketHandler from "../handler/handler";

const hook = new SocketHandler();

test("SocketController should be able to simulate receive", () => {
  const socket = new WebSocket("ws://localhost:8080");

  hook
    .withOnMessageHandler(() => {
      expect(true).toBe(true);
    })
    .build();

  socket.onmessage = ({ data }) => {
    expect(Array.from(data)).toStrictEqual([0, 67]);
  };

  SocketController.simulateServerPacket([0, 67]);
});
