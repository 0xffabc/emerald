export class GUIElement {
  public element: HTMLElement;
  public container: HTMLElement;

  public constructor(container: HTMLElement, customName: string = "div") {
    this.element = document.createElement(customName);
    this.container = container;
  }

  /**
   * @name style
   * @description Sets the style of the element.
   * @param styles
   * @returns
   */
  public style(styles: string[]): GUIElement {
    this.element.style = styles.join(";");

    return this;
  }

  /**
   * @name value
   * @description Sets the value of the element.
   * @param value
   * @returns
   */
  public value(value: string): GUIElement {
    (this.element as HTMLInputElement).value = value;

    return this;
  }

  /**
   * @name id
   * @description Sets the id of the element.
   * @param id
   * @returns
   */
  public id(id: string): GUIElement {
    this.element.id = id;

    return this;
  }

  /**
   * @name html
   * @description Sets the HTML content of the element.
   * @param html
   * @returns
   */
  public html(html: string): GUIElement {
    this.element.innerHTML = html;

    return this;
  }

  /**
   * @name build
   * @description Builds the element and appends it to the container.
   * @returns
   */
  public build(): HTMLElement {
    this.container.appendChild(this.element);

    return this.element;
  }
}
