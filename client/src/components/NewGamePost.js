import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';

const NewGamePostForm = () => {
    const [gameTitle, setGameTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [objective, setObjective] = useState("");
    const [partySize, setPartySize] = useState();
    const [date, setDate] = useState();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const createGamePostHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/gamepost', {
            gameTitle,
            genre,
            objective,
            partySize,
            date,
        },
        {
            withCredentials: true
        })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate("/Gamepartyfinder/home")
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrors(err.response.data.errors);
            })
    }

    const onLogoutHandler = async () => {
        axios.post('http://localhost:8000/api/user/logout', {withCredentials:true})
        .then((response) => console.log(response))
        .catch((err) => console.log(err))
        navigate('/Gamepartyfinder')
    }

    return (
        <div style={{backgroundColor: "#C1C8E4"}}>
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

            <div style={{display: 'flex', justifyContent: 'center', height:1000}}>
                <form onSubmit={createGamePostHandler} style={{width: 1000, height: 500, marginTop:100, borderStyle: 'solid', borderRadius: 20,padding: 25}}>
                <h3>Create Post</h3>
                    <div class = "row mb-3">
                        {/* Game Title */}
                        <div class="col">
                            <label for="gameTitle" class="col-form-label">Game Title:</label>
                                <div class="col-sm-10">
                                    <input type="text" onChange = {(e) => setGameTitle(e.target.value)} class="form-control"></input>
                                </div>
                        </div>
                        {errors.gameTitle && (
                                <p style={{color: 'red'}}>{errors.gameTitle.message}</p>
                        )}
                        {/* Genre */}
                        <div class="col">
                            <label for="genre" class="col-form-label">Genre:</label>
                                <div class="col-sm-10">
                                    <select onChange = {(e) => setGenre(e.target.value)}>
                                            <option disabled selected hidden>Select Genre</option>
                                            <option>Sandbox</option>
                                            <option>FPS</option>
                                            <option>Role Playing</option>
                                            <option>Action</option>
                                            <option>Puzzle</option>
                                            <option>Sports</option>
                                            <option>MMORPG</option>
                                            <option>Other</option>
                                        </select>
                                </div>
                        </div>
                        {errors.genre && (
                                <p style={{color: 'red'}}>{errors.genre.message}</p>
                        )}
                    </div>
                    <div class="row mb-3">
                        {/* Objective */}
                        <div class="col">
                            <label for="objective" class="col-form-label">Objective:</label>
                                <div class="col-sm-10">
                                    <input type="text" onChange = {(e) => setObjective(e.target.value)} class="form-control"></input>
                                </div>
                        </div>
                        {errors.objective && (
                                <p style={{color: 'red'}}>{errors.objective.message}</p>
                        )}

                        <div class = "row mb-3">
                            {/* Party Size */}
                            <div class="col">
                                <label for="partySize" class="col-form-label">Party Size:</label>
                                    <div class="col-sm-10">
                                        <input type="number" onChange = {(e) => setPartySize(e.target.value)} class="form-control"></input>
                                    </div>
                            </div>
                            {errors.partySize && (
                                    <p style={{color: 'red'}}>{errors.partySize.message}</p>
                            )}
                        </div>
                        <div class = "row mb-3">
                            {/* Date */}
                            <div class="col">
                                <label for="date" class="col-form-label">Date:</label>
                                    <div class="col-sm-10">
                                        <input type="date" onChange = {(e) => setDate(e.target.value)} class="form-control"></input>
                                    </div>
                            </div>
                            {errors.date && (
                                    <p style={{color: 'red'}}>{errors.date.message}</p>
                            )}
                        </div>
                    </div>
                    <input type={"submit"} value="Create Post"></input>
                </form>
            </div>
            
        </div>
    )
}

export default NewGamePostForm;