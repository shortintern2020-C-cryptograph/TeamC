import React, {useEffect, useState } from 'react'
import getAnimal from '../api/getAnimal' 
import postHuman,{postAnimal,postPost}  from '../api/postUserAPI'
const initialState = {
    name: null, 
    age: null,
}
const HumanState = {
    //TODO make user_id box
    user_id: 'test_user',
    mail: null,
    password: null,
}
const AnimalState = {
    name: null, 
    type: null,
    barthday: null,
    sex: null,
    residence: null,
    // email: null,
    // password: null,
    image:null,
    profile:null,
}

const PostState = {
    user_id: null,
    image:null,
    content:null,
}
const HumanForm = () => {
    const [state, setHumanState] = useState(HumanState)

    const handleChange = e => {
        setHumanState({...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = (body) => {
        //postHuman(body)
        localStorage.setItem('userinfo', JSON.stringify(body))
        setHumanState(HumanState)
    }

    return {
        handleChange, 
        handleSubmit, 
        state, 
    }
}
const AnimalForm = () => {
    const [state, setAnimalState] = useState(AnimalState)

    const handleChange = e => {
        setAnimalState({...state, [e.target.name]: e.target.value })
    }
    function handleImgChange(img) {
        setAnimalState({ ...state, ["image"]: img }) // TODO Base64？？　or そのまま？？
    }
    const handleSubmit = (body) => {
        const addData = Object.assign(JSON.parse(localStorage.getItem('userinfo')), body)
        postAnimal(addData)
        setAnimalState(AnimalState)
    }

    return {
        handleChange, 
        handleSubmit, 
        state, handleImgChange
    }
}
const PostForm = () => {
    const [state, setPostState] = useState(PostState)

    //
    function handleContentChange(text)  {
        setPostState({...state, ["content"]:text })
    }
    function handleImgChange(img) {
        // setPostState({ ...state, ["content"]:" data.content "}) // TODO Base64？？　or そのまま？？
        setPostState({ ...state, ["image"]: img}) // TODO Base64？？　or そのまま？？
    }
    function handl_user_idChange(user_id) {
        // setPostState({ ...state, ["content"]:" data.content "}) // TODO Base64？？　or そのまま？？
        setPostState({ ...state, ["user_id"]: user_id}) // TODO Base64？？　or そのまま？？
    }
    const handleSubmit = (body) => {
        // stateをbodyにのせて渡すだけでよい
        setPostState({ ...state, ["user_id"]: getAnimal().user_id }) 
        // console.log("state");
        // console.log(state);
        postPost(state)


        setPostState(PostState)
    }

    return {
        handleContentChange, 
        handleSubmit, handleImgChange,handl_user_idChange, 
        state
    }
}
// const UserForm = () => {
//     const [state, setState] = useState(initialState)

//     const handleChange = e => {
//         setState({...state, [e.target.name]: e.target.value })
//     }

//     const handleSubmit = (body) => {
//         postUser(body)
//         setState(initialState)
//     }

//     return {
//         handleChange, 
//         handleSubmit, 
//         state, 
//     }
// }
export default HumanForm;
export  { AnimalForm,PostForm};
