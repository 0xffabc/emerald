import { HackInterface } from "../global/interface";

import "./tab-gui/tab-gui";
import "./keybinds-gui/keybinds-gui";
import { GUITemplate } from "./template/template";
import { GUIElement } from "./template/element";

import defaultTheme from "./theme/default.json";
import title from "../web/menu/frame/title.html";
import tabBar from "../web/menu/tab-bar.html";
import weapons from "../web/menu/columns/weapons.html";
import players from "../web/menu/columns/players.html";
import combat from "../web/menu/columns/combat.html";
import info from "../web/menu/columns/info.html";
import cubes from "../web/menu/columns/cubes.html";
import keybinds from "../web/menu/columns/keybinds.html";
import theme from "../web/menu/columns/theme.html";

class ClientMenu extends GUITemplate {
  private theme: typeof defaultTheme | undefined;

  private readonly MENU_THEME_KEY = "menu-theme";

  private queryTheme() {
    const theme = localStorage.getItem(this.MENU_THEME_KEY);

    if (theme) {
      this.theme = JSON.parse(theme);
    } else {
      this.theme = defaultTheme;

      localStorage.setItem(this.MENU_THEME_KEY, JSON.stringify(this.theme));
    }
  }

  public constructor() {
    super();

    this.queryTheme();
    this.setPosition(900, 50);
  }

  private createMenuBase() {
    if (!this.theme) throw new Error("Theme not initialized");

    return new GUIElement(this.element)
      .style([
        "width: 540px",
        "height: 400px",
        `border-top: ${this.theme.border.thickness} ${this.theme.border.type} ${this.theme.border.color}`,
        `background: ${this.theme.background}`,
        this.theme.effect,
        `color: ${this.theme.font.color}`,
        "position: absolute",
        "top: 25%",
        "right: 25%",
        `font-family: ${this.theme.font.family}`,
        `font-size: ${this.theme.font.size}px`,
      ])
      .html("")
      .build();
  }

  private createTitleBar(menuBase: HTMLElement): HTMLElement {
    return new GUIElement(menuBase).html(title).build();
  }

  private createTabBar(menuBase: HTMLElement) {
    return new GUIElement(menuBase)
      .style([
        "font-size: 15px",
        "position: absolute",
        "top: 45px",
        "left: 28px",
      ])
      .html(tabBar)
      .build();
  }

  private createMenuBody(menuBase: HTMLElement): HTMLElement {
    return new GUIElement(menuBase)
      .style([
        "width: 80%",
        "height: 70%",
        "position: absolute",
        "top: 17%",
        "left: 9%",
        "border: 3px solid",
        "border-color: rgba(0, 0, 0, 0.5)",
        "overflow-y: scroll",
        "scrollbar-width: none",
      ])
      .build();
  }

  private createInner(menuBody: HTMLElement): HTMLElement {
    return new GUIElement(menuBody)
      .style([
        "position: absolute",
        "top: 5px",
        "left: 5px",
        "font-size: 15px",
        "width: 100%",
        "height: 99%",
      ])
      .build();
  }

  private createFooterStatus(menuBody: HTMLElement): HTMLElement {
    return new GUIElement(menuBody)
      .style([
        "position: absolute",
        "bottom: 10px",
        "left: 30px",
        "font-size: 15px",
      ])
      .html("Status: Online")
      .build();
  }

  private createFooterAuthor(menuBody: HTMLElement): HTMLElement {
    return new GUIElement(menuBody)
      .style([
        "position: absolute",
        "bottom: 10px",
        "right: 30px",
        "font-size: 15px",
      ])
      .html("@0xffabc")
      .build();
  }

  private createWeaponsColumn(inner: HTMLElement) {
    return new GUIElement(inner, "column").html(weapons).build();
  }

  private createPlayersColumn(inner: HTMLElement) {
    return new GUIElement(inner, "column")
      .style(["display: none"])
      .html(players)
      .build();
  }

  private createCombatColumn(inner: HTMLElement) {
    return new GUIElement(inner, "column")
      .style(["display: none"])
      .html(combat)
      .build();
  }

  private createInfoColumn(inner: HTMLElement) {
    return new GUIElement(inner, "column")
      .style(["display: none", "word-break: break-word"])
      .html(info)
      .build();
  }

  private createLoggingColumn(inner: HTMLElement) {
    return new GUIElement(inner, "column")
      .style(["display: none"])
      .id("logging")
      .build();
  }

  private createCubesColumn(inner: HTMLElement) {
    return new GUIElement(inner, "column")
      .style([
        "display: none",
        "overflow: scroll",
        "max-width: 100%",
        "max-height: 100%",
        "width: 100%",
        "height: 100%",
        "scrollbar-width: none",
      ])
      .html(cubes)
      .build();
  }

  private createKeybindsColumn(inner: HTMLElement) {
    return new GUIElement(inner, "column")
      .style(["display: none"])
      .html(keybinds)
      .build();
  }

  private createThemeEditor(inner: HTMLElement) {
    return new GUIElement(inner, "column")
      .style(["display: none; width: 100%; height: 99%;"])
      .html(
        theme
          .replace("{LAST_UPDATE}", Date.now().toString(36))
          .replace("{THEME_CODE}", JSON.stringify(this.theme, null, 2))
          .replace("{MENU_THEME_KEY}", this.MENU_THEME_KEY),
      )
      .build();
  }

  /**
   * @name build
   * @description Builds the menu element.
   * @returns The menu element.
   */
  public build(): HTMLElement {
    const base = this.createMenuBase();

    this.createTitleBar(base);
    this.createTabBar(base);

    const body = this.createMenuBody(base);
    const inner = this.createInner(body);

    this.createFooterAuthor(base);
    this.createFooterStatus(base);

    this.createWeaponsColumn(inner);
    this.createPlayersColumn(inner);
    this.createCombatColumn(inner);
    this.createInfoColumn(inner);
    this.createLoggingColumn(inner);
    this.createCubesColumn(inner);
    this.createKeybindsColumn(inner);
    this.createThemeEditor(inner);

    document.documentElement.append(this.element);

    return this.element;
  }
}

const clientMenu = new ClientMenu().build();

let _offsetX: number = 0;
let offsetY: number = 0;

clientMenu.draggable = true;

clientMenu.addEventListener("dragstart", (e) => {
  const elementX = parseInt(clientMenu.style.left);
  const elementY = parseInt(clientMenu.style.top);

  _offsetX = elementX - e.clientX;
  offsetY = elementY - e.clientY;
});

clientMenu.addEventListener("dragend", (e) => {
  clientMenu.style.top = e.clientY + offsetY + "px";
  clientMenu.style.left = e.clientX + _offsetX + "px";
});

window.addEventListener("keyup", (e) => {
  if (e.key === "Insert") {
    if (clientMenu.style.visibility === "visible") {
      clientMenu.style.visibility = "hidden";
    } else if (clientMenu.style.visibility === "hidden") {
      clientMenu.style.visibility = "visible";
    } else {
      clientMenu.style.visibility = "hidden";
    }
  }

  document.getElementById("lastKeyPressed")!.textContent = `${e.key}`;

  HackInterface.Keybinds.checkKeybindAndExecute(e.key);
});
