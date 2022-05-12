import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import {Navbar, Nav, Container, NavDropdown, CardGroup, Card} from 'react-bootstrap';

const ViewGamePost = (props) => {
    const [gamePost, setGamePost] = useState({})
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/gamepost/" + id)
            .then((res)=>{
                console.log(res.data);
                setGamePost(res.data);
            })
            .catch( err => console.log(err))
    }, [])

    const removeGamePost = (id) => {
        axios.delete('http:lcoalhost:8000/api/gamepost/' + id)
        .then((res) => {
            navigate("/Gamepartyfinder/home")
        })
        .catch(err => console.log(err))
    }

    const onLogoutHandler = async () => {
        axios.post('http://localhost:8000/api/user/logout')
        .then((response) => console.log(response))
        .catch((err) => console.log(err))
        navigate('/Gamepartyfinder')
    }

    return(
        <div>
            <Navbar style={{backgroundColor: "#8E8D8A"}} expand="lg">
                <Container>
                    <Navbar.Brand href="#home">GamePartyFinder</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <div style={{display: "flex"}}>
                                <Nav.Link href="/Gamepartyfinder/home">Home</Nav.Link>
                                <Nav.Link href="#link">Link</Nav.Link>
                            </div>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => onLogoutHandler()}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <p>Game Title: {gamePost.gameTitle}</p>
            <p>Objective: {gamePost.objective}</p>
            <p>Party Size: {gamePost.partySize}</p>
            {/* Needs to be changed so only author can remove */}
            {/* {
                gamePost.postedBy == jwt.decode.payload.id &&
                    <button onClick={removeGamePost}>Delete Post</button>
            }
             */}
        </div>
    )
}

export default ViewGamePost
