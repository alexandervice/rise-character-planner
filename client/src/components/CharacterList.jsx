import React from 'react';
import {Link} from "react-router-dom";
import DeleteButton from './DeleteCharacterButton';

const CharacterList = (props) => {
  const {characterArray, deleteCharacter} = props;
  return (
    <div>
      <h3 className=' font-bold mb-4'>All your Characters</h3>
      <table className='table-auto border border-slate-500  border border-slate-500 font-semibold text-slate-900 text-center'>
        <thead className='bg-slate-100'>
          <tr>
            <th className='py-2 px-3'>Character Name</th>
            {/* <th className='py-2 px-3'>Character Details</th> */}
            <th className='py-2 px-3'>Actions Available</th>
          </tr>
        </thead>
        <tbody>
        {
          characterArray.map((character, index)=>{
          return(
            <tr key={index}>
              <td className='py-2 px-3 text-blue-500'>
                <Link to={`/stores/${character._id}`}>{character.name}</Link>
              </td>
              {/* <td className='py-2 px-3'>{character.details}</td> */}
              <td className='py-2 px-3'>
                <Link className='mr-3' to={`/characters/edit/${character._id}`}><button className='bg-blue-200 hover:bg-blue-300 rounded px-1 border-solid border-2 border-blue-400'>Edit</button></Link>
                <DeleteButton characterId={character._id} successCallback = {deleteCharacter}/>
              </td>
            </tr>
          )})
        }
        </tbody>
      </table>
      <Link className='mr-3' to={"/characters/create"}><button className='mt-5 bg-yellow-200 hover:bg-yellow-300 rounded px-1 border-solid border-2 border-yellow-400 mb-5 dark:text-black dark:hover:bg-yellow-200 dark:bg-yellow-300 dark:border-yellow-100'>Create a New Character</button></Link>
    </div>
  )
}
export default CharacterList;

