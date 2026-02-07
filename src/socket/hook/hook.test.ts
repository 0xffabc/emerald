import { expect, test } from "@rstest/core";
import SocketHook from "./hook";

const hook = new SocketHook();

test("WebSocket hook should work", () => {
  let called = false;

  const socket = new WebSocket("ws://localhost:8080");

  const wrapper = hook
    .withOnMessageHandler(() => {
      called = true;

      expect(wrapper.socket).toBe(socket);
    })
    .build();

  socket.onmessage = () => {};

  socket.dispatchEvent(new Event("message"));

  expect(called).toBe(true);
});
