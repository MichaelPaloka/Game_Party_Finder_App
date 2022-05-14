import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {Navbar, Nav, Container, NavDropdown, CardGroup, Card} from 'react-bootstrap';


const Homepage = () => {
    const [gamePosts, setGamePosts] = useState([]);
    const navigate = useNavigate()
    
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

    const onLogoutHandler = () => {
        axios.post('http://localhost:8000/api/user/logout')
        .then((response) => console.log(response))
        .catch((err) => console.log(err))
        navigate('/Gamepartyfinder')
    }

    return (
        <div style={{backgroundColor: "#EAE7DC"}}>
            <Navbar style={{backgroundColor: "#8E8D8A"}} expand="lg">
                <Container>
                    <Navbar.Brand href="#home">GamePartyFinder</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <div style={{display: "flex"}}>
                                <Nav.Link href="#home">Home</Nav.Link>
                                <Nav.Link href="#link">Link</Nav.Link>
                            </div>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => onLogoutHandler()}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Link to={"/Gamepartyfinder/home/gamepost/new"}>Create a Post</Link>
            <CardGroup style={{padding: "20px"}}>
                {
                    gamePosts.map((gamePost, index)=>{
                        return (
                            <Card style={{margin: "5px"}}>
                                <Card.Img variasnt="top" src="holder.js/100px160" />
                                <Card.Body>
                                    <Card.Title>{gamePost.gameTitle}</Card.Title>
                                    <Card.Text>{gamePost.objective}</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Link to={`/Gamepartyfinder/home/gamepost/${gamePost._id}`} class="btn btn-primary">View</Link>
                                    <small className="text-muted">Click to view more details</small>
                                </Card.Footer>
                            </Card>
                        )
                    })
                }
                
            </CardGroup>
        </div>
    )
}

export default Homepage;
