import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DeleteButton from './DeleteCharacterButton';

const CharacterList = (props) => {
  const { characterArray, deleteCharacter } = props;
  const user = JSON.parse(localStorage.getItem('user'));

  // const [allRaces, setAllRaces] = useState([]);
  // const [allBackgrounds, setAllBackgrounds] = useState([]);
  // const [allSpecializations, setAllSpecializations] = useState([]);
  // const [allTalents, setAllTalents] = useState([]);

  // useEffect(() => {
  //   fetchRaceData();
  //   fetchBackgroundData();
  //   fetchSpecializationData();
  //   fetchTalentData();
  //   // Fetch data for additional tables as needed
  // }, []);

  // const fetchRaceData = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8000/api/races/find/all');
  //     setAllRaces(response.data.races);
  //   } catch (error) {
  //     console.error('Error fetching data for races:', error);
  //   }
  // };

  // const fetchBackgroundData = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8000/api/backgrounds/find/all');
  //     setAllBackgrounds(response.data.backgrounds);
  //   } catch (error) {
  //     console.error('Error fetching data for backgrounds:', error);
  //   }
  // };

  // const fetchSpecializationData = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8000/api/specializations/find/all');
  //     setAllSpecializations(response.data.specializations);
  //   } catch (error) {
  //     console.error('Error fetching data for specializations:', error);
  //   }
  // };

  // const fetchTalentData = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8000/api/talents/find/all');
  //     setAllTalents(response.data.talents);
  //   } catch (error) {
  //     console.error('Error fetching data for talents:', error);
  //   }
  // };

  // const getRaceNameById = (raceId) => {
  //   const race = allRaces.find((race) => race._id === raceId);
  //   return race ? race.name : '';
  // };

  // const getBackgroundNameById = (backgroundId) => {
  //   const background = allBackgrounds.find((background) => background._id === backgroundId);
  //   return background ? background.name : '';
  // };

  // const getSpecializationNamesByIds = (specializationIds) => {
  //   const specializations = allSpecializations.filter((specialization) =>
  //     specializationIds.includes(specialization._id)
  //   );
  //   return specializations.map((specialization) => specialization.name).join(' | ');
  // };

  // const getTalentNamesByIds = (talentIds) => {
  //   const talents = allTalents.filter((talent) => talentIds.includes(talent._id));
  //   return talents.map((talent) => talent.name).join(' | ');
  // };

  // console.log(characterArray)

  return (
    <div className='inline-block rounded p-5 bg-zinc-900'>
      <h3 className='font-bold mb-4 text-4xl'>{user.userName}'s Characters</h3>
      {characterArray.map((character, index) => {
            // const raceName = getRaceNameById(character.race);
            // const backgroundName = getBackgroundNameById(character.background);
            // const specializationNames = getSpecializationNamesByIds(character.specializations);
            // const talentNames = getTalentNamesByIds(character.talents);
            return (
              <div key={index} className="mb-3 m-1 bg-zinc-800 p-5 rounded">
                <div className="flex p-3 items-center">
                  <div className="flex flex-none flex-col items-center justify-items-center mr-5">
                    <p className="mb-2 text-3xl font-bold">{character.name}</p>
                    <img className="w-48 h-48 rounded " src={`/images/characters/1onHPwMMRaG-Rttomzb4MSXXpP6nkdV-TVQXn7YpG.png`} alt={`${character.img}`} />
                  </div>
                  <p className="text-sm text-left hidden sm:block">{character.backstory}</p>
                </div>
                <div className='dark:text-black'>
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
      {/* <table className='table-auto border border-slate-500  border border-slate-500 font-semibold text-slate-900 rounded'>
        <thead className='bg-slate-100 text-xl'>
          <tr>
            <th className='py-2 px-5'>Image</th>
            <th className='py-2 px-5'>Name</th>
            <th className='py-2 px-5'>Details</th>
            <th className='py-2 px-5'>Actions Available</th>
          </tr>
        </thead>
        <tbody>
          {characterArray.map((character, index) => {
            const raceName = getRaceNameById(character.race);
            const backgroundName = getBackgroundNameById(character.background);
            const specializationNames = getSpecializationNamesByIds(character.specializations);
            const talentNames = getTalentNamesByIds(character.talents);

            return (
              <tr key={index}>
                <td className='py-2 px-3'>
                  <img className="w-40 h-40 rounded " src={`/images/characters/1onHPwMMRaG-Rttomzb4MSXXpP6nkdV-TVQXn7YpG.png`} alt={`${character.img}`} />
                </td>
                <td className='py-2 px-3 text-xl dark:text-white'>{character.name}</td>
                <td className='py-2 px-3 text-xs dark:text-white'>
                  <div className='flex'>
                    <p className='mr-3'>Race:</p>
                    <p className='text-yellow-500'>{raceName}</p>
                  </div>
                  <div className='flex'>
                    <p className='mr-3 '>Background:</p>
                    <p className='text-yellow-500'>{backgroundName}</p>
                  </div>
                  <div className='flex'>
                    <p className='mr-3'>Specializations:</p>
                    <p className='text-yellow-500'>{specializationNames}</p>
                  </div>
                  <div className='flex'>
                    <p className='mr-3'>Talents:</p>
                    <p className='text-yellow-500'>{talentNames}</p>
                  </div>
                </td>
                <td className='py-2 px-3'>
                  <Link className='mr-3' to={`/${user._id}/characters/${character._id}`}>
                    <button className='bg-green-200 hover:bg-green-300 rounded px-1 border-solid border-2 border-green-400'>View</button>
                  </Link>
                  <Link className='mr-3' to={`/${user._id}/characters/edit/${character._id}`}>
                    <button className='bg-blue-200 hover:bg-blue-300 rounded px-1 border-solid border-2 border-blue-400'>Edit</button>
                  </Link>
                  <DeleteButton characterId={character._id} successCallback={deleteCharacter} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
      <Link className='mr-3' to={`/${user._id}/characters/create`}>
        <button className='mt-5 bg-yellow-200 hover:bg-yellow-300 rounded px-1 border-solid border-2 border-yellow-400 mb-5 dark:text-black dark:hover:bg-yellow-200 dark:bg-yellow-300 dark:border-yellow-400'>Create a New Character</button>
      </Link>
    </div>
  );
};

export default CharacterList;