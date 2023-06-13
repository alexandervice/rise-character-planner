import React from 'react';
import {Link} from "react-router-dom";
import DeleteButton from './DeleteCharacterButton';

const CharacterList = (props) => {
  const {characterArray, deleteCharacter} = props;
  const user = JSON.parse(localStorage.getItem("user"))
  
  return (
    <div className='inline-block'>
      <h3 className=' font-bold mb-4 text-3xl'>{user.userName}'s Characters</h3>
      <table className='table-auto border border-slate-500  border border-slate-500 font-semibold text-slate-900 '>
        <thead className='bg-slate-100'>
          <tr>
            <th className='py-2 px-3'>Image</th>
            <th className='py-2 px-3'>Name</th>
            <th className='py-2 px-3'>Race</th>
            <th className='py-2 px-3'>Background</th>
            <th className='py-2 px-3'>Specializations</th>
            <th className='py-2 px-3'>Talents</th>
            <th className='py-2 px-3'>Actions Available</th>
          </tr>
        </thead>
        <tbody>
        {
          characterArray.map((character, index)=>{
          return(
            <tr key={index}>
              <td className='py-2 px-3'>{character.img}</td>
              <td className='py-2 px-3 dark:text-white'>{character.name}</td>
              <td className='py-2 px-3 dark:text-white'>{character.race}</td>
              <td className='py-2 px-3 dark:text-white'>{character.background}</td>
              <td className='py-2 px-3 dark:text-white'>{character.specializations[0]} | {character.specializations[1]}</td>
              <td className='py-2 px-3 dark:text-white'>{character.talents[0]} | {character.talents[1]}</td>
              <td className='py-2 px-3'>
                <Link className='mr-3' to={`/${user._id}/characters/${character._id}`}><button className='bg-green-200 hover:bg-green-300 rounded px-1 border-solid border-2 border-green-400'>View</button></Link>
                <Link className='mr-3' to={`/${user._id}/characters/edit/${character._id}`}><button className='bg-blue-200 hover:bg-blue-300 rounded px-1 border-solid border-2 border-blue-400'>Edit</button></Link>
                <DeleteButton characterId={character._id} successCallback = {deleteCharacter}/>
              </td>
            </tr>
          )})
        }
        </tbody>
      </table>
      <Link className='mr-3' to={`/${user._id}/characters/create`}><button className='mt-5 bg-yellow-200 hover:bg-yellow-300 rounded px-1 border-solid border-2 border-yellow-400 mb-5 dark:text-black dark:hover:bg-yellow-200 dark:bg-yellow-300 dark:border-yellow-400'>Create a New Character</button></Link>
    </div>
  )
}
export default CharacterList;

