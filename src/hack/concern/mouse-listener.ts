export class MouseListener {
  protected mouseDownListeners: Array<(event: MouseEvent) => void> = [];
  protected mouseUpListeners: Array<(event: MouseEvent) => void> = [];

  private readonly LEFT_MOUSE_BUTTON = 0;
  private readonly RIGHT_MOUSE_BUTTON = 2;

  public constructor() {
    const mouseDownListener = (event: MouseEvent) => {
      if (event.button === this.LEFT_MOUSE_BUTTON) {
        this.onLeftMouseDown();
      } else if (event.button === this.RIGHT_MOUSE_BUTTON) {
        this.onRightMouseDown();
      }
    };

    const mouseUpListener = (event: MouseEvent) => {
      if (event.button === this.LEFT_MOUSE_BUTTON) {
        this.onLeftMouseUp();
      } else if (event.button === this.RIGHT_MOUSE_BUTTON) {
        this.onRightMouseUp();
      }
    };

    window.addEventListener("mousedown", mouseDownListener);
    window.addEventListener("mouseup", mouseUpListener);

    this.mouseDownListeners.push(mouseDownListener);
    this.mouseUpListeners.push(mouseUpListener);
  }

  onLeftMouseDown(): void {}
  onRightMouseDown(): void {}

  onLeftMouseUp(): void {}
  onRightMouseUp(): void {}
}
