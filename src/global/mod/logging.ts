export class Logging {
  static log(message: string) {
    const element = document.getElementById("logging");

    if (element) {
      element.innerHTML += `<p style = "font-size: 9px">${message}</p>`;
    }
  }
}
