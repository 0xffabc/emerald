import { HackInterface } from "../../global/interface";
import { GUIElement } from "../template/element";

HackInterface.Keybinds.updateKeybindsList();

HackInterface.Keybinds.keybindManagerElement = new GUIElement(
  document.documentElement,
)
  .style([
    "width: 150px",
    "height: 150px",
    "position: absolute",
    "bottom: 0%",
    "right: 0%",
    "overflow-y: scroll",
    "scrollbar-width: none",
    "z-index: 100",
    "color: white",
    "text-align: center",
    "display: flex",
    "flex-direction: column-reverse",
  ])
  .build() as HTMLDivElement;
