import axios from "axios";
import { useEffect, useState } from "react";
import Newsletter from "./Newsletter";

function Home() {

    const [products, setProducts] = useState([])

    window.addEventListener("load", function (event) { 
        const es = new EventSource("http://localhost:5000/promos");
        
        es.addEventListener("message", function(event) {
            const lastElement = document.querySelector("li")
            const newElement = document.createElement("li");
            const eventList = document.getElementById("list");
        
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


    return (
    <div>
        <div className="home-photo-cont"></div>
        <button className="home-btn">
            <ul id="list"><li></li></ul>
        </button>
        {/* <Products products={products} /> */}
        <Newsletter />
    </div>
    )
}

export default Home;