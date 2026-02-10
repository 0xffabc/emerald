export class Intermediate {
  static notificationOffset = 0;

  static notification(text: string) {
    const notif = document.createElement("div");

    notif.innerHTML = text;

    notif.style =
      "width: 300px; text-align: center; height: auto; z-index: 9999; background: rgba(0, 0, 0, 0.5); color: white; font-size: 20px; border-bottom: 2px solid green; position: fixed; right: 0px; word-wrap: break-word;";

    notif.style.top = (this.notificationOffset += 70) + "px";

    document.documentElement.appendChild(notif);

    setTimeout(() => {
      this.notificationOffset = Math.max(this.notificationOffset - 120, 0);

      notif.remove();
    }, 6000);
  }
}
