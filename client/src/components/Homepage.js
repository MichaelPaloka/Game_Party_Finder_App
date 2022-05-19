import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {Navbar, Nav, Container, NavDropdown, Card} from 'react-bootstrap';
import '../App.css';


const Homepage = () => {
    const [user, setUser] = useState({})
    const {id} = useParams();
    const [gamePosts, setGamePosts] = useState([]);
    const navigate = useNavigate()
    
    // Combination of Josh's, myself and the learn platforms methods.

    useEffect(()=>{
        axios.get("http://localhost:8000/api/gamepost", {withCredentials: true})
        .then((res)=>{
            console.log(res.data);
            setGamePosts(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])

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


    // Based on instructor Josh's and learn platform's Logout function, does not work though.

    const onLogoutHandler = () => {
        axios.post('http://localhost:8000/api/user/logout')
        .then((response) => console.log(response))
        .catch((err) => console.log(err))
        navigate('/Gamepartyfinder')
    }


    // The navbar is a template from react-bootstrap which I am using for the project.

    return (
        <div className='homepage-background'>
            <Navbar style={{backgroundColor: "#FFFFFF"}} expand="lg">
                <Container>
                    <Navbar.Brand style={{color: "#72A0C1"}}>GamePartyFinder</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <div style={{display: "flex"}}>
                                <Nav.Link href="#home">Home</Nav.Link>
                                <Nav.Link href="/Gamepartyfinder/home/gamepost/new">Create Post</Nav.Link>
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

            {/* The Card tag below is imported from react-bootstrap which I am using in the project */}
            <div>
                <div className='Game-posts'>
                    {
                        gamePosts.map((gamePost, index)=>{
                            return (
                                <Card key={index} style={{margin: "50px", width: 350, height: 400 }}>
                                    <Card.Img style={{ height:250, width:350 }} variasnt="top" src={gamePost.gameImage} />
                                    <Card.Body >
                                        <Card.Title style={{color: "#72A0C1"}}>{gamePost.gameTitle}</Card.Title>
                                        <Card.Text style={{color: "#7CB9E8"}}>{gamePost.objective}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer >
                                        <Link to={`/Gamepartyfinder/home/gamepost/${gamePost._id}`} class="btn btn-outline-primary">View</Link>
                                        <small className="text-muted">Click to view more details</small>
                                    </Card.Footer>
                                </Card>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Homepage;
