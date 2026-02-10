export class MouseManager {
  private static leftMouseDown: boolean = false;
  private static rightMouseDown: boolean = false;

  static {
    MouseManager.initMouseDownListeners();
  }

  private static initMouseDownListeners(): void {
    window.addEventListener(
      "mousedown",
      (event) => {
        if (event.button === 0) {
          this.leftMouseDown = true;
        } else if (event.button === 2) {
          this.rightMouseDown = true;
        }
      },
      true,
    );

    window.addEventListener(
      "mouseup",
      (event) => {
        if (event.button === 0) {
          this.leftMouseDown = false;
        } else if (event.button === 2) {
          this.rightMouseDown = false;
        }
      },
      true,
    );
  }

  /**
   * @name isLeftDown
   * @description Checks if the left mouse button is currently down.
   * @returns True if the left mouse button is down, false otherwise.
   */
  public static isLeftDown(): boolean {
    return this.leftMouseDown;
  }

  /**
   * @name isRightDown
   * @description Checks if the right mouse button is currently down.
   * @returns True if the right mouse button is down, false otherwise.
   */
  public static isRightDown(): boolean {
    return this.rightMouseDown;
  }
}
