import { HackInterface } from "../interface";

export enum TimerStatus {
  PAUSED,
  RUNNING,
}

export class Timer {
  private callback?: () => void;
  private timeoutDelay?: number;
  private timerStatus: TimerStatus = TimerStatus.PAUSED;
  private timerName: string =
    "Timer" + Math.random().toString(36).substring(2, 15);

  public withCallback(callback: () => void) {
    this.callback = callback;

    return this;
  }

  public withTimeout(timeout: number) {
    this.timeoutDelay = timeout;

    return this;
  }

  public withName(name: string) {
    this.timerName = name;

    return this;
  }

  protected loop() {
    if (this.timerStatus === TimerStatus.RUNNING) {
      this.callback?.();
    }

    return setTimeout(this.loop.bind(this), this.timeoutDelay);
  }

  public textIDS: string[] = [];

  public start() {
    this.timerStatus = TimerStatus.RUNNING;

    const textID = Math.random().toString(36).substring(2, 4);
    this.textIDS.push(textID);

    HackInterface.Keybinds.addBottomText(
      this.timerName + textID,
      `${this.timerName}(${textID},RUNNING)`,
    );
  }

  public stop() {
    this.timerStatus = TimerStatus.PAUSED;

    for (const id of this.textIDS) {
      HackInterface.Keybinds.removeBottomText(`${this.timerName}${id}`);
    }

    this.textIDS = [];
  }

  public flip() {
    if (this.timerStatus === TimerStatus.RUNNING) {
      this.stop();
    } else {
      this.start();
    }
  }

  public get status() {
    return this.timerStatus === TimerStatus.RUNNING ? "Running" : "Paused";
  }

  public updateStatusTo(id: string) {
    const element = document.getElementById(id);

    if (element) {
      element.textContent = this.status;
    }
  }

  public updateRate(rate: string, id: string) {
    this.timeoutDelay = parseInt(rate);

    const element = document.getElementById(id);

    if (element) {
      element.textContent = rate;
    }
  }

  public build() {
    if (this.callback && this.timeoutDelay) {
      this.loop();
    } else {
      throw new Error("Timer must have a callback and a timeout delay");
    }

    return this;
  }
}
