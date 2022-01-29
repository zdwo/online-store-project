import axios from "axios";
import { useEffect, useState } from "react";
import Chat from "./Chat";
import Newsletter from "./Newsletter";

function Home() {

    const [products, setProducts] = useState([])
    const [open, setOpen] = useState(false)

    window.addEventListener("load", function (event) { 
        const es = new EventSource("http://localhost:5000/promos");
        
        es.addEventListener("message", function(event) {
            const lastElement = document.getElementById("promo").querySelector("li")
            const newElement = document.createElement("li");
            const eventList = document.getElementById("promo");
        
            newElement.textContent = event.data;
            if (eventList) {
            if (!lastElement)  {eventList.appendChild(newElement)}
            else {eventList.replaceChild(newElement, lastElement)}
            } else {}
        });
    });


    useEffect(() => {
        axios.get('http://localhost:5000/products')
        .then(response => setProducts(response.data))
        .catch(error => console.log(error))
    },[])

    const openChat = () => {
        setOpen(!open)
    }


    return (
    <div>
        <div className="home-photo-cont"></div>
        <button className="home-btn">
            <ul id="promo"></ul>
        </button>
        {open ? <Chat /> : null}
        <button onClick={openChat}>+</button>
        <Newsletter />
    </div>
    )
}

export default Home;