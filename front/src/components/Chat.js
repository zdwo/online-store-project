import { useEffect, useState } from "react";
import socketIOClient, { io } from 'socket.io-client'

const username = prompt("What's your name?");
const socket = io('http://127.0.0.1:4001', {
  transports: ['websocket', 'polling']
})
function Chat() {

    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([])
    const [message, setMessage] = useState('')
  
    useEffect(() => {
        const ENDPOINT = "http://127.0.0.1:4001";
        const socket = socketIOClient(ENDPOINT); 
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
            setUsers(users => [...users, user]);
        });
    
        socket.on("disconnected", id => {
            setUsers(users => {
            return users.filter(user => user.id !== id);
            });
        });
        }, []);
    
        const handleSubmit = e => {
        e.preventDefault();
        socket.emit("send", message);
        setMessage('');
    };
    
    return (
    <div className="chat-cont">
        <div>
            <div>Users</div>
            <ul>
                {users.map(({ name, id }) => (
                    <li key={id}>{name}</li>
                ))}
            </ul>
        </div>
        <div className="msg">
            <div>
                <div>Messages</div>
                <div>
                    {messages.map(({ text }, index) => (
                        <div key={index}>
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
        </div>
  </div>
    )
}

export default Chat;