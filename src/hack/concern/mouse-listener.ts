export class MouseListener {
  protected mouseDownListeners: Array<(event: MouseEvent) => void> = [];
  protected mouseUpListeners: Array<(event: MouseEvent) => void> = [];

  constructor() {
    const mouseDownListener = (event: MouseEvent) => {
      if (event.button === 0) {
        this.onLeftMouseDown();
      } else if (event.button === 2) {
        this.onRightMouseDown();
      }
    };

    const mouseUpListener = (event: MouseEvent) => {
      if (event.button === 0) {
        this.onLeftMouseUp();
      } else if (event.button === 2) {
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
