import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function AddProduct() {

    const history = useHistory()

    const [name, setName] = useState('')
    const [prize, setPrize] = useState(0)
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [picture, setPicture] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/products', {name, prize, description, category, picture})
        .then(() => document.getElementById('add-form').reset())
        .then(() => alert('Product successfully added!'))
        .catch(err => console.log(err))
    }

    return (
        <div>
            <form id="add-form" className="add-form" onSubmit={handleSubmit}>
                <input name="name" type='text' placeholder="Name" onChange={e => setName(e.target.value)}/>
                <input name="prize" type='number' step='0.01' placeholder='Prize' onChange={e => setPrize(e.target.value)}/>
                <input name="description" type='text' placeholder="Description" onChange={e => setDescription(e.target.value)}/>
                <input name="category" type='text' placeholder='Category' onChange={e => setCategory(e.target.value)}/>
                <input name='picture' type='url' placeholder="Picture url address" onChange={e => setPicture(e.target.value)}/> 
                <div className="add-btn">
                    <button type="submit">ADD</button>
                    <button onClick={() => history.push('/')}>CANCEL</button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct;