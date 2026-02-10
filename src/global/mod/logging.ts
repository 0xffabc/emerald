export class Logging {
  /**
   * @name log
   * @description Logs a message to the logging panel in console's menu
   * @param message Message to log
   */
  public static log(message: string) {
    const element = document.getElementById("logging");

    if (element) {
      element.innerHTML += `<p style = "font-size: 9px">${message}</p>`;
    }
  }
}
