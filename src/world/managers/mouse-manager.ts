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

  public static isLeftDown(): boolean {
    return this.leftMouseDown;
  }

  public static isRightDown(): boolean {
    return this.rightMouseDown;
  }
}
