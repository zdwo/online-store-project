function Promos() {

    window.addEventListener("load", function (event) { 
        const es = new EventSource("http://localhost:5000/promos");
        
        es.addEventListener("message", function(event) {
         const lastElement = document.querySelector("li:last-child")
         const newElement = document.createElement("li");
         const eventList = document.getElementById("list");
       
         newElement.textContent = event.data;
         if (!lastElement)  {eventList.appendChild(newElement)}
         else {eventList.replaceChild(newElement, lastElement)}
        });
       });

    return (
        <div>
        <h1 id="title">PROMOS</h1>
        <ul id="list">
        </ul>
        </div>
    )
}

export default Promos;