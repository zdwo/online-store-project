import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Chat from "./Chat";
import Newsletter from "./Newsletter";

function Home() {

    const [products, setProducts] = useState([])
    const [open, setOpen] = useState(false)
    const [users, setUsers] = useState([])


    window.addEventListener("load", function (event) { 
        const es = new EventSource("http://localhost:5000/promos");
        
        es.addEventListener("message", function(event) {
            if (document.getElementById("promo")) {
                const lastElement = document.getElementById("promo").querySelector("li")
                const newElement = document.createElement("li");
                const eventList = document.getElementById("promo");  
                newElement.textContent = event.data;
                if (eventList) {
                if (!lastElement)  {eventList.appendChild(newElement)}
                else {eventList.replaceChild(newElement, lastElement)}
                } else {} 
            } else {}
            
        });
    });


    useEffect(() => {
        axios.get('http://localhost:5000/products')
        .then(response => setProducts(response.data))
        .catch(error => console.log(error))
    },[])

    useEffect(() => {
        axios.get(`http://localhost:5000/user`)
        .then(response => setUsers(response.data))
        .catch(error => console.log(error))
    },[users])

    const openChat = () => {
        setOpen(!open)
    }


    return (
    <div>
        <div className="home-photo-cont"></div>
        <button className="home-btn">
            <ul id="promo"></ul>
        </button>
        {users.map(u => u.email === Cookies.get()['user'] && u.role==='admin' ? <Link to='/add'><button className="add-prod">+ ADD PRODUCT</button></Link> : null )}
        <div className="chat-cont">
        {open ? <div className="chat-window"><Chat /></div> : null }
		    <button onClick={openChat} className="chat-btn"><FontAwesomeIcon icon={faCommentDots} /></button>
	    </div>
        <Newsletter />
    </div>
    )
}

export default Home;