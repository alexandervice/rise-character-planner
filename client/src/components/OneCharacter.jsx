import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams, Link} from "react-router-dom";
// import CancelButton from './CancelButton';

const OneCharacter = (props) => {
  const [character, setCharacter] = useState({});
  const {characterId} = useParams();
  const user = JSON.parse(localStorage.getItem("user"))
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        const characterResponse = await axios.get(`http://localhost:8000/api/users/${user._id}/characters/find/${characterId}`, {withCredentials: true});
        setCharacter(characterResponse.data.character);
        setLoading(false); // Update loading state for character data here
      } catch (error) {
        console.error("Error fetching character data:", error);
      }
    };
  
    fetchCharacterData();
  }, [characterId, user._id]);

  // console.log(character)

  return (
    loading? (<div>Loading...</div>) : (
    <div>
      <div className="p-5 flex flex-col dark:bg-zinc-900 flex-wrap justify-center">
        <div>
          <Link className='characterItem mr-5' to={`/${user._id}/characters`}><button className='bg-yellow-200 hover:bg-yellow-300 rounded px-1 border-solid border-2 border-yellow-400 mb-5 dark:text-black dark:hover:bg-yellow-200 dark:bg-yellow-300 dark:border-yellow-400'>All Characters</button></Link>
          <Link className='characterItem' to={`/${user._id}/characters/edit/${characterId}`}><button className='bg-blue-100 hover:bg-blue-200 rounded px-1 border-solid border-2 mt-5 border-blue-400 mb-5 dark:text-black'>Edit Character</button></Link>
        </div>
        <div className="mb-3 m-1 bg-zinc-800 p-5 rounded">
          <div className="sm:flex p-3 items-center">
            <div className="flex flex-none flex-col items-center justify-items-center mr-5">
              <p className="mb-2 text-3xl font-bold">{character.name}</p>
              <img className="w-40 h-40 sm:w-64 sm:h-64 rounded " src={`/images/characters/1onHPwMMRaG-Rttomzb4MSXXpP6nkdV-TVQXn7YpG.png`} alt={`${character.img}`} />
            </div>
            <p className="text-sm text-left hidden sm:block">{character.backstory}</p>
          </div>
        </div>
        {character.race && (
          <div className="mb-3 m-1 bg-zinc-800 p-5 rounded">
            <div className="flex items-start border-b border-zinc-400 pb-2">
              <p className="mx-3 text-lg align-top">Race: </p>
              <p className="text-zinc-400 text-start text-xs">This is your character's species. It determines your starting HP, MP, and Movement Speed. Each Race also grants Focus options, Attribute bonuses, and unique racial powers.</p>
            </div>
            <div className="sm:flex p-3 items-center">
              <div className="flex flex-none flex-col items-center justify-items-center mr-5">
                <p className="mb-2 text-xl font-bold">{character.race.name}</p>
                <img className="w-40 h-40 rounded " src={`/images/races/${character.race.image[0]}.jpg`} alt={`${character.race.name}`} />
              </div>
              <p className="text-sm text-left  hidden sm:block">{character.race.description}</p>
            </div>
          </div>
        )}
        {character.background && (
          <div className="mb-3 m-1 bg-zinc-800 p-5 rounded">
            <div className="flex items-start border-b border-zinc-400 pb-2">
              <p className="mx-3  text-lg">Background: </p>
              <p className="text-zinc-400 text-start text-xs">This is your character's species. It determines your starting HP, MP, and Movement Speed. Each Race also grants Focus options, Attribute bonuses, and unique racial powers.</p>
            </div>
            <div className="sm:flex p-3 items-center">
              <div className="flex flex-none flex-col items-center justify-items-center mr-5">
                <p className="mb-2 text-xl font-bold">{character.background.name}</p>
                <img className="w-40 h-40 rounded " src={`/images/backgrounds/${character.background.image[0]}.jpg`} alt={`${character.background.name}`} />
              </div>
              <p className="text-sm text-left hidden sm:block">{character.background.description}</p>
            </div>
          </div>
        )}
        <div className="mb-3 m-1 bg-zinc-800 p-5 rounded">
          {character.specializations.length > 0 ? (
            character.specializations.map((specialization) => (
              <span key={specialization._id}>
                <div className="sm:flex p-3 items-center">
                  <div className="flex flex-none flex-col items-center justify-items-center mr-5">
                    <p className="mb-2 text-xl font-bold">{specialization.name}</p>
                    <img className="w-40 h-40 rounded " src={`/images/specializations/${specialization.image[0]}.jpg`} alt={`${specialization.name}`} />
                  </div>
                  <p className="text-sm text-left hidden sm:block">{specialization.description}</p>
                </div>
              </span>
            ))
          ) : (
            <span>No specializations available</span>
          )}
        </div>
        <div className="mb-3 m-1 bg-zinc-800 p-5 rounded">
          {character.talents.length > 0 ? (
            character.talents.map((talent) => (
              <span key={talent._id}>
                <div className="sm:flex p-3 items-center">
                  <div className="flex flex-none flex-col items-center justify-items-center mr-5">
                    <p className="mb-2 text-xl font-bold">{talent.name}</p>
                    <img className="w-40 h-40 rounded " src={`/images/talents/${talent.image[0]}.jpg`} alt={`${talent.name}`} />
                  </div>
                  <p className="text-sm text-left hidden sm:block">{talent.description}</p>
                </div>
              </span>
            ))
          ) : (
            <span>No talents available</span>
          )}
        </div>
      </div>
      <Link className='characterItem mr-5' to={`/${user._id}/characters`}><button className='bg-yellow-200 hover:bg-yellow-300 rounded px-1 border-solid border-2 border-yellow-400 mb-5 dark:text-black dark:hover:bg-yellow-200 dark:bg-yellow-300 dark:border-yellow-400'>All Characters</button></Link>
      <Link className='characterItem' to={`/${user._id}/characters/edit/${characterId}`}><button className='bg-blue-100 hover:bg-blue-200 rounded px-1 border-solid border-2 mt-5 border-blue-400 mb-5 dark:text-black'>Edit Character</button></Link>
    </div>
    )
  );
};

export default OneCharacter;