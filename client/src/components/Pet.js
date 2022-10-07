import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom";
import axios from 'axios';
import {Link} from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import Paper  from '@mui/material/Paper';
import Button from '@mui/material/Button';

const Pet = (props) => {
    const [pet, setPet] = useState({})
    const {id} = useParams(); 
    const [like, setLike] = useState(0),
        [isLike, setIsLike] = useState(false),
    
    onLikeButtonClick = () => {
        setLike(like + (isLike?-1:1));
        setIsLike(!isLike);
        console.log(isLike)
    }

    const { removeFromDom } = props;
    const deletePet = (petId) => {
        axios.delete('http://localhost:8000/api/pets/' + petId)
            .then(res => {
                removeFromDom(petId)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/pets/" + id)
            .then( res => {
                console.log(res.data);
                setPet(res.data);
            })
            .catch( err => console.log(err) )
    }, [id])
    return (
        <Grid container spacing={2} minHeight={260}>
            <Grid xs display="flex" flexDirection={"column"} alignItems="center">
                <Grid sx={{width: 500, minHeight: 100}} xs display="flex" justifyContent={"space-between"} alignItems="center">
                    <h1>Pet Shelter</h1>
                    <Link to="/">back to home</Link>
                </Grid>
                <Grid sx={{width: 500, minHeight: 50}} xs display="flex" justifyContent={"space-between"} alignItems="center">
                    <h2>Details about: {pet.name}</h2>
                    <Button variant="contained" color="error" size='small' onClick={(e)=>{deletePet(pet._id)}}>
                        <div>Adopt {pet.name}</div>
                    </Button>
                </Grid>
                <Paper elevation={3} sx={{width: 500, minHeight: 150}}>
                    <Grid sx={{width: 400, minHeight: 50}} xs display="flex" justifyContent={"space-between"}>
                        <Grid sx={{width: 400, minHeight: 50}} xs display="flex" justifyContent={"space-between"}>
                            <p>Pet Type:</p>
                        </Grid>
                        <Grid sx={{width: 400, minHeight: 50}} xs display="flex" justifyContent={"space-between"}>
                            <p>{pet.type}</p>
                        </Grid>
                    </Grid>
                    <Grid sx={{width: 400, minHeight: 50}} xs display="flex" justifyContent={"space-between"}>
                        <Grid sx={{width: 400, minHeight: 50}} xs display="flex" justifyContent={"space-between"}>
                            <p>Description:</p>
                        </Grid>
                        <Grid sx={{width: 400, minHeight: 50}} xs display="flex" justifyContent={"space-between"}>
                            <p>{pet.description}</p>
                        </Grid>
                    </Grid>
                    <Grid sx={{width: 400, minHeight: 50}} xs display="flex" justifyContent={"space-between"}>
                        <Grid sx={{width: 400, minHeight: 50}} xs display="flex" justifyContent={"space-between"}>
                            <p>Skills:</p>
                        </Grid>
                        <Grid sx={{width: 400, minHeight: 50}} xs display="flex" justifyContent={"space-between"}>
                            <div>
                                <p>{pet.skillOne}</p>
                                <p>{pet.skillTwo}</p>
                                <p>{pet.skillThree}</p>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid sx={{width: 400, minHeight: 50}} xs display="flex" justifyContent={"space-between"}>
                        <Button variant='contained' color='success' onClick={onLikeButtonClick} disabled={isLike ? true : false}> Like {pet.name}</Button>
                        <p> {like} like(s)</p>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}
export default Pet;

