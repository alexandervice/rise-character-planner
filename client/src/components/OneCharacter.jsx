import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams, Link} from "react-router-dom";
import CancelButton from './CancelButton';

const OneCharacter = (props) => {
  const [character, setCharacter] = useState({});
  const {id} = useParams();


  useEffect(() => {
    axios.get(`http://localhost:8000/api/characters/find/${id}`)
      .then( res => {
        console.log(res.data.character);
        setCharacter(res.data.character);
      })
      .catch( err=>console.log(err) );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="p-4 px-6 bg-slate-200">
        <h3 className='text-2xl text-left font-bold'>{character.name}</h3>
        <h3 className='text-2xl text-left font-bold'>#: {character.details}</h3>
      </div>
      <CancelButton/>
      <Link className='characterItem' to={`/characters/edit/${id}`}><button className='bg-blue-100 hover:bg-blue-200 rounded px-1 border-solid border-2 mt-5 border-blue-400 mb-5'>Edit Character</button></Link>
    </div>
  );
}

export default OneCharacter;