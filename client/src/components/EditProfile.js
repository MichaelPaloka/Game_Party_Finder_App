import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';

const EditProfileForm = (props) => {
    const {id} = useParams();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState(""); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:8000/api/user/' + id, {
            withCredentials:true
        })
            .then((res) => {
                console.log(res.data)
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setEmail(res.data.setEmail);
                setPassword(res.data.setPassword);
                setConfirmPassword(res.data.setConfirmPassword);
            })
            .catch((err) => console.log(err));
    })

    const updateProfile = (e) => {
        e.preventDefualt();
        axios.put('http://localhost:8000/api/gamepost/' + id, {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        },
        {
            withCredentials: true
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
                navigate("/Gamepartyfinder/home")
            })
            .catch(err => {
                console.log(err.response.data);
                setErrors(err.response.data.errors)
                navigate("/Gamepartyfinder/home")
            })
    }

    const onLogoutHandler = async () => {
        axios.post('http://localhost:8000/api/user/logout')
        .then((response) => console.log(response))
        .catch((err) => console.log(err))
        navigate('/Gamepartyfinder')
    }

    return (
        <div>
            <Navbar style={{backgroundColor: "#8E8D8A"}} expand="lg">
                <Container>
                    <Navbar.Brand href="#home">GamePartyFinder</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <div style={{display: "flex"}}>
                                <Nav.Link href="/Gamepartyfinder/home">Home</Nav.Link>
                            </div>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => onLogoutHandler()}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <form onSubmit={updateProfile} style={{width: 1000, height: 500, marginTop:100, borderStyle: 'solid', borderRadius: 20,padding: 25}}>
                <h3 style={{textAlign: 'center'}}>Update Profile</h3>
                <div class = "row mb-3">
                    {/* First Name */}
                    <div class="col">
                        <label for="firstName" class="col-form-label">First Name:</label>
                            <div class="col-sm-10">
                                <input type="text" onChange = {(e) => setFirstName(e.target.value)} class="form-control" value={firstName}></input>
                            </div>
                    </div>
                    {errors.firstName && (
                            <p style={{color: 'red'}}>{errors.firstName.message}</p>
                    )}
                    {/* Last Name */}
                    <div class="col">
                        <label for="lastName" class="col-form-label">Last Name:</label>
                            <div class="col-sm-10">
                                <input type="text" onChange = {(e) => setLastName(e.target.value)} class="form-control" value={lastName}></input>
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
                                <input type="text" onChange = {(e) => setEmail(e.target.value)} class="form-control" value={email}></input>
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
                                <input type="text" onChange = {(e) => setPassword(e.target.value)} class="form-control" value={password}></input>
                            </div>
                    </div>
                    {errors.password && (
                            <p style={{color: 'red'}}>{errors.password.message}</p>
                    )}
                    {/* Confirm Password */}
                    <div class="col">
                        <label for="confirmPassword" class="col-form-label">Confirm Password:</label>
                            <div class="col-sm-10">
                                <input type="text" onChange = {(e) => setConfirmPassword(e.target.value)} class="form-control" value={confirmPassword}></input>
                            </div>
                    </div>
                    {errors.confirmPassword && (
                            <p style={{color: 'red'}}>{errors.confirmPassword.message}</p>
                    )}
                </div>
                <input type={"submit"} value="Update Account"></input>
            </form>
        </div>
    )
}

export default EditProfileForm;