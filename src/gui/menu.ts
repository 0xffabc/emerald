import { HackInterface } from "../global/interface";

import "./tab-gui/tab-gui";
import "./keybinds-gui/keybinds-gui";
import { GUITemplate } from "./template/template";
import { GUIElement } from "./template/element";
import defaultTheme from "./theme/default.json";

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
    return new GUIElement(menuBase)
      .html(
        `<span style="position: absolute; top: 10px; left: 30px; color: #fff">Emerald</span>
         <span style="position: absolute; top: 15px; right: 25px; font-size: 15px" onclick="this.parentElement.parentElement.style.visibility='hidden'">x</span>
      `,
      )
      .build();
  }

  private createTabBar(menuBase: HTMLElement) {
    return new GUIElement(menuBase)
      .style([
        "font-size: 15px",
        "position: absolute",
        "top: 45px",
        "left: 28px",
      ])
      .html(
        `<span class = "kogama__" onclick="[...document.querySelectorAll('column')].forEach(e => e.style.display='none'); [...document.querySelectorAll('column')][0].style.display='block'">Weapons</span>
        <span class = "kogama__" onclick="[...document.querySelectorAll('column')].forEach(e => e.style.display='none'); [...document.querySelectorAll('column')][1].style.display='block'">Players</span>
        <span onclick="[...document.querySelectorAll('column')].forEach(e => e.style.display='none'); [...document.querySelectorAll('column')][2].style.display='block'">Combat</span>
        <span onclick="[...document.querySelectorAll('column')].forEach(e => e.style.display='none'); [...document.querySelectorAll('column')][3].style.display='block'">Info</span>
        <span onclick="[...document.querySelectorAll('column')].forEach(e => e.style.display='none'); [...document.querySelectorAll('column')][4].style.display='block'">Logging</span>
        <span onclick="[...document.querySelectorAll('column')].forEach(e => e.style.display='none'); [...document.querySelectorAll('column')][5].style.display='block'">Cubes</span>
        <span onclick="[...document.querySelectorAll('column')].forEach(e => e.style.display='none'); [...document.querySelectorAll('column')][6].style.display='block'">Keybinds</span>
        <span onclick="[...document.querySelectorAll('column')].forEach(e => e.style.display='none'); [...document.querySelectorAll('column')][7].style.display='block'">Theme</span>`,
      )
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
    return new GUIElement(inner, "column")
      .html(
        `<table style = "color: white">
        <tr>
          <td> <span onclick = "window.HackInterface.Weapons.CubeGun()"> Cube-Gun </span> </td>
          <td> <span onclick = "window.HackInterface.Weapons.ImpulseGun()"> Impulse Gun </span> </td>
          <td> <span onclick = "window.HackInterface.Weapons.Bazooka()"> Bazooka</span> </td>
        </tr>
        <tr>
          <td> <span onclick = "window.HackInterface.Weapons.DoublePistol()"> Double Revoliers </span> </td>
          <td> <span onclick = "window.HackInterface.Weapons.HealGun()"> Heal Gun</span> </td>
          <td> <span onclick = "window.HackInterface.Weapons.CentralGun()"> Colt 45</span> </td>
        </tr>
        <tr>
          <td> <span onclick = "window.HackInterface.Weapons.Shotgun()"> Shotgun</span> </td>
          <td> <span onclick = "window.HackInterface.Weapons.Shuriken()"> Shuriken</span> </td>
          <td> <span onclick = "window.HackInterface.Weapons.RailGun()"> Rail</span> </td>
        </tr>
        <tr>
          <td> <span onclick = "window.HackInterface.Weapons.Sword()"> Sword </span> </td>
          <td> <span onclick = "window.HackInterface.Weapons.GrowthGun()"> Slapgun Spawner </span> </td>
          <td> <span onclick = "window.HackInterface.Weapons.Pistol()"> Pistol </span> </td>
        </tr>
      </table> <br>
    <span onclick = "window.HackInterface.Exploits.RapidFire.flip(); window.HackInterface.Exploits.RapidFire.updateStatusTo('rapidFireStatus')"> Rapid Fire: <span id = "rapidFireStatus"> Paused </span> </span> <br>
    <span onclick = "window.HackInterface.Exploits.InfiniteWeapon.flip(); window.HackInterface.Exploits.InfiniteWeapon.updateStatusTo('infiniteFireStatus')"> Infinity: <span id = "infiniteFireStatus"> Paused </span> </span> <br>
    <span onclick = "window.HackInterface.Exploits.InvisibleHit.flip(); window.HackInterface.Exploits.InvisibleHit.updateStatusTo('invisibleHitStatus')"> Invisible Hit: <span id = "invisibleHitStatus"> Paused </span> </span> <br>

    <input type = "range" min = "0" max = "500" value = "150" oninput="window.HackInterface.Exploits.RapidFire.updateRate(this.value, 'rapidFireRate')"> <span> Rapid fire rate/ms: <span id="rapidFireRate">150</span> </span> <br>
    <input type = "range" min = "0" max = "4000" value = "1000" oninput="window.HackInterface.Exploits.InfiniteWeapon.updateRate(this.value, 'infiniteFireRate')"> <span> Infinite fire rate/ms: <span id="infiniteFireRate">1000</span> </span>
    <input type = "range" min = "0" max = "1000" value = "500" oninput="window.HackInterface.Exploits.InvisibleHit.updateRate(this.value, 'invisibleHitRate')"> <span> Invisible hit rate/ms: <span id="invisibleHitRate">500</span> </span>
`,
      )
      .build();
  }

  private createPlayersColumn(inner: HTMLElement) {
    return new GUIElement(inner, "column")
      .style(["display: none"])
      .html(
        `<p style="font-weight: bold;"> Destruction </p>
        <span onclick = "window.HackInterface.Exploits.Immortality()"> Immortality: Physical</span> <br>


       <span onclick = "window.HackInterface.Exploits.RandomHP.flip(); window.HackInterface.Exploits.RandomHP.updateStatusTo('randomHPStatus')"> Random HP: <span id = "randomHPStatus"> Paused </span> </span> <br>
       <input type = "range" min = "0" max = "4000" value = "1000" oninput="window.HackInterface.Exploits.InfiniteWeapon.updateRate(this.value, 'randomHPRate')"> <span> Infinite fire rate/ms: <span id="randomHPRate">1000</span> </span>

       <p style="font-weight: bold;"> Communism </p>
       <select id = "select" style = "color: #fff; outline: 0; background: #111111">
           <option value = "none"> Disspell </option>
           <option value = "cube_gun"> CubeGun </option>
           <option value = "impulse_gun"> Impulse Gun </option>
           <option value = "bazooka"> Bazooka </option>
           <option value = "flame"> Flametower </option>
           <option value = "heal_gun"> Healer Gun </option>
           <option value = "pistols"> Pistols </option>
           <option value = "central"> Central </option>
           <option value = "shuriken"> Shuriken </option>
           <option value = "shotgun"> Shotgun </option>
           <option value = "rail"> Rail Gun </option>
           <option value = "sword"> Sword </option>
           <option value = "growthgun"> Slapgun Spawner </option>
           <option value = "pistol"> Pistol (1x) </option>
           <option value = "immortality"> Immortality (Physical) </option>
           <option value = "setScale"> Scalarity </option>
           <option value = "cube"> Spawn Yourself </option>
           <option value = "hpglitch"> Instant HP </option>
       </select> <span onclick = "window.HackInterface.Communism.marxism(document.querySelector('#select').value)"> Execute </span><br>
        Target player[s]?: <select id = "select1" style = "color: #fff; outline: 0; background: #111111"><option value = "me"> Self </option> <option value = "allme"> All, except self </option> <option value = "all"> All </option> </select>

        <p title="Delays every player's movement packet on your side, so you can hit the enemies on their old positions"> Backtrack Delay:
          <input type = "range" min = "0" max = "1000" value = "0" onchange = "HackInterface.Exploits.BackTrack.Delay = +this.value; document.getElementById('backtrackDelayValue').innerHTML = this.value;">
            <span id = "backtrackDelayValue"> 0 </span>
          </p>`,
      )
      .build();
  }

  private createCombatColumn(inner: HTMLElement) {
    return new GUIElement(inner, "column")
      .style(["display: none"])
      .html(
        `<p> Weapon merger </p>
        <p>
          Target weapon:
          <select id = "select2" style = "color: #fff; outline: 0; background: #111111">
            <option value = "CubeGun"> CubeGun </option>
            <option value = "ImpulseGun"> Impulse Gun </option>
            <option value = "Bazooka"> Bazooka </option>
            <option value = "FlameThrower"> Flamethrower </option>
            <option value = "HealGun"> Healer Gun </option>
            <option value = "DoublePistol"> Pistols </option>
            <option value = "CentralGun"> Central </option>
            <option value = "Shuriken"> Shuriken </option>
            <option value = "Shotgun"> Shotgun </option>
            <option value = "RailGun"> Rail Gun </option>
            <option value = "Sword"> Sword </option>
          </select>
        </p>
        <p>
          Aux weapon:
          <select id = "select3" style = "color: #fff; outline: 0; background: #111111">
            <option value = "CubeGun"> CubeGun </option>
            <option value = "ImpulseGun"> Impulse Gun </option>
            <option value = "Bazooka"> Bazooka </option>
            <option value = "FlameThrower"> Flamethrower </option>
            <option value = "HealGun"> Healer Gun </option>
            <option value = "DoublePistol"> Pistols </option>
            <option value = "CentralGun"> Central </option>
            <option value = "Shuriken"> Shuriken </option>
            <option value = "Shotgun"> Shotgun </option>
            <option value = "RailGun"> Rail Gun </option>
            <option value = "Sword"> Sword </option>
          </select>
        </p>
        <button onclick="HackInterface.Exploits.WeaponMerger.mergeWeapons([document.getElementById('select2').value, document.getElementById('select3').value].join(','))"> Merge </button>
        <button onclick="HackInterface.Exploits.WeaponMerger.unlink()"> Unlink </button>`,
      )
      .build();
  }

  private createInfoColumn(inner: HTMLElement) {
    return new GUIElement(inner, "column")
      .style(["display: none", "word-break: break-word"])
      .html(
        `Debugging Info <br>
        Last updated player coords: <span id = "playerCoords">(0; 0)</span> <br>
        AntiKick called: <span id = "antikick"> 0 </span> <br>
        Players data: <span id = "players"> </span>`,
      )
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
      .html(
        `<span style = "font-size: 18px"> Cube-Gun tools </span> <br>
      Cube-Gun material code: <input type = "number" onchange = "HackInterface.Weapons.CubeGunMaterial=+this.value; HackInterface.Weapons.CubeGun(+this.value)"
        style = "
        color: #fff;
        outline: 0;
        background: #111111;
      ">
      `,
      )
      .build();
  }

  private createKeybindsColumn(inner: HTMLElement) {
    return new GUIElement(inner, "column")
      .style(["display: none"])
      .html(
        `<button onclick = "window.HackInterface.Keybinds.remove(document.getElementById('keybindTarget').value)"> - </button> <button onclick = "window.HackInterface.Keybinds.add(document.getElementById('keybindTarget').value, document.getElementById('lastKeyPressed').innerText)"> + </button> <span id = "lastKeyPressed"> </span>
    For: <select id = "keybindTarget" style = "color: #fff; outline: 0; background: #111111">
      <option value = "HackInterface.Exploits.RapidFire()"> Rapid fire </option>
      <option value = "HackInterface.Exploits.InfiniteWeapon()"> Infinite fire </option>
      <option value = "HackInterface.Exploits.InvisibleHit()"> Invisible hit </option>
      <option value = "HackInterface.Communism.marxism('immortality')"> Immortality (Permanent) </option>
      <option value = "HackInterface.Communism.marxism('Enlarge')"> Enlarge (Permanent) </option>
      <option value = "HackInterface.Communism.marxism('hpGlitch')"> HP Glitch (Until death) </option>
      <option value = "HackInterface.Weapons.CubeGun()"> CubeGun </option>
      <option value = "HackInterface.Weapons.ImpulseGun()"> Impulse Gun </option>
      <option value = "HackInterface.Weapons.Bazooka()"> Bazooka </option>
      <option value = "HackInterface.Weapons.FlameThrower()"> Flametower </option>
      <option value = "HackInterface.Weapons.HealGun()"> Healer Gun </option>
      <option value = "HackInterface.Weapons.DoublePistol()"> Pistols </option>
      <option value = "HackInterface.Weapons.CentralGun()"> Central </option>
      <option value = "HackInterface.Weapons.Shuriken()"> Shuriken </option>
      <option value = "HackInterface.Weapons.Shotgun()"> Shotgun </option>
      <option value = "HackInterface.Weapons.RailGun()"> Rail Gun </option>
      <option value = "HackInterface.Weapons.Sword()"> Sword </option>
      <option value = "HackInterface.Weapons.GrowthGun()"> Slapgun Spawner </option>
      <option value = "HackInterface.Weapons.Pistol()"> Pistol (1x) </option>
    </select>
    <ul id="keybindsList"></ul>`,
      )
      .build();
  }

  private createThemeEditor(inner: HTMLElement) {
    return new GUIElement(inner, "column")
      .style(["display: none; width: 100%; height: 99%;"])
      .html(
        `<textarea id = "themeEditor" style="
          width: calc(100% - 15px);
          height: 87%;
          resize: none;
          outline: none;
          background: transparent;
          border: none;
          backdrop-filter: blur(10px);
          color: white;
          scrollbar-width: none;
        " onchange="localStorage.setItem('${this.MENU_THEME_KEY}', this.value);
        document.getElementById('lastThemeUpdate').textContent = 'Last update: ' + Date.now().toString(36)">${JSON.stringify(this.theme, null, 2)}</textarea>
        <span id = "lastThemeUpdate">Last update: ${Date.now().toString(16)}</span>
        `,
      )
      .build();
  }

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
