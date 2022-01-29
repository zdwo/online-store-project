function Chat() {

    return (
        <div className="chat-cont">
            <div className="header">
            </div>
            <div className="msg-display">
            </div>
            <div className="msg-field">
                <form id="chat-form">
                    <input id="msg" type="text" placeholder="Enter Message" required autocomplete="off" />
                    <button class="btn"> Send</button>
                </form>
            </div>
        </div>
    )
}

export default Chat;