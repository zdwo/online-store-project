import axios from "axios"
import Cookies from "js-cookie"
import React, { useContext, useEffect, useState } from "react"
import Auth from "../utils/Auth"
import { signout } from "./auth-api"

function UserPage() {

    const [orders, setOrders] = useState([])
    const [edit, setEdit] = useState('')
    const [users, setUsers] = useState([])
    const [email, setEmail] = useState('')
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/orders')
        .then(response => setOrders(response.data))
        .catch(error => console.log(error))
    }, [orders])

    useEffect(() => {
        axios.get('http://localhost:5000/user')
        .then(response => setUsers(response.data))
        .catch (error => console.log(error))
      }, [users])


    const handleDel = (id) => {
        axios.delete(`http://localhost:5000/orders/${id}`)
        .then(() => alert('Order deleted.'))
        .catch(error => console.log(error))
    }

    const editButton = (id) => {
        setEdit(id)
    }

    const handleSubmit = (e, id) => {
        e.preventDefault()
        axios.patch(`http://localhost:5000/orders/${id}`, {user: email})
        .then(() => alert('Order updated.'))
        .then(() => setEdit(''))
        .catch(error => console.log(error))
    }

    const auth = useContext(Auth)
    const handleLogout = async () => {
        const res = await signout()
        auth.setAuth(res.data.auth)
        Cookies.remove('user')
    }

    return (
        <div>
            <h1>Uszanowanko</h1>
            <button onClick={handleLogout}>Logout</button>
            <div>
                {users.map(u => u.email === Cookies.get()['user'] && u.role==='admin' ? 
                    <ul>
                        {orders.map(o => edit!==o._id ?
                        <li>
                            <p>{o._id} -- {o.user}</p>
                            <ul>{o.products.map(p => <li>{p}</li>)}</ul>
                            <button onClick={e => editButton(o._id)}>EDIT</button>
                            <button onClick={e => handleDel(o._id)}>DELETE</button>
                        </li> : 
                        <li>
                            <p>{o._id}</p>
                            <form onSubmit={(e) => handleSubmit(e, o._id)}>
                                <input defaultValue={o.user} type="text" onChange={e => setEmail(e.target.value)} />
                                {/* <ul>{o.products.map(p => <input defaultValue={p} type="text" onChange={e => setProducts([...products, e.target.value])}/>)}</ul> */}
                                <ul>{o.products.map(p => <li>{p}</li>)}</ul>
                                <button type="submit">OK</button>
                            </form>
                        </li>
                        )}
                    </ul>
                    : null)}
            </div>
        </div>
    )
}

export default UserPage