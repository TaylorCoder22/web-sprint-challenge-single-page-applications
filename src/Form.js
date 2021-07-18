import React, { useState } from 'react'
import * as yup from 'yup'
import axios from 'axios'
import { Link } from 'react-router-dom'

const schema = yup.object().shape({
    name: yup.string().required('name is required').min('name must be at least 2 characters'),
    size: yup.string(),
    pepperoni: yup.boolean().oneOf([ true, false ], ''),
    sausage: yup.boolean().oneOf([ true, false ], ''),
    chicken: yup.boolean().oneOf([ true, false ], ''),
    cheese: yup.boolean().oneOf([ true, false ], ''),
    bacon: yup.boolean().oneOf([ true, false ], ''),
    peppers: yup.boolean().oneOf([ true, false ], ''),
    onions: yup.boolean().oneOf([ true, false ], ''),
    instructions: yup.string()
})

export default function Form () {
    const [form, setForm] = useState ({
        name: '',
        size: '0',
        pepperoni: false,
        sausage: false,
        chicken: false,
        cheese: false,
        bacon: false,
        peppers: false,
        onions: false,
        instructions: ''
    })

    const [error, setError] = useState({
        name:'', 
        size: '',
        pepperoni: '',
        sausage: '',
        chicken: '',
        cheese: '',
        bacon: '',
        peppers: '',
        onions: '',
        instructions: ''
    })

    const [guest, setGuest] = useState ({
        setForm
    })

    const onSubmit = event => {
        event.preventDefault()
        const newGuest = {
            name: form.name,
            size: form.size,
            pepperoni: form.pepperoni,
            sausage: form.sausage,
            chicken: form.chicken,
            cheese: form.cheese,
            bacon: form.bacon,
            peppers: form.peppers,
            onions: form.onions,
            instructions: form.instructions
        }

        axios.post('https://reqres.in/api/users', newGuest)
        .then(res => {
            setForm({
                name: '',
                size: '0',
                pepperoni: false,
                sausage: false,
                chicken: false,
                cheese: false,
                bacon: false,
                peppers: false,
                onions: false,
                instructions: ''           
            })

            setGuest({
                name: form.name,
                size: form.size,
                pepperoni: form.pepperoni,
                sausage: form.sausage, 
                chicken: form.chicken,
                cheese: form.cheese,
                bacon: form.bacon,
                peppers: form.peppers,
                onions: form.onions,
                instructions: form.instructions
            })
        })
        .catch(error => {
        })
    }

    const setFormErrors = (name,value) => {
        yup.reach(schema, name).validate(value)
        .then(() => setError({ ...error, [name]: '' }))
        .catch(error => setError({ ...error, [name]: error.errors[0] }))
    }

    const onChange = evt => {
        const { name, value, checked, type } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value
        setFormErrors(name, valueToUse)
        setForm({ ...form, [name]: valueToUse })
    }

    return(
        <>
        <div className = 'container'>
            <div className = 'head'>
                <h1>Lambda Eats!</h1>
                <div className='Navigation'>
                <Link to='/'>Home</Link>
                <br></br>
                <Link to='/Pizza'>Form</Link>
            </div>
                <img className = 'image' src = 'https://images.csmonitor.com/csm/2017/02/1026871_1_0209-Pizza-Hut_standard.jpg?alias=standard_900x600nc' alt = 'pizza' />
            </div>
            <form id = 'pizza-form' onSubmit={onSubmit}>
                <div style = {{color: 'red'}}>
                    <div>{error.name}</div><div>{error.size}</div>
                </div>
                <div>
                    <br></br>
                <label>Name
                    <input onChange={onChange} value={form.name} name='name' type='text' />
                </label>
                <label>Size
                    <select id= 'size-dropdown' onChange={onChange} value={form.size} name='size'>
                        <option value=''>-- Size It Up --</option>
                        <option value='Small'>Small</option>
                        <option value='Medium'>Medium</option>
                        <option value='Large'>Large</option>
                    </select>
                </label>
                <div className='toppings'>
                    Boom Toppings
                </div>
                <label>Pepperoni
                    <input onChange={onChange} type='checkbox' name='pepperoni' checked={form.pepperoni} />
                </label>
                <label>Sausage
                    <input onChange={onChange} type='checkbox' name='sausage' checked={form.sausage} />
                </label>
                <label>Chicken
                    <input onChange={onChange} type='checkbox' name='chicken' checked={form.chicken} />
                </label>
                <label>Cheese
                    <input onChange={onChange} type='checkbox' name='cheese' checked={form.cheese} />
                </label>
                <label>Bacon
                    <input onChange={onChange} type='checkbox' name='bacon' checked={form.bacon} />
                </label>
                <label>Peppers
                    <input onChange={onChange} type='checkbox' name='peppers' checked={form.peppers} />
                </label>
                <label>Onions
                    <input onChange={onChange} type='checkbox' name='onions' checked={form.onions} />
                </label>
                <div className='form-style'>
                <label>Special Instructions
                    <input id='special-text' name='instructions' type='text' placeholder='Special Instructions' onChange={onChange} value={form.instructions} />
                </label>
                </div>
                <br></br>
                <div className='form-style-button'>
                    <button to='/orders' id='order-button'>Submit</button>
                </div>
                </div>
                <div className='return-container'>
                    <h3>Let's Eat!</h3>
                    <strong>Name:</strong><p>{guest.name}</p>
                    <strong>Size:</strong><p>{guest.size}</p>
                    <strong>Pepperoni:</strong><p>{guest.pepperoni === true ? 'add topping' : ''}</p>
                    <strong>Sausage:</strong><p>{guest.sausage === true ? 'add topping' : ''}</p>
                    <strong>Chicken:</strong><p>{guest.chicken === true ? 'add topping' : ''}</p>
                    <strong>Cheese:</strong><p>{guest.cheese === true ? 'add topping' : ''}</p>
                    <strong>Bacon:</strong><p>{guest.bacon === true ? 'add topping' : ''}</p>
                    <strong>Peppers:</strong><p>{guest.peppers === true ? 'add topping' : ''}</p>
                    <strong>Onions:</strong><p>{guest.onions === true ? 'add topping' : ''}</p>
                    <strong>Instructions</strong><p>{guest.instructions}</p>
                </div>
            </form>
        </div>
        </>
    )
}