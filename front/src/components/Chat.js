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
                const msgs = document.querySelector(".messages");
                msgs.scrollTop = msgs.scrollHeight;
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
                        <div className={`${username} message`} id={username==='admin' ? 'admin' : null} key={index}>
                            <div className="user">{username}</div>
                            <div className="text">{text}</div>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="chat-form">
                        <input type="text" onChange={e => setMessage(e.target.value)} value={message}/>
                        <button type="submit"><FontAwesomeIcon icon={faPaperPlane} /></button>
                    </div>
                </form>
            </div>
        </div>
        </div> : 
        <div><input className="chat-inp" placeholder="What's your name?" name="username" type='text' onChange={e => setUsern(e.target.value)} /><button onClick={e=>setUsername(usern)}>OK</button></div>
        }
  </div>
    )
}

export default Chat;