import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewGamePostForm = (props) => {
    const [gameTitle, setGameTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [objective, setObjective] = useState("");
    const [partySize, setPartySize] = useState();
    const [date, setDate] = useState();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefualt();
        axios.post('http://localhost:8000/api/gamepost', {
            gameTitle,
            genre,
            objective,
            partySize,
            date,
        })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate("/Gamepartyfinder/home")
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrors(err.response.data.errors)
            })
    }

    return (
        <div>
            <form onSubmit={onSubmitHandler}>
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
                                <input type="text" onChange = {(e) => setGenre(e.target.value)} class="form-control"></input>
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
                <input type={"submit"} value="Create Post"></input>
            </form>
        </div>
    )
}

export default NewGamePostForm;