import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Cookies from 'js-cookie';

const Products = ({ products }) => {

    const history = useHistory();

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
               {products.map(product => <div key={product._id}>
                         <img className="product-pic" src={product.picture} alt="img"/>
                         <p className="product-name" onClick={() => history.push(`/${product.id}`)}>{product.name}</p>
                         <p>{'\u2605'} {product.rating}</p>
                         <button onClick={updateCart(product.name)}>ADD TO CART</button>
               </div>)} 
        </div>
    )
}

export default Products;