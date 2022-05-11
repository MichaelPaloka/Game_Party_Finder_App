import React, { useEffect, useState } from 'react'
import { useParams, Navigate } from "react-router-dom";
import axios from 'axios';

const ViewGamePost = (props) => {
    const [gamePost, setGamePost] = useState({})
    const {id} = useParams();

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
            Navigate("/Gamepartyfinder/home")
        })
        .catch(err => console.log(err))
    }

    return(
        <div>
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
