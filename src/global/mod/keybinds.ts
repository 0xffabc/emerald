export class Keybinds {
  private static activeKeybinds: Map<string, string> = new Map();

  public static keybindManagerElement: HTMLDivElement;

  private static pullKeybindManagerData() {
    return JSON.parse(localStorage.getItem("keybinds") || "{}");
  }

  /**
   * @name remove
   * @description Removes a keybind from the keybind manager
   * @param key Key to remove
   */
  public static remove(key: string) {
    const data = this.pullKeybindManagerData();

    delete data[key];

    localStorage.setItem("keybinds", JSON.stringify(data));

    this.updateKeybindsList();
  }

  /**
   * @name add
   * @description Adds a keybind to the keybind manager
   * @param key Key to add
   * @param value
   */
  public static add(key: string, value: string) {
    const data = this.pullKeybindManagerData();

    data[key] = value;

    localStorage.setItem("keybinds", JSON.stringify(data));

    this.updateKeybindsList();
  }

  /**
   * @name updateKeybindsList
   * @description Updates the keybinds list in the UI
   * @returns
   */
  public static updateKeybindsList() {
    const data = this.pullKeybindManagerData();

    const keybindsList = document.getElementById("keybindsList");

    if (!keybindsList) return;

    keybindsList.innerHTML = "";

    for (const [key, value] of Object.entries(data)) {
      const li = document.createElement("li");

      li.textContent = `${key}: ${value}`;

      keybindsList.appendChild(li);
    }
  }

  /**
   * @name checkKeybindAndExecute
   * @description Checks if a keybind is active and executes it
   * @param key Key to check
   * @returns
   */
  public static checkKeybindAndExecute(key: string) {
    const keyToggleInfo = this.activeKeybinds.has(key);

    const data = this.pullKeybindManagerData();

    const keyData = Object.keys(data).find((k) => data[k] === key);

    if (!keyData) return;

    const trash = document.getElementById(key);

    if (trash) {
      this.removeBottomText(key);

      return;
    }

    if (keyToggleInfo) {
      this.activeKeybinds.delete(key);

      const element = document.getElementById(key);

      if (element) {
        element.style.opacity = "0";
        element.style.transform = "translateX(200px)";

        setTimeout(() => {
          element.remove();
        }, 700);
      }
    } else {
      this.activeKeybinds.set(key, "true");

      this.addBottomText(
        key,
        `${key}: ${keyData.split(".").slice(1, 4).join("/")}`,
        /Weapon|Permanent/gim.test(keyData),
      );
    }

    eval("window." + keyData);
  }

  /**
   * @name addBottomText
   * @description Adds a bottom text to the keybind manager, a.k.a the panel in bottom-right
   * corner of the screen
   * @param id ID of the text element
   * @param text
   * @param isTemp
   */
  public static addBottomText(
    id: string,
    text: string,
    isTemp: boolean = false,
  ) {
    this.keybindManagerElement.innerHTML += `<p style = "
      margin-bottom: 2px;
      font-size: 8px;
      height: auto;
      border-top: 1px solid;
      border-color: rgb(0, 180, 0);
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 0.3s ease;
      opacity: 0;
      transform: translateX(200px);"
      id = "${id}">${text}</p>`;

    const element = document.getElementById(id)!;

    setTimeout(() => {
      element.style.opacity = "1";
      element.style.transform = "translateX(0)";

      if (isTemp) {
        setTimeout(() => this.removeBottomText(id), 1200);
      }
    }, 20);
  }

  /**
   * @name removeBottomText
   * @description Removes a bottom text from the keybind manager, a.k.a the panel in bottom-right
   * corner of the screen
   * @param id ID of the text element
   */
  public static removeBottomText(id: string) {
    const element = document.getElementById(id);

    if (element) {
      element.style.opacity = "0";
      element.style.transform = "translateX(200px)";

      setTimeout(() => {
        element.remove();
      }, 700);
    }
  }
}
