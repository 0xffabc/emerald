HTMLElement.prototype.requestFullscreen = new Proxy(
  HTMLElement.prototype.requestFullscreen,
  {
    apply(
      target: (options?: FullscreenOptions | undefined) => Promise<void>,
      thisArg: HTMLElement,
      _argArray: any[],
    ) {
      thisArg = document.documentElement;

      return target.apply(thisArg);
    },
  },
);
