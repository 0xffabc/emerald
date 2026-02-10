export class GUITemplate {
  protected element: HTMLDivElement = document.createElement("div");

  public constructor() {
    this.element.style = [
      "position: fixed",
      "color: #fff",
      "z-index: 100",
      "font-weight: slim",
      "font-family: 'Roboto'",
      "scrollbar-color: #fff #fff",
      "user-select: none",
    ].join(";");

    this.element.innerHTML += `<link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>`;
  }

  protected setSize(width: number, height: number) {
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
  }

  protected setPosition(x: number, y: number) {
    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
  }
}
