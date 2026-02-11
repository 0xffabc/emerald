export type HandlerResult = {
  result: string;
  delay?: number;
  packet?: number[];
};

export class HandlerResponse {
  static accept(): HandlerResult {
    return { result: "accept", delay: 0 };
  }

  static skip(): HandlerResult {
    return { result: "accept", delay: 0 };
  }

  static delay(delay: number): HandlerResult {
    return { result: "delay", delay };
  }

  static override(packet: number[]): HandlerResult {
    return { result: "override", packet };
  }
}
