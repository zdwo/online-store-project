import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { Link } from "react-router-dom";

const Jewelery = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/products/jewelery')
        .then(response => setProducts(response.data))
        .catch(error => console.log(error))
    },[])

    const [cartP, setCartP] = useState(
        Cookies.get()['cart'] ? JSON.parse(Cookies.get()['cart']) : []
    )


    const updateCart = p => () => {
        setCartP([...cartP, p])
   }


    useEffect(() => {
        createCookie()
    }, [cartP])


    const createCookie = () => {
        cartP.length===0 ? Cookies.set('cart', cartP, {expires: new Date(new Date().getTime() + 60*60*1000)}) : Cookies.set('cart', JSON.stringify(cartP), {expires: new Date(new Date().getTime() + 60*60*1000)})
    }



    return (

          <div className="product-list">
               {products.map(product => <div key={product._id} className="product">
                        <Link className="link product" to={`/${product._id}`}><img className="product-pic" src={product.picture} alt="img"/>
                         <p className="product-name">{product.name}</p>
                         </Link>
                         <button onClick={updateCart(product.name)}>ADD TO CART</button>
               </div>)} 
        </div>
    )
}

export default Jewelery;