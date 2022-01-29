import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCloudMoon } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import Cookies from "js-cookie"
import React, { useContext, useEffect, useState } from "react"
import Auth from "../utils/Auth"
import { signout } from "./auth-api"

function UserPage() {

    const [orders, setOrders] = useState([])
    const [users, setUsers] = useState([])
    const [edit, setEdit] = useState('')
    const [email, setEmail] = useState('')

    const [open, setOpen] = useState(false)
    const [user, setUser] = useState('')
    const [id, setId] = useState('')
    const [userEmail, setUserEmail] = useState('')

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

    useEffect(() => {
        const e = Cookies.get()['user']
        setUser(e)
        users.map(u => u.email === e ? setId(u._id) : null)
    }, [users])


    const handleDel = (id) => {
        const c = window.confirm('Are you sure you want to delete this order?')
        if (c) {
            axios.delete(`http://localhost:5000/orders/${id}`)
            .then(() => alert('Order deleted.'))
            .catch(error => console.log(error))
        } else {}
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

    const editEmail = () => {
        setOpen(true)
    }

    const handleEditEmail = (e) => {
        e.preventDefault()
        axios.patch(`http://localhost:5000/user/${id}`, {email: userEmail})
        .then(() => alert('Email successfully updated!'))
        .then(() => Cookies.set('user', userEmail, {expires: new Date(new Date().getTime() + 60*60*1000)}))
        .then(() => setOpen(false))
        .catch(error => console.log(error))
    }

    const handleUserDelete = () => {
        const c = window.confirm('Are you sure you want to delete your account?')
        if (c) {
            axios.delete(`http://localhost:5000/user/${id}`)
            .then(() => alert('Account deleted.'))
            .then(() => handleLogout())
            .catch(error => console.log(error))
        } else {}
    }

    const auth = useContext(Auth)
    const handleLogout = async () => {
        const e = Cookies.get()['user']
        const res = await signout({e})
        auth.setAuth(res.data.auth)
        Cookies.remove('user')
    }

    return (
        <div className="user-page">
            {/* <div className="p-1"></div> */}
            <img className="p-1" src="https://i.pinimg.com/564x/4b/34/1f/4b341fde6f0e8699882c518623dce95f.jpg" alt="img"/>
            <img className="p-2" src="https://i.pinimg.com/564x/74/a2/1a/74a21a7f3b2ddf08b317900a715c85d9.jpg" alt="img"/>
            <img className="p-3" src="https://i.pinimg.com/564x/a3/79/a6/a379a61c17d181e77d24a311a0bb465a.jpg" alt="img"/>
            <img className="p-4" src="https://i.pinimg.com/564x/24/72/ac/2472ac26df7ce989251361db3067f253.jpg" alt="img"/>
            <img className="p-5" src="https://i.pinimg.com/564x/14/cf/73/14cf735b95bb45032d2caa2c8ad14023.jpg" alt="img"/>
            <div className="content">
                <h1 className="user-header">Hello, {user} <FontAwesomeIcon icon={faCloudMoon} /> </h1>
                <button onClick={handleLogout}>Logout</button>
                <button onClick={editEmail}>EDIT EMAIL</button>
                {open ? <form onSubmit={e => handleEditEmail(e)}><input defaultValue={user} type='text' onChange={(e) => setUserEmail(e.target.value)} /><button type="submit">OK</button></form> : null}
                <button onClick={handleUserDelete}>DELETE ACCOUNT</button>
            </div>
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
                                <ul>{o.products.map(p => <li>{p}</li>)}</ul>
                                <button type="submit">OK</button>
                                <button onClick={e => editButton('')}>CANCEL</button>
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