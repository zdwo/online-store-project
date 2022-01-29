import axios from "axios";
import { useEffect, useState } from "react";

function NewsletterAdmin() {

    const [rec, setRec] = useState([])
    const [edit, setEdit] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        axios.get('http://localhost:5000/newsletter')
        .then(response => setRec(response.data))
        .catch(error => console.log(error))
    }, [rec])

    const handleDel = (id) => {
        axios.delete(`http://localhost:5000/newsletter/${id}`)
        .then(() => alert('Email deleted.'))
        .catch(error => console.log(error))
    }

    const editButton = (id) => {
        setEdit(id)
    }

    const handleSubmit = (e, id) => {
        e.preventDefault()
        axios.put(`http://localhost:5000/newsletter/${id}`, {email})
        .then(() => alert('Email updated.'))
        .then(() => setEdit(''))
        .catch(error => console.log(error))
    }


    return (
        <div>
            {rec.map(r => edit!==r._id ? 
            <div>
                <p>{r.email}</p>
                <button onClick={e => editButton(r._id)}>EDIT</button>
                <button onClick={e => handleDel(r._id)}>DELETE</button>
            </div> : 
            <div>
                <form onSubmit={(e) => handleSubmit(e, r._id)}>
                    <input defaultValue={r.email} type="text" onChange={e => setEmail(e.target.value)}/>
                    <button type="submit">OK</button>
                </form>
            </div>)}
        </div>
    )
}

export default NewsletterAdmin;