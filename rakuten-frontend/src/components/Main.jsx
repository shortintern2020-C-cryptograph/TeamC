import React, {useEffect, useState } from 'react'

import getUser from '../api/getUserAPI'
import postUser from '../api/postUserAPI'

import UserForm from '../hooks/useUser'


const User = ({ name, age }) => {
    return (
        <div>
            <p>name : {name}</p>
            <p>age : {age}</p>
            <hr/>
        </div>
    )
}

const Main = () => {
    const [errorMessage, setErrorMessage] = useState()
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)

    const dom = user

    const {
        handleChange, 
        handleSubmit, 
        state, 
    } = UserForm()

    const onChange = e => {
        handleChange(e)
        setErrorMessage(null)
    }
    const onSubmit = e => {
        e.preventDefault()
        handleSubmit(state)
         
        dom.push({"name": state.name, "age": state.age})
    } 
    
    useEffect(async () => {
        getUser()
        .then((u) => {
            setUser(u)
            setLoading(false)
        })
        .catch((e) => {
            throw new Error(e)
        })
    }, [])

    return (
        <div>
            {loading ? ( <h1>takurinton</h1> ) : ( dom.map(u => ( <User {...u} /> )))}

            <form onSubmit={onSubmit}>
                <input type="text" name="name" value={state.name} onChange={onChange} placeholder="name" />
                <input type="number" name="age" value={state.age} onChange={onChange} placeholder="age"/>
                <input type="submit" />
            </form>
        </div>
    )
}

export default Main