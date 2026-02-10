import { HandlerResponse } from "../handler/response-factory";

export class CrashMessageHandler {
  /**
   * @name handleCrashChatMessanges
   * @description Handles the crash chat messages packet.
   * <voffset=-9999999999999999999999999></alph> crashes the client.
   * Attempting to fix this by rendering every tag useless.
   * @param decodedText
   * @returns
   */
  public static handleCrashChatMessanges(decodedText: string) {
    const reEncoded = decodedText.replaceAll(/</gm, ".");
    const packet = reEncoded.split("").map((e) => e.charCodeAt(0));

    return HandlerResponse.override(packet);
  }
}
