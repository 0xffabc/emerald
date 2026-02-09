import data from "./data.json";

const clearTabGui = () => {
  holder.innerHTML = `<style>
    button {
      width: 100%;
      background: transparent;
      border: 1px solid rgb(0, 180, 0);
      text-align: center;
      margin: 4px 0;
      padding: 8px;
      color : white !important;
    }
    button:hover {
      background: rgba(50, 50, 50, 0.1);
    }
  </style>
  <div id="tabgui-header">Emerald Recode</div>
  <div id="tabgui-content"></div>`;
};

const addTabGuiButton = (label: string, onClick: () => void) => {
  const content = holder.querySelector("#tabgui-content");
  if (!content) return;

  const button = document.createElement("button");
  button.textContent = label;
  button.addEventListener("click", onClick);
  content.appendChild(button);
};

const renderTabGuiPath = () => {
  clearTabGui();

  let object: any = data;
  const path = tabGuiPath.split("/").filter(Boolean);

  for (const _path of path) {
    if (object && typeof object === "object" && _path in object) {
      object = object[_path];
    } else {
      object = null;
      break;
    }
  }

  if (path.length > 0) {
    addTabGuiButton("Back", () => {
      tabGuiPath = path.slice(0, -1).join("/");
      renderTabGuiPath();
    });
  }

  if (object && typeof object === "object") {
    const keys = Object.keys(object);

    for (const key of keys) {
      addTabGuiButton(key, () => {
        const value = object[key];
        if (typeof value === "object") {
          tabGuiPath = [...path, key].join("/");

          renderTabGuiPath();
        } else if (typeof value === "string") {
          if (value.startsWith("window.")) {
            eval(value);
          }
        }
      });
    }
  }
};

let tabGuiPath = "";

const holder = document.createElement("div");
holder.id = "tabgui-holder";

holder.style = `
  width: 200px;
  min-height: 100px;
  position: fixed;
  top: 10px;
  right: 10px;
  overflow-y: auto;
  scrollbar-width: none;
  z-index: 100;
  color: white;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid rgb(0, 180, 0);
  padding: 10px;
  font-family: Arial, sans-serif;
`;

holder.id = "tabgui-holder";

document.documentElement.insertAdjacentHTML(
  "beforeend",
  `<style>
  #tabgui-holder {
    opacity: 0.1;
    transition: opacity 0.3s ease-in-out;
    transition-delay: 0.3s;
  }

  #tabgui-holder:hover {
    opacity: 1;
  }
</style>`,
);

document.documentElement.appendChild(holder);

renderTabGuiPath();
