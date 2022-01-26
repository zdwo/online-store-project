import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";


const Details = () => {

    const {id} = useParams()
    const history = useHistory();
    const [product, setProduct] = useState({})
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/products/${id}`)
        .then(response => setProduct(response.data))
        .catch(error => console.log(error))
    },[product])

    useEffect(() => {
        axios.get(`http://localhost:5000/user`)
        .then(response => setUsers(response.data))
        .catch(error => console.log(error))
    },[users])

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

    const delProduct = () => {
        axios.delete(`http://localhost:5000/products/${product._id}`)
        .then(() => history.push('/'))
    }



    return (

          <div className="product-list">
               <div key={product._id}>
                         <img className="product-pic" src={product.picture} alt="img"/>
                         <p className="product-name">{product.name}</p>
                         <p>{'\u2605'} {product.rating}</p>
                         <button onClick={updateCart(product.name)}>ADD TO CART</button>
                         {users.map(u => u.email === Cookies.get()['user'] && u.role==='admin' ? <Link to={`/${product._id}/edit`}><button>EDIT</button></Link> : null)}
                         {users.map(u => u.email === Cookies.get()['user'] && u.role==='admin' ? <button onClick={delProduct}>DELETE</button> : null)}
               </div>
        </div>
    )
}

export default Details;