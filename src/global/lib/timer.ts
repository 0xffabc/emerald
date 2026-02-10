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

  /**
   * @name withCallback
   * @description Adds a callback targeted by the timer
   * @param callback
   * @returns
   */
  public withCallback(callback: () => void) {
    this.callback = callback;

    return this;
  }

  /**
   * @name withTimeout
   * @description Adds a timeout delay to the timer
   * @param timeout
   * @returns
   */
  public withTimeout(timeout: number) {
    this.timeoutDelay = timeout;

    return this;
  }

  /**
   * @name withName
   * @description Adds a name to the timer. Used internally for feature markers
   * @param name
   * @returns
   */
  public withName(name: string) {
    this.timerName = name;

    return this;
  }

  protected loop() {
    if (this.timerStatus === TimerStatus.RUNNING) {
      this.callback?.();

      return setTimeout(this.loop.bind(this), this.timeoutDelay);
    }
  }

  /**
   * @name start
   * @description Starts the timer
   * @returns
   */
  public start() {
    if (this.timerStatus === TimerStatus.RUNNING) return;

    HackInterface.Keybinds.removeBottomText(this.timerName);

    this.timerStatus = TimerStatus.RUNNING;

    let node: HTMLElement | null = null;

    while ((node = document.querySelector(`#${this.timerName}`))) {
      node.remove();
    }

    HackInterface.Keybinds.addBottomText(
      this.timerName,
      `${this.timerName}(RUNNING)`,
    );

    setTimeout(() => this.loop(), this.timeoutDelay);
  }

  /**
   * @name stop
   * @description Stops the timer
   * @returns
   */
  public stop() {
    this.timerStatus = TimerStatus.PAUSED;

    HackInterface.Keybinds.removeBottomText(this.timerName);
  }

  /**
   * @name flip
   * @description Flips the timer status
   * @returns
   */
  public flip() {
    if (this.timerStatus === TimerStatus.RUNNING) {
      this.stop();
    } else {
      this.start();
    }
  }

  /**
   * @name status
   * @description Gets the status of the timer
   * @returns
   */
  public get status() {
    return this.timerStatus === TimerStatus.RUNNING ? "Running" : "Paused";
  }

  /**
   * @name updateStatusTo
   * @description Updates the status of the timer
   * @param id
   * @returns
   */
  public updateStatusTo(id: string) {
    const element = document.getElementById(id);

    if (element) {
      element.textContent = this.status;
    }
  }

  /**
   * @name updateRate
   * @description Updates the rate of the timer
   * @param rate
   * @param id
   * @returns
   */
  public updateRate(rate: string, id: string) {
    this.timeoutDelay = parseInt(rate);

    const element = document.getElementById(id);

    if (element) {
      element.textContent = rate;
    }
  }

  /**
   * @name build
   * @description Builds the timer, but doesn't start it
   * @returns
   */
  public build() {
    if (this.callback && this.timeoutDelay) {
      this.loop();
    } else {
      throw new Error("Timer must have a callback and a timeout delay");
    }

    return this;
  }
}
