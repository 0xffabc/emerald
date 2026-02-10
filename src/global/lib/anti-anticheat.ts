/**
 * setInterval(function () {
   if (
     !(
       WebSocket.prototype.hasOwnProperty('send') &&
       typeof WebSocket.prototype.send == 'function' &&
       (WebSocket.prototype.send.toString() ==
         'function send() { [native code] }' ||
         WebSocket.prototype.send.toString() ==
           'function send() {\n    [native code]\n}') &&
       (WebSocket.toString() == 'function WebSocket() { [native code] }' ||
         WebSocket.toString() ==
           'function WebSocket() {\n    [native code]\n}') &&
       EventTarget.isPrototypeOf(WebSocket)
     )
   ) {
     let G = document
       .querySelector('meta[name=Notify-Token]')
       .content.split('.')[0]
     if (G) {
       fetch('/chat/' + G + '/', {
         method: 'GET',
         headers: new Headers({ A: 'json' }),
       })
     }
   }
 }, 10000)

 * Search for 'as per admanager mandate' in kogama index.html
 * However I'm not sure whether it runs on the webgl page
 */
