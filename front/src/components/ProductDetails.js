import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";


const Details = () => {

    const {id} = useParams()
    const history = useHistory();
    const [product, setProduct] = useState({})
    const [users, setUsers] = useState([])
    const [open, setOpen] = useState(false)
    const [img, setImg] = useState(product.picture)
    const [name, setName] = useState(product.name)

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
        const c = window.confirm('Are you sure ypu want to delete this product?')
        if (c) {
            axios.delete(`http://localhost:5000/products/${product._id}`)
            .then(() => alert('Product deleted.'))
            .then(() => history.push(`/${product.category}`))
            .catch(err => console.log(err))
        } else {}
    }

    const editProd = () => {
        axios.patch(`http://localhost:5000/products/${product._id}`, {picture: img, name: name})
        .then(() => alert('Product successfully updated!'))
        .then(() => setOpen(false))
        .catch(err => console.log(err))
    }



    return (

          <div className="product-list">
               <div className="details" key={product._id}>
                        <div className="img-edit">
                            <img className="product-pic" src={product.picture} alt="img"/>
                            {open ? <input className="img-inp" defaultValue={product.picture} type='url' onChange={(e) => setImg(e.target.value)}/> : null}
                        </div>
                         <div className="details-cont">
                            <p className="product-name">{product.name}</p>
                            {open ? <input defaultValue={product.name} type='text' onChange={(e) => setName(e.target.value)}/> : null}
                            <p>{product.prize}pln</p>
                            <button onClick={updateCart(product.name)}>ADD TO CART</button>
                            {users.map(u => u.email === Cookies.get()['user'] && u.role==='admin' ? !open ? <button onClick={() => setOpen(true)}>EDIT</button> : <button type='submit' onClick={editProd}>OK</button> : null)}
                            {users.map(u => u.email === Cookies.get()['user'] && u.role==='admin' ? !open ? <button onClick={delProduct}>DELETE</button> : <button onClick={() => setOpen(false)}>CANCEL</button> : null)}
                         </div>
               </div>
        </div>
    )
}

export default Details;