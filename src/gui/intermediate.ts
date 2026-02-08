export class Intermediate {
  static notificationOffset = 0;

  static notification(text: string) {
    const notif = document.createElement("div");

    notif.innerHTML = text;

    notif.style =
      "width: 300px; text-align: center; height: 50px; z-index: 9999; background: rgba(0, 0, 0, 0.5); color: white; font-size: 20px; border-bottom: 2px solid green; position: fixed; right: 0px";

    notif.style.top = (this.notificationOffset += 70) + "px";

    document.documentElement.appendChild(notif);

    setTimeout(() => {
      this.notificationOffset -= 120;
      notif.remove();
    }, 2000);
  }
}
