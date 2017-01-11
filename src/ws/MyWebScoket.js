class MyWebSocket {

    constructor() {
        this._isClosed = true
        this._waitOpen = false
        this._tmpMessages = []
    }

    setMsgHandler(handler) {
        this.msgHandler = handler
    }

    open() {
        if (this._isClosed && !this._waitOpen) {
            try {
                this._waitOpen = true
                this.webSocket = new WebSocket("ws://localhost:9000/ws")

                this.webSocket.onopen = () => {
                    this._isClosed = false
                    this._waitOpen = false
                    this._tmpMessages.forEach(msg => {
                        return MyWebSocket.prototype.send.call(this, msg)
                    })
                    this._tmpMessages = []
                }

                this.webSocket.onclose = () => {
                    this._isClosed = true
                }

                this.webSocket.onmessage = (event) => {
                    this.msgHandler(JSON.parse(event.data))
                }

                this.webSocket.onerror = (err) => {
                    console.log("错误信息" + JSON.stringify(err))
                }
            } catch (e) {
                console.log(e)
            }
        }
    }

    close() {
        if (!this._isClosed) {
            this.webSocket.close()
            this._isClosed = true
            this._tmpMessages = []
        }
    }

    send(msg) {
        this.open()
        if (this._isClosed) {
            this._tmpMessages.push(msg)
        } else {
            this.webSocket.send(JSON.stringify(msg))
        }
    }
}

export {MyWebSocket}
export default new MyWebSocket()