import React  from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import DeleteButton from './DeleteCharacterButton';

const CharacterList = (props) => {
  const { characterArray, deleteCharacter } = props;
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className='inline-block rounded p-5 bg-zinc-900'>
      <Link className='mr-3' to={`/${user._id}/characters/create`}>
        <button className='my-5 bg-yellow-200 hover:bg-yellow-300 rounded px-1 border-solid border-2 border-yellow-400 mb-5 dark:text-black dark:hover:bg-yellow-200 dark:bg-yellow-300 dark:border-yellow-400'>Create a New Character</button>
      </Link>
      <h3 className='font-bold mb-4 text-4xl'>{user.userName}'s Characters</h3>
      {characterArray.map((character, index) => {
            return (
              <div key={index} className="mb-3 m-1 bg-zinc-800 p-5 rounded">
                <div className="flex p-3 items-center">
                  <div className="flex flex-none flex-col items-center justify-items-center mr-5">
                    <p className="mb-2 text-3xl font-bold">{character.name}</p>
                    <img className="w-48 h-48 rounded " src={`/images/characters/1onHPwMMRaG-Rttomzb4MSXXpP6nkdV-TVQXn7YpG.png`} alt={`${character.img}`} />
                  </div>
                  <p className="text-sm text-left hidden sm:block">{character.backstory}</p>
                </div>
                <div className='dark:text-black flex justify-center'>
                  <Link className='mr-3' to={`/${user._id}/characters/${character._id}`}>
                    <button className='bg-green-200 hover:bg-green-300 rounded px-1 border-solid border-2 border-green-400'>View</button>
                  </Link>
                  <Link className='mr-3' to={`/${user._id}/characters/edit/${character._id}`}>
                    <button className='bg-blue-200 hover:bg-blue-300 rounded px-1 border-solid border-2 border-blue-400'>Edit</button>
                  </Link>
                  <DeleteButton characterId={character._id} successCallback={deleteCharacter} />
                </div>
              </div>
            );
      })}
      <Link className='mr-3' to={`/${user._id}/characters/create`}>
        <button className='mt-5 bg-yellow-200 hover:bg-yellow-300 rounded px-1 border-solid border-2 border-yellow-400 mb-5 dark:text-black dark:hover:bg-yellow-200 dark:bg-yellow-300 dark:border-yellow-400'>Create a New Character</button>
      </Link>
    </div>
  );
};

export default CharacterList;