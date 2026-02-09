export enum TimerStatus {
  PAUSED,
  RUNNING,
}

export class Timer {
  private callback?: () => void;
  private timeoutDelay?: number;
  private timerStatus: TimerStatus = TimerStatus.PAUSED;

  public withCallback(callback: () => void) {
    this.callback = callback;

    return this;
  }

  public withTimeout(timeout: number) {
    this.timeoutDelay = timeout;

    return this;
  }

  protected loop() {
    if (this.timerStatus === TimerStatus.RUNNING) {
      this.callback?.();
    }

    return setTimeout(this.loop.bind(this), this.timeoutDelay);
  }

  public start() {
    this.timerStatus = TimerStatus.RUNNING;
  }

  public stop() {
    this.timerStatus = TimerStatus.PAUSED;
  }

  public flip() {
    this.timerStatus =
      this.timerStatus === TimerStatus.RUNNING
        ? TimerStatus.PAUSED
        : TimerStatus.RUNNING;
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
