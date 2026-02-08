const client_menu = document.createElement("div");

client_menu.style = [
  "position: fixed",
  "color: #fff",
  "z-index: 100",
  "top: 100px",
  "left: 500px",
  "font-weight: slim",
  "font-family: 'Roboto'",
  "scrollbar-color: #fff #fff",
  "user-select: none",
].join(";");

client_menu.innerHTML = `
    <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>

    <div style="width: 440px; height: 300px; border-top: 3px solid; background: rgba(0, 0, 0, 0.45); backdrop-filter: blur(5px); border-top: 5px solid rgb(0, 180, 0); color: #fff; position: absolute; top: 25%; right: 25%; font-family: Arial; font-size: 20px">
    <span style="position: absolute; top: 10px; left: 30px; color: #fff">Emerald</span>
    <span style="position: absolute; top: 15px; right: 25px; font-size: 15px" onclick="this.parentElement.style.visibility='hidden'">x</span>
    <div style="font-size: 18px; position: absolute; top: 45px; left: 28px">
      <span class = "kogama__" onclick="[...document.querySelectorAll('column')].forEach(e => e.style.display='none'); [...document.querySelectorAll('column')][0].style.display='block'">Weapons</span>
      <span class = "kogama__" onclick="[...document.querySelectorAll('column')].forEach(e => e.style.display='none'); [...document.querySelectorAll('column')][1].style.display='block'">Players</span>
      <span onclick="[...document.querySelectorAll('column')].forEach(e => e.style.display='none'); [...document.querySelectorAll('column')][2].style.display='block'">Game</span>
      <span onclick="[...document.querySelectorAll('column')].forEach(e => e.style.display='none'); [...document.querySelectorAll('column')][3].style.display='block'">Info</span>
      <span onclick="[...document.querySelectorAll('column')].forEach(e => e.style.display='none'); [...document.querySelectorAll('column')][4].style.display='block'">Logging</span>
      <span onclick="[...document.querySelectorAll('column')].forEach(e => e.style.display='none'); [...document.querySelectorAll('column')][5].style.display='block'">Cubes</span>
    </div>
    <div style="width: 80%; height: 60%; position: absolute; top: 25%; left: 9%; border: 3px solid; border-color: rgba(0, 0, 0, 0.5); overflow-y: scroll; scrollbar-width: none">
      <inner style="position: absolute; top: 5px; left: 5px; font-size: 15px">
        <column>
          <table style = "color: white">
            <tr>
              <td> <span onclick = "top.packets.cube_gun(null, top.packets.cubeID)"> Cube-Gun </span> </td>
              <td> <span onclick = "top.packets.impulse_gun()"> Impulse Gun </span> </td>
              <td> <span onclick = "top.packets.bazooka()"> Bazooka</span> </td>
            </tr>
            <tr>
              <td> <span onclick = "top.packets.pistols()">Double Revoliers </span> </td>
              <td> <span onclick = "top.packets.heal_gun()"> Heal Gun</span> </td>
              <td> <span onclick = "top.packets.central()"> Colt 45</span> </td>
            </tr>
            <tr>
              <td> <span onclick = "top.packets.shotgun()"> Shotgun</span> </td>
              <td> <span onclick = "top.packets.shuriken()"> Shuriken</span> </td>
              <td> <span onclick = "top.packets.rail()"> Rail</span> </td>
            </tr>
            <tr>
              <td> <span onclick = "top.packets.sword()"> Sword </span> </td>
              <td> <span onclick = "top.packets.growthgun()"> Slapgun Spawner </span> </td>
              <td> <span onclick = "top.packets.pistol()"> Pistol </span> </td>
            </tr>
          </table> <br>
        <span onclick = "top.packets.rapidon()"> Rapid Fire ╞ </span>
          <span onclick = "top.packets.invishiton()" style = "transform: translateX(50%)"> Invisible hit ╞ </span>
        <span onclick = "top.packets.infon()"> Infinity ╞</span>
        </column>
        <column style="display: none">
        <span onclick = "top.packets.immortality()"> Buble</span>
       <span onclick = "top.packets.impulse_tool()"> Combat Module</span><br>
       <span onclick = "top.packets.kick_all()"> Crash </span>
       <span onclick = "top.packets.antirfire()"> AntiWeapon </span>
       <span onclick = "top.packets.setHp()"> Random HP </span> <br>
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
           <option value = "rail"> Pistol (1x) </option>
           <option value = "immortality"> Buble (halfly patched) </option>
           <option value = "setScale"> Scalarity </option>
           <option value = "cube"> Spawn Yourself </option>
           <option value = "hpglitch"> Instant HP </option>
       </select> <span onclick = "top.packets.actToAll(document.querySelector('#select').value)"> Execute </span><br>
        Aggressive Crash: <select id = "select1" style = "border: 2px solid rgb(0, 180, 0); border-top: 4px solid rgb(0, 180, 0); color: #fff; outline: 0; background: #111111"></select> <span onclick = "top.packets.crash(document.querySelector('#select1').value)"> Crash! </span><br>
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
        Player coords: <span id = "playerCoords">(0; 0)</span> <br>
        AntiKick called: <span id = "antikick"> 0 </span> <br>
        Players data: <span id = "players"> </span>
        By @0xffabc on YT and discord
        </column>
        <column id = "logging" style = "display: none; overflow-y: scroll; max-width: 100%; max-height: 100%; width: 100%; height: 100%; scrollbar-width: none">

        </column>
        <column style = "display: none; overflow: scroll; max-width: 100%; max-height: 100%; width: 100%; height: 100%; scrollbar-width: none">
        <span style = "font-size: 18px"> Cube-Gun tools </span> <br>
        Cube-Gun material code: <input type = "number" onchange = "top.packets.changeCubeId(this.value); top.packets.cube_gun(playerSid, top.packets.cubeID)" style = "border: 2px solid rgb(0, 180, 0); border-top: 4px solid rgb(0, 180, 0); color: #fff; outline: 0; background: #111111">
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

document.documentElement.append(client_menu);
