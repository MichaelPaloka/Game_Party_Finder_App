import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';

// Combination of Josh's, myself and the learn platforms methods.

const ViewGamePost = (props) => {
    const [user, setUser] = useState({})
    const [gamePost, setGamePost] = useState({})
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/gamepost/" + id, {withCredentials: true})
            .then((res)=>{
                console.log(res.data);
                setGamePost(res.data);
            })
            .catch( err => console.log(err))
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

// Combination of Josh's, myself and the learn platforms methods.

    const deleteGamePost = (id) => {
        axios.delete("http://localhost:8000/api/gamepost/" + id, {
            withCredentials: true
        })
        .then((res) => {
            console.log(id)
            navigate("/Gamepartyfinder/home")
        })
        .catch(err => console.log(err))
    }


    // Based on Josh's function for adding comments to a post,
    // I changed it to work for adding users to a party.
    
    const joinParty = () => {
        const newPartyMember = {
            gamePost: gamePost._id 
        }
        axios.post("http://localhost:8000/api/gamepost/" + gamePost._id + "/newpartymember", 
        {newPartyMember},
        {withCredentials: true})
        .then((response) => {
            console.log(response)
            console.log('Party member added!')})
            navigate('/Gamepartyfinder/home')
        .catch((err) => console.log(err.response))
        
    }


    // Based on instructor Josh's and learn platform's Logout function, does not work though.

    const onLogoutHandler = () => {
        axios.post('http://localhost:8000/api/user/logout')
        .then((response) => console.log(response))
        .catch((err) => console.log(err))
        navigate('/Gamepartyfinder')
    }

    // The navbar is is imported from react-bootstrap which I am using for the project.

    return(
        <div className='homepage-background'>
            <Navbar style={{backgroundColor: "#FFFFFF"}} expand="lg">
                <Container>
                    <Navbar.Brand style={{color: "#72A0C1"}}>GamePartyFinder</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <div style={{display: "flex"}}>
                                <Nav.Link href="/Gamepartyfinder/home">Home</Nav.Link>
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

            <div style={{display: 'flex', justifyContent: 'center', height:1000 }}>
                <div style={{ backgroundColor: '#FFFFFF', width: 1000, height: 300, marginTop:100, borderStyle: 'solid', borderRadius: 20,padding: 25 }}>
                    <h2 style={{color: "#72A0C1"}}>Party Needed For {gamePost.gameTitle}</h2>
                    <p style={{fontSize: 20}}>Game Title: {gamePost.gameTitle}</p>
                    <p style={{fontSize: 20}}>Objective: {gamePost.objective}</p>
                    <p style={{fontSize: 20}}>Party Size: {gamePost.partySize}</p>
                    <p style={{fontSize: 20}}>Date: {gamePost.date}</p>
                    
                    {
                        gamePost.postedBy === user._id &&
                            <button onClick={() => deleteGamePost(gamePost._id)} class="btn btn-outline-primary">Delete Post</button>
                    }
                    {
                        gamePost.postedBy === user._id &&
                            <Link to={`/Gamepartyfinder/home/gamepost/${gamePost._id}/update`} class="btn btn-outline-primary">Update</Link>
                    }
                    {
                        (gamePost.partyMembers < gamePost.partySize) &&
                        <button onClick={() => joinParty()} class="btn btn-outline-primary">Join Party</button>
                    }

                </div>
            </div>

            
        </div>
    )
}

export default ViewGamePost
