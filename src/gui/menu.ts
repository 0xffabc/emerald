import { HackInterface } from "../global/interface";

const client_menu = document.createElement("div");

client_menu.style = [
  "position: fixed",
  "color: #fff",
  "z-index: 100",
  "top: 50px",
  "left: 900px",
  "font-weight: slim",
  "font-family: 'Roboto'",
  "scrollbar-color: #fff #fff",
  "user-select: none",
].join(";");

client_menu.innerHTML = `
    <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>

    <div style="width: 540px; height: 400px; border-top: 3px solid; background: rgba(0, 0, 0, 0.45); backdrop-filter: blur(5px); border-top: 5px solid rgb(0, 180, 0); color: #fff; position: absolute; top: 25%; right: 25%; font-family: Arial; font-size: 20px">
    <span style="position: absolute; top: 10px; left: 30px; color: #fff">Emerald</span>
    <span style="position: absolute; top: 15px; right: 25px; font-size: 15px" onclick="this.parentElement.parentElement.style.visibility='hidden'">x</span>
    <div style="font-size: 15px; position: absolute; top: 45px; left: 28px">
      <span class = "kogama__" onclick="[...document.querySelectorAll('column')].forEach(e => e.style.display='none'); [...document.querySelectorAll('column')][0].style.display='block'">Weapons</span>
      <span class = "kogama__" onclick="[...document.querySelectorAll('column')].forEach(e => e.style.display='none'); [...document.querySelectorAll('column')][1].style.display='block'">Players</span>
      <span onclick="[...document.querySelectorAll('column')].forEach(e => e.style.display='none'); [...document.querySelectorAll('column')][2].style.display='block'">Game</span>
      <span onclick="[...document.querySelectorAll('column')].forEach(e => e.style.display='none'); [...document.querySelectorAll('column')][3].style.display='block'">Info</span>
      <span onclick="[...document.querySelectorAll('column')].forEach(e => e.style.display='none'); [...document.querySelectorAll('column')][4].style.display='block'">Logging</span>
      <span onclick="[...document.querySelectorAll('column')].forEach(e => e.style.display='none'); [...document.querySelectorAll('column')][5].style.display='block'">Cubes</span>
      <span onclick="[...document.querySelectorAll('column')].forEach(e => e.style.display='none'); [...document.querySelectorAll('column')][6].style.display='block'">Keybinds</span>
    </div>
    <div style="width: 80%; height: 70%; position: absolute; top: 17%; left: 9%; border: 3px solid; border-color: rgba(0, 0, 0, 0.5); overflow-y: scroll; scrollbar-width: none">
      <inner style="position: absolute; top: 5px; left: 5px; font-size: 15px">
        <column>
          <table style = "color: white">
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

        <input type = "range" min = "0" max = "500" value = "150" oninput="window.HackInterface.Exploits.RapidFire.updateRate(this.value, 'rapidFireRate')"> <span> Rapid fire rate/ms: <span id="rapidFireRate">150</span> </span> <br>
        <input type = "range" min = "0" max = "4000" value = "1000" oninput="window.HackInterface.Exploits.InfiniteWeapon.updateRate(this.value, 'infiniteFireRate')"> <span> Infinite fire rate/ms: <span id="infiniteFireRate">1000</span> </span>

        </column>
        <column style="display: none">
        <p style="font-weight: bold;"> Destruction </p>
        <span onclick = "window.HackInterface.Exploits.Immortality()"> Immortality: Physical</span> <br>

       <span onclick = "top.packets.impulse_tool()"> Combat Module</span><br>
       <span onclick = "top.packets.kick_all()"> Crash </span>
       <span onclick = "top.packets.antirfire()"> AntiWeapon </span> <br>

       <span onclick = "window.HackInterface.Exploits.RandomHP.flip(); window.HackInterface.Exploits.RandomHP.updateStatusTo('randomHPStatus')"> Random HP: <span id = "randomHPStatus"> Paused </span> </span> <br>
       <input type = "range" min = "0" max = "4000" value = "1000" oninput="window.HackInterface.Exploits.InfiniteWeapon.updateRate(this.value, 'randomHPRate')"> <span> Infinite fire rate/ms: <span id="randomHPRate">1000</span> </span>

       <p style="font-weight: bold;"> Communism </p>
       <select id = "select" style = "border: 2px solid rgb(0, 180, 0); border-top: 4px solid rgb(0, 180, 0); color: #fff; outline: 0; background: #111111">
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
        Target player[s]?: <select id = "select1" style = "border: 2px solid rgb(0, 180, 0); border-top: 4px solid rgb(0, 180, 0); color: #fff; outline: 0; background: #111111"><option value = "me"> Self </option> <option value = "allme"> All, except self </option> <option value = "all"> All </option> </select>

        <p title="Delays every player's movement packet on your side, so you can hit the enemies on their old positions"> Backtrack Delay:
          <input type = "range" min = "0" max = "1000" value = "0" onchange = "HackInterface.Exploits.BackTrack.Delay = +this.value; document.getElementById('backtrackDelayValue').innerHTML = this.value;">
            <span id = "backtrackDelayValue"> 0 </span>
          </p>
        </column>
        <column style="display: none">
        <span onclick = "top.packets.wasmcache()"> Clear WASM Memory </span><br>
        <span onclick = "if(this.innerHTML=='Flush WebGL Buffer: Off'){this.innerHTML='Flush WebGL Buffer: On';top.fWebgl=true}else{this.innerHTML='Flush WebGL Buffer: Off';top.fWebgl=false}"> Flush WebGL Buffer: Off </span><br>
        <span onclick = "if(this.innerHTML=='Render Type: Default'){this.innerHTML='Render Type: Multiprocessing';top.iRender=true}else if(this.innerHTML=='Render Type: Multiprocessing' && location.href.includes('kogama')){this.innerHTML='Render Type: Skip Frames';top.iRender=false;top.oRender=true}else{this.innerHTML='Render Type: Default';top.iRender=false;top.oRender=false}"> Render Type: Default </span><br>
        <span onclick = "if(this.innerHTML=='Y-Port: Off'){this.innerHTML='Y-Port: On';top.yPort=true}else{this.innerHTML='Y-Port: Off';top.yPort=false}">Y-Port: Off</span><br>

          <div class = 'no_kirka'> Flight Fixed Y: <input type = "range" min = "-100" max = "100" value = "0" onchange = "top.flightY = this.value"> </div> <br>
        Flight Fixed Y state: <input type = "checkbox" onchange = "top.flightY=this.checked"> <br>
        </column>
        <column style="display: none; word-break: break-word">
        Debugging Info <br>
        Last updated player coords: <span id = "playerCoords">(0; 0)</span> <br>
        AntiKick called: <span id = "antikick"> 0 </span> <br>
        Players data: <span id = "players"> </span>
        </column>
        <column id = "logging" style = "display: none; overflow-y: scroll; max-width: 100%; max-height: 100%; width: 100%; height: 100%; scrollbar-width: none; word-break: break-all">

        </column>
        <column style = "display: none; overflow: scroll; max-width: 100%; max-height: 100%; width: 100%; height: 100%; scrollbar-width: none">
        <span style = "font-size: 18px"> Cube-Gun tools </span> <br>
        Cube-Gun material code: <input type = "number" onchange = "top.packets.changeCubeId(this.value); top.packets.cube_gun(playerSid, top.packets.cubeID)" style = "border: 2px solid rgb(0, 180, 0); border-top: 4px solid rgb(0, 180, 0); color: #fff; outline: 0; background: #111111">
        </column>
        <column style="display: none">
          <button onclick = "window.HackInterface.Keybinds.remove(document.getElementById('keybindTarget').value)"> - </button> <button onclick = "window.HackInterface.Keybinds.add(document.getElementById('keybindTarget').value, document.getElementById('lastKeyPressed').innerText)"> + </button> <span id = "lastKeyPressed"> </span>
          For: <select id = "keybindTarget" style = "border: 2px solid rgb(0, 180, 0); border-top: 4px solid rgb(0, 180, 0); color: #fff; outline: 0; background: #111111">
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
          <ul id="keybindsList"></ul>
        </column>
      </inner>
    </div>
    <div style = "position: absolute; bottom: 10px; left: 30px; font-size: 15px">
        Status: Online
    </div>
    <div style = "position: absolute; bottom: 10px; right: 30px; font-size: 15px">
        @0xffabc
    </div>
</div>

    `;

let _offsetX: number = 0;
let offsetY: number = 0;

client_menu.draggable = true;

client_menu.addEventListener("dragstart", (e) => {
  const elementX = parseInt(client_menu.style.left);
  const elementY = parseInt(client_menu.style.top);

  _offsetX = elementX - e.clientX;
  offsetY = elementY - e.clientY;
});

client_menu.addEventListener("dragend", (e) => {
  client_menu.style.top = e.clientY + offsetY + "px";
  client_menu.style.left = e.clientX + _offsetX + "px";
});

window.addEventListener("keyup", (e) => {
  if (e.key === "Insert") {
    if (client_menu.style.visibility === "visible") {
      client_menu.style.visibility = "hidden";
    } else if (client_menu.style.visibility === "hidden") {
      client_menu.style.visibility = "visible";
    } else {
      client_menu.style.visibility = "hidden";
    }
  }

  document.getElementById("lastKeyPressed")!.textContent = `${e.key}`;

  HackInterface.Keybinds.checkKeybindAndExecute(e.key);
});

document.documentElement.append(client_menu);

HackInterface.Keybinds.updateKeybindsList();

const keybinds_menu = document.createElement("div");

keybinds_menu.style = `
  width: 150px;
  height: 150px;
  position: absolute;
  bottom: 0%;
  right: 0%;
  overflow-y: scroll;
  scrollbar-width: none;
  z-index: 100;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column-reverse;
`;

document.documentElement.append(keybinds_menu);

HackInterface.Keybinds.keybindManagerElement = keybinds_menu;
