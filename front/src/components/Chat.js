import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import socketIOClient, { io } from 'socket.io-client'

const socket = io('http://127.0.0.1:4001', {
  transports: ['websocket', 'polling']
})


function Chat() {

    const [usern, setUsern] = useState()
    const [username, setUsername] = useState()
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {

        const ENDPOINT = "http://127.0.0.1:4001";
        const socket = socketIOClient(ENDPOINT); 
        
        if (username) {
            socket.on("connect", () => {
            socket.emit("username", username);
            });
    
            socket.on("users", users => {
                setUsers(users);
            });
        
            socket.on("message", message => {
                setMessages(messages => [...messages, message]);
            });
            socket.on("connected", user => {
                setUsers([...users, user]);
            });
        
            socket.on("disconnected", id => {
                setUsers(users => {
                return users.filter(user => user.id !== id);
                });
            });
        } else {}
        }, [username]);
    
        const handleSubmit = e => {
        e.preventDefault();
        socket.emit("send", username, message);
        console.log(messages)
        setMessage('');
    };

    return (
    <div>
        {username ? <div>
        <div>
            <div className="active"><span className="icon">•</span><span>active</span></div>
            <ul className="active-list">
                {users.map(({ name, id }) => (
                    <li key={id}>{name}</li>
                ))}
            </ul>
        </div>
        <div className="msg">
            <div>
                <div className="messages">
                    {messages.map(({ text,username }, index) => (
                        <div className={username} id={username==='admin' ? 'admin' : null} key={index}>
                            <div>{username}</div>
                            <div>{text}</div>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="text" onChange={e => setMessage(e.target.value)} value={message}/>
                        <span>
                            <button type="submit">Send</button>
                        </span>
                    </div>
                </form>
            </div>
        </div></div> : 
        <div><input className="chat-inp" placeholder="What's your name?" name="username" type='text' onChange={e => setUsern(e.target.value)} /><button onClick={e=>setUsername(usern)}><FontAwesomeIcon icon={faPaperPlane} /> </button></div>}
  </div>
    )
}

export default Chat;