import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';

const UpdateGamePost = (props) => {
    const {id} = useParams();

    const [gameTitle, setGameTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [objective, setObjective] = useState("");
    const [partySize, setPartySize] = useState(0);
    const [date, setDate] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/gamepost/' + id, {
            withCredentials:true
        })
            .then((res) => {
                console.log(res.data)
                setGameTitle(res.data.gameTitle);
                setGenre(res.data.genre);
                setObjective(res.data.objective);
                setPartySize(res.data.partySize);
                setDate(res.data.date);
            })
            .catch((err) => console.log(err));
    })

    const updateGamePostHandler = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/gamepost/' + id, {
            gameTitle,
            genre,
            objective,
            partySize,
            // date,
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

            <form onSubmit={updateGamePostHandler}>
            <h3>Update Post</h3>
                <div class = "row mb-3">
                    {/* Game Title */}
                    <div class="col">
                        <label for="gameTitle" class="col-form-label">Game Title:</label>
                            <div class="col-sm-10">
                                <input type="text" onChange = {(e) => setGameTitle(e.target.value)} class="form-control" value={gameTitle}></input>
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
                                        <option disabled selected hidden>{genre}</option>
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
                                <input type="text" onChange = {(e) => setObjective(e.target.value)} class="form-control" value={objective}></input>
                            </div>
                    </div>
                    {errors.objective && (
                            <p style={{color: 'red'}}>{errors.objective.message}</p>
                    )}
                    {/* Party Size */}
                    <div class="col">
                        <label for="partySize" class="col-form-label">Party Size:</label>
                            <div class="col-sm-10">
                                <input type="number" onChange = {(e) => setPartySize(e.target.value)} class="form-control" value={partySize}/>
                            </div>
                    </div>
                    {errors.partySize && (
                            <p style={{color: 'red'}}>{errors.partySize.message}</p>
                    )}
                    {/* Date
                    <div class="col">
                        <label for="date" class="col-form-label">Date:</label>
                            <div class="col-sm-10">
                                <input type="date" onChange = {(e) => setDate(e.target.value)} class="form-control" value={date}></input>
                            </div>
                    </div>
                    {errors.date && (
                            <p style={{color: 'red'}}>{errors.date.message}</p>
                    )} */}
                </div>
                <button type='submit'>Update</button>
            </form>
        </div>
    )
}

export default UpdateGamePost;