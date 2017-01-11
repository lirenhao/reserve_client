class Ws {

    constructor() {
        this._isClosed = true
        this._waitOpen = false
        this._tmpMessages = []
    }

    /**
     * 设置事件处理的方法
     * @method
     * @for Ws
     * @param {function} handler 事件处理方法
     */
    setMsgHandler(handler) {
        this.msgHandler = handler
    }

    /**
     * 处理事件的方法
     * @method
     * @for Ws
     * @param {Object} msg 事件信息对象
     */
    handleMsg(msg) {
        this.msgHandler(msg)
    }

    /**
     * 处理错误的方法
     * @method
     * @for Ws
     * @param {Object} err 错误信息
     */
    handleErr(err) {
        console.log("错误信息" + JSON.stringify(err))
    }

    /**
     * 创建webSocket和一些初始化的处理
     * @method
     * @for Ws
     */
    open() {
        if (this._isClosed && !this._waitOpen) {
            try {
                this._waitOpen = true
                this.webSocket = new WebSocket("ws://localhost:9000/ws")
                this.webSocket.onopen = () => {
                    this._isClosed = false
                    this._waitOpen = false
                    this._tmpMessages.forEach(msg => {
                        return Ws.prototype.send.call(this, msg)
                    })
                    this._tmpMessages = []
                }
                this.webSocket.onclose = () => {
                    this._isClosed = true
                }

                this.webSocket.onmessage = (event) => {
                    this.handleMsg(JSON.parse(event.data))
                }

                this.webSocket.onerror = Ws.handleErr
            } catch (e) {
                console.log(e)
            }
        }
    }

    /**
     * 关闭webSocket
     * @method
     * @for Ws
     */
    close() {
        if (!this._isClosed) {
            this.webSocket.close()
            this._isClosed = true
            this._tmpMessages = []
        }
    }

    /**
     * 向服务器发送请求
     * @method
     * @for Ws
     * @param {Object} msg 错误信息
     */
    send(msg) {
        this.open()
        if (this._isClosed) {
            this._tmpMessages.push(msg)
        } else {
            this.webSocket.send(JSON.stringify(msg))
        }
    }
}

export {Ws}
export default new Ws()