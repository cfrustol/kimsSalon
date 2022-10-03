import React, { useState } from 'react'
import PetList from '../components/PetList';
const Main = () => {
    
    const [pets, setPets] = useState([]);
    const [errors, setErrors] = useState([]); 
    const removeFromDom = petId => {
        setPets(pets.filter(pet => pet._id !== petId)); 
    }
    return (
        <div>
           <PetList pets={pets} setPets={setPets} errors={errors} setErrors={setErrors} removeFromDom={removeFromDom} />
        </div>
    )
}
export default Main;
