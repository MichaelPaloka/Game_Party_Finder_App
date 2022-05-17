import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';


const LoginForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState(""); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    const onRegisterHandler =  (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/user', {
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        },
        {
            withCredentials: true
        }
        )
            .then( res => {
                console.log(res);
                console.log(res.data);
                navigate("/Gamepartyfinder/home")
            })
            .catch( err => {
                console.log(err.response.data);
                setErrors(err.response.data.errors);
            })
    }

    const onLoginHandler = (e) => {
        e.preventDefault();
        const postData = { email, password};
        axios.post('http://localhost:8000/api/user/login', postData, {
            withCredentials: true
        })
            .then( res => {
                console.log(res);
                navigate("/Gamepartyfinder/home")
            })
            .catch( err => {
                console.log(err.response.data);
            })
    }

    return (
        <div style={{backgroundColor: "#EAE7DC", height:1000, padding: 25}}>

            <div style={{display: 'flex',justifyContent: 'space-between'}}>
                <h1 style={{color: "#E85A4F"}}>Game Party Finder</h1>
                <form onSubmit={onLoginHandler} style={{display: 'flex', alignItems: 'center'}}>
                    <div class="row mb-3">
                        {/* Email */}
                        <div class="col">
                            <label for="email" class="col-form-label">Email:</label>
                                <div class="col-sm-10">
                                    <input type="text" onChange = {(e) => setEmail(e.target.value)} class="form-control"></input>
                                </div>
                        </div>
                        {/* Password */}
                        <div class="col">
                            <label for="password" class="col-form-label">Password:</label>
                                <div class="col-sm-10">
                                    <input type="text" onChange = {(e) => setPassword(e.target.value)} class="form-control"></input>
                                </div>
                        </div>
                    </div>
                    <input type={"submit"} value="Login" class="btn btn-outline-primary" style={{height: 50}}></input>
                </form>
            </div>
            
            
            <div style={{display: 'flex',justifyContent: 'Center'}}>
                <div>
                    <form onSubmit={onRegisterHandler} style={{width: 1000, height: 500, marginTop:100, borderStyle: 'solid', borderRadius: 20,padding: 25}}>
                        <h3 style={{textAlign: 'center'}}>Register Below!</h3>
                        <div class = "row mb-3">
                            {/* First Name */}
                            <div class="col">
                                <label for="firstName" class="col-form-label">First Name:</label>
                                    <div class="col-sm-10">
                                        <input type="text" onChange = {(e) => setFirstName(e.target.value)} class="form-control"></input>
                                    </div>
                            </div>
                            {errors.firstName && (
                                    <p style={{color: 'red'}}>{errors.firstName.message}</p>
                            )}
                            {/* Last Name */}
                            <div class="col">
                                <label for="lastName" class="col-form-label">Last Name:</label>
                                    <div class="col-sm-10">
                                        <input type="text" onChange = {(e) => setLastName(e.target.value)} class="form-control"></input>
                                    </div>
                            </div>
                            {errors.lastName && (
                                    <p style={{color: 'red'}}>{errors.lastName.message}</p>
                            )}
                        </div>
                        <div class="row mb-3">
                            {/* Email */}
                            <div class="col">
                                <label for="email" class="col-form-label">Email:</label>
                                    <div class="col-sm-10">
                                        <input type="text" onChange = {(e) => setEmail(e.target.value)} class="form-control"></input>
                                    </div>
                            </div>
                            {errors.email && (
                                    <p style={{color: 'red'}}>{errors.email.message}</p>
                            )}
                        </div>
                        <div class="row mb-3">
                            {/* Password */}
                            <div class="col">
                                <label for="password" class="col-form-label">Password:</label>
                                    <div class="col-sm-10">
                                        <input type="text" onChange = {(e) => setPassword(e.target.value)} class="form-control"></input>
                                    </div>
                            </div>
                            {errors.password && (
                                    <p style={{color: 'red'}}>{errors.password.message}</p>
                            )}
                            {/* Confirm Password */}
                            <div class="col">
                                <label for="confirmPassword" class="col-form-label">Confirm Password:</label>
                                    <div class="col-sm-10">
                                        <input type="text" onChange = {(e) => setConfirmPassword(e.target.value)} class="form-control"></input>
                                    </div>
                            </div>
                            {errors.confirmPassword && (
                                    <p style={{color: 'red'}}>{errors.confirmPassword.message}</p>
                            )}
                        </div>
                        <input type={"submit"} value="Create Account"></input>
                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default LoginForm
