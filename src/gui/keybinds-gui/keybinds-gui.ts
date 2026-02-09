import { HackInterface } from "../../global/interface";

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
