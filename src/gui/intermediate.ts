import { GUIElement } from "./template/element";

export class Intermediate {
  public static notificationOffset = 0;

  public static readonly DEFAULT_NOTIFICATION_DURATION = 6000;
  public static readonly NOTIFICATION_OFFSET = 70;

  /**
   * @name notification
   * @description Displays a notification message.
   * @param text The text to display in the notification.
   */
  public static notification(text: string) {
    const notification = new GUIElement(document.documentElement)
      .html(text)
      .style([
        "width: 300px",
        "text-align: center",
        "height: auto",
        "z-index: 9999",
        "background: rgba(0, 0, 0, 0.5)",
        "color: white",
        "font-size: 20px",
        "border-bottom: 2px solid green",
        "position: fixed",
        "right: 0px",
        "word-wrap: break-word",
        `top: ${(this.notificationOffset += this.NOTIFICATION_OFFSET)}px`,
      ])
      .build();

    setTimeout(() => {
      this.notificationOffset = Math.max(
        this.notificationOffset - this.NOTIFICATION_OFFSET,
        0,
      );

      notification.remove();
    }, this.DEFAULT_NOTIFICATION_DURATION);
  }
}
