import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Register = (props) => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:''
    })
    // const [error, setErrors] = useState({})

    const changeHandler = (e) => {
        setUser({...user, [e.target.name]:e.target.value})
    }
    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/registerUser', user, {withCredentials:true})
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
                <div>
                    <label className="form-label">First Name:</label>
                    <input type="text" className="form-control" value={user.firstName} name="firstName" onChange={changeHandler}/>
                </div>
                <div>
                    <label className="form-label">Last Name:</label>
                    <input type="text" className="form-control" value={user.lastName} name="lastName" onChange={changeHandler}/>
                </div>
                <div>
                    <label className="form-label">Email:</label>
                    <input type="email" className="form-control" value={user.email} name="email" onChange={changeHandler}/>
                </div>
                <div>
                    <label className="form-label">Password:</label>
                    <input type="password" className="form-control" value={user.password} name="password" onChange={changeHandler}/>
                </div>
                <div>
                    <label className="form-label">Confirm Password:</label>
                    <input type="password" className="form-control" value={user.confirmPassword} name="confirmPassword" onChange={changeHandler}/>
                </div>
                <button type="submit">Submit</button>
                <Link to={'/login'}>Already have an account?</Link>
            </form>
        </div>
    )
}

export default Register