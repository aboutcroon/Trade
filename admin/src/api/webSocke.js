// 创建 WebSocke 链接
export function setWebSocke ({
  http,
  open,
  message,
  error,
  close
}) {
  const websocket = new WebSocket(http)
  websocket.onopen = open
  websocket.onmessage = message
  websocket.onerror = error
  websocket.onclose = close
  return websocket
}

// 添加 websocket 定点重连（心跳），使用时 new 一个对象实例并传入(websocket, createdWebsocket)，调用该对象的 start 方法即可
export class Heartbeat {
  constructor (websocket, createdWebsocket) {
      this.jump = null
      this.timeout = 50 * 1000
      this.lock = null
      this.countdown = null
      this.websocket = websocket
      this.createdWebsocket = createdWebsocket
  }
  start () {
    if (this.jump) {
      clearTimeout(this.jump)
    }
    this.jump = setTimeout(() => {
      // 这里发送一个心跳，后端收到后，返回一个心跳消息，
      if (this.websocket.readyState == 1) {
        //如果连接正常
        this.websocket.send("heartCheck")
        this.start()
      } else {
        this.reconnect()
      }
    }, this.timeout);
  }
  reconnect () {
    if (this.lock) {
      return
    }
    this.lock = true
    //没连接上会一直重连，设置延迟避免请求过多
    if(this.countdown){
      clearTimeout(this.countdown)
    }
    this.countdown = setTimeout(() => {
      //新连接
      this.createdWebsocket()
      this.lock = false
    }, 5000)
  }
}

