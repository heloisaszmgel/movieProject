import React from 'react'
import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate()
    const [userLogin, setUserLogin] = useState ({
        email: '',
        password: ''
    })

    const onChangeHandler = (e) => {
        setUserLogin({...userLogin, [e.target.name]: e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/loginUser', userLogin, {withCredentials:true})
            .then((res) => {
                console.log(res)
                navigate('/homepage')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
    <div>
        <form onSubmit={submitHandler}>
            <label>Email:</label>
            <input type="text" name="email" onChange={onChangeHandler} value={userLogin.email} />

            <label>Password:</label>
            <input type="password" name="password" onChange={onChangeHandler} value={userLogin.password} />

            <button>Login</button>
            <Link to={'/register'}> Dont haven an account? Sign up here! </Link>
        </form>
    </div>
    )
}

export default Login