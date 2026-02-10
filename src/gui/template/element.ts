export class GUIElement {
  public element: HTMLElement;
  public container: HTMLElement;

  public constructor(container: HTMLElement, customName: string = "div") {
    this.element = document.createElement(customName);
    this.container = container;
  }

  public style(styles: string[]): GUIElement {
    this.element.style = styles.join(";");

    return this;
  }

  public id(id: string): GUIElement {
    this.element.id = id;

    return this;
  }

  public html(html: string): GUIElement {
    this.element.innerHTML = html;

    return this;
  }

  public build(): HTMLElement {
    this.container.appendChild(this.element);

    return this.element;
  }
}
