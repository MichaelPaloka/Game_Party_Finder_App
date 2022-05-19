import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';

const NewGamePostForm = () => {
    const [user, setUser] = useState({})
    const {id} = useParams();

    const [gameImage, setGameImage] = useState("")
    const [gameTitle, setGameTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [objective, setObjective] = useState("");
    const [partySize, setPartySize] = useState();
    const [date, setDate] = useState();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

// Combination of Josh's, myself and the learn platforms methods.

    useEffect(()=>{
        axios.get("http://localhost:8000/api/user/" + id, {withCredentials: true})
        .then((res)=>{
            console.log(res.data);
            setUser(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])

// Combination of Josh's, myself and the learn platforms methods.

    const createGamePostHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/gamepost', {
            gameImage,
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


    // Based on instructor Josh's and learn platform's Logout function, does not work though.

    const onLogoutHandler = () => {
        axios.post('http://localhost:8000/api/user/logout', {withCredentials:true})
        .then((response) => console.log(response))
        .catch((err) => console.log(err))
        navigate('/Gamepartyfinder')
    }

    // The navbar is imported from react-bootstrap which I am using for the project.

    return (
        <div className='homepage-background'>
            <Navbar style={{backgroundColor: "#FFFFFF"}} expand="lg">
                <Container>
                    <Navbar.Brand style={{color: "#72A0C1"}}>GamePartyFinder</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <div style={{display: "flex"}}>
                                <Nav.Link href="/Gamepartyfinder/home">Home</Nav.Link>
                            </div>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href={`/Gamepartyfinder/home/user/${user._id}`}>Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => onLogoutHandler()}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div style={{display: 'flex', justifyContent: 'center', height:1000 }}>
                <form onSubmit={createGamePostHandler} style={{ backgroundColor: '#FFFFFF', width: 1000, height: 500, marginTop:100, borderStyle: 'solid', borderRadius: 20,padding: 25 }}>
                <h3 style={{color: "#72A0C1"}}>Create Post</h3>
                    <div class = "row mb-3">
                        {/* Game Image */}
                        <div class="col">
                            <label for="gameImage" class="col-form-label">Game Image Url:</label>
                                <div class="col-sm-10">
                                    <input type="text" onChange = {(e) => setGameImage(e.target.value)} class="form-control"></input>
                                </div>
                        </div>
                        {errors.gameTitle && (
                                <p style={{color: 'red'}}>{errors.gameTitle.message}</p>
                        )}
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
                    <input type={"submit"} value="Create Post" class="btn btn-outline-primary"></input>
                </form>
            </div>
            
        </div>
    )
}

export default NewGamePostForm;