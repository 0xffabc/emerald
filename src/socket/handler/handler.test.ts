import { World } from "../../world/world";
import SocketHandler from "./handler";
import { expect, test } from "@rstest/core";

const hook = new SocketHandler();

test("SocketHandler's WebSocket hook should receive players", () => {
  let called = false;

  const socket = new WebSocket("ws://localhost:8080");

  const wrapper = hook
    .withOnMessageHandler(() => {
      called = true;

      const players = World.PlayerManager.players;

      expect(players.length).toBe(3);
      expect(World.myPlayer).toBeDefined();
      expect(World.myPlayer!!.id).toBe(781921);
    })
    .build();

  socket.onmessage = () => {
    wrapper;
  };

  const message = new MessageEvent("message", {
    data: new Uint8Array([
      243,
      1,
      61,
      ..."781921,628190slkdjsdafjvnadfklvn716283"
        .split("")
        .map((e) => e.charCodeAt(0)),
    ]),
  });

  socket.dispatchEvent(message);

  expect(called).toBe(true);
}, 20);
