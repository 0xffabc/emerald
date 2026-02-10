import data from "./data.json";
import tabGui from "../../web/tab-gui/index.html";
import { GUIElement } from "../template/element";

type Path = { [key: string]: { [key: string]: string } } | null;

class TabGui {
  private holder: HTMLElement;
  private tabGuiPath: string = "";

  public constructor() {
    document.documentElement.insertAdjacentHTML("beforeend", tabGui);

    this.holder = document.getElementById("tabgui-holder")!;

    this.renderTabGuiPath();
  }

  private clearTabGui() {
    this.holder.innerHTML = tabGui
      .replace('<div id="tabgui-holder">', "")
      .replace("</div>", "");
  }

  private addTabGuiButton(label: string, onClick: () => void) {
    const content = this.holder.querySelector("#tabgui-content");
    if (!content) return;

    const button = new GUIElement(content as HTMLElement, "button")
      .html(label)
      .style([
        "width: 100%",
        "background: transparent;",
        "border: 1px solid rgb(0, 180, 0);",
        "text-align: center;",
        "margin: 4px 0;",
        "padding: 8px;",
        "color: white !important;",
      ])
      .build();

    button.addEventListener("click", onClick);
  }

  private goBack(path: string[]) {
    this.tabGuiPath = path.slice(0, -1).join("/");
    this.renderTabGuiPath();
  }

  private popPath(): [Path, string[]] {
    let object: Path = data;

    const path = this.tabGuiPath.split("/").filter(Boolean);

    for (const _path of path) {
      if (object && typeof object === "object" && _path in object) {
        object = object[_path] as unknown as Path;
      } else {
        object = null;
        break;
      }
    }

    return [object, path];
  }

  private visitPath(key: string, object: any, path: string[]) {
    const value = object[key];

    if (typeof value === "object") {
      this.tabGuiPath = [...path, key].join("/");

      this.renderTabGuiPath();
    } else if (typeof value === "string") {
      if (value.startsWith("window.")) {
        eval(value);
      }
    }
  }

  private renderTabGuiPath() {
    this.clearTabGui();

    const [object, path] = this.popPath();

    if (path.length > 0) {
      this.addTabGuiButton("Back", this.goBack.bind(this, path));
    }

    if (object && typeof object === "object") {
      const keys = Object.keys(object);

      for (const key of keys) {
        this.addTabGuiButton(key, this.visitPath.bind(this, key, object, path));
      }
    }
  }
}

new TabGui();
