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
        <div className="nl-admin">
            {rec.map(r => edit!==r._id ? 
            <div className="nl-user">
                <p>{r.email}</p>
                <div className="nl-btn">
                    <button onClick={() => editButton(r._id)}>EDIT</button>
                    <button onClick={() => handleDel(r._id)}>DELETE</button>
                </div>
            </div> : 
            <div>
                <form className="nl-user" onSubmit={(e) => handleSubmit(e, r._id)}>
                    <input defaultValue={r.email} type="text" onChange={e => setEmail(e.target.value)}/>
                    <div className="nl-btn">
                        <button type="submit">OK</button>
                        <button onClick={() => editButton('')}>CANCEL</button>
                    </div>
                </form>
            </div>)}
        </div>
    )
}

export default NewsletterAdmin;