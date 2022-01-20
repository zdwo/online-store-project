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
        // setCartP([...cartP, p])
        // .then(() => Cookies.set('products', JSON.stringify(cartP), {expires: 7}))
   }
   console.log(cartP)


    useEffect(() => {
        createCookie()
    }, [cartP])


    const createCookie = () => {
        cartP.length===0 ? Cookies.set('cart', cartP) : Cookies.set('cart', JSON.stringify(cartP))
    }

//     function setCookie(cname, cvalue) {
//      var d = new Date();
//      d.setTime(d.getTime() + (30*60*1000));
//      var expires = "expires="+d.toUTCString();
//      document.cookie = cname + "=" + cvalue + "; " + expires;
//  }



    return (

          <div className="product-list">
               {/* <button onClick={createCookie}>ADD TO CART</button> */}
               {products.map(product => <div key={product.id}>
                         <img className="product-pic" src={product.picture} alt="img"/>
                         <p className="product-name" onClick={() => history.push(`/${product.id}`)}>{product.name}</p>
                         <p>{'\u2605'} {product.rating}</p>
                         <button onClick={updateCart(product.name)}>ADD TO CART</button>
               </div>)} 
               {/* {cookies.product && <h1>{cookies.product}</h1>} */}
        </div>
    )
}

export default Products;