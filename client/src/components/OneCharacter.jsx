import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams, Link} from "react-router-dom";
import CancelButton from './CancelButton';

const OneCharacter = (props) => {
  const [character, setCharacter] = useState({});
  const {characterId} = useParams();
  const user = JSON.parse(localStorage.getItem("user"))
  // declare the character info to be filled in later
  const [race, setRace] = useState({});
  const [background, setBackground] = useState({});
  const [specializations, setSpecializations] = useState([]);
  const [talents, setTalents] = useState([]);

  const [loading, setLoading] = useState(true);


  const fetchData = async (endpoint, setData) => {
    try {
      const response = await axios.get(endpoint);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } 
  };
  

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        const characterResponse = await axios.get(
          `http://localhost:8000/api/users/${user._id}/characters/find/${characterId}`
        );
        setCharacter(characterResponse.data.character);
        setLoading(false); // Update loading state here since character data is fetched
      } catch (error) {
        console.error("Error fetching character data:", error);
      }
    };

    fetchCharacterData();
  }, [characterId, user._id]);

  useEffect(() => {
    
    const fetchAllData = async () => {
      try {
        const promises = [];
        if (Object.keys(character).length > 0) {
          promises.push(
            fetchData(`http://localhost:8000/api/races/find/${character.race}`, setRace),
            fetchData(`http://localhost:8000/api/backgrounds/find/${character.background}`, setBackground),
          );
          }

        if (character.specializations && character.specializations.length > 0) {
          // Fetch data for each specialization ID in the array
          character.specializations.forEach((specializationId) => {
            promises.push(fetchData(`http://localhost:8000/api/specializations/find/${specializationId}`, (data) => {
              setSpecializations((prevSpecializations) => [...prevSpecializations, data]);
            }));
          });
        }
        if (character.talents && character.talents.length > 0) {
          // Fetch data for each talent ID in the array
          character.talents.forEach((talentId) => {
            promises.push(fetchData(`http://localhost:8000/api/talents/find/${talentId}`, (data) => {
              setTalents((prevTalents) => [...prevTalents, data]);
            }));
          });
        }
        await Promise.all(promises);
      } catch (error) {
        console.error("Error fetching additional data:", error);
      }
    };

    fetchAllData();
  }, [character]);

  console.log(race.race)
  return (
    loading? (<div>Loading...</div>) : (
    <div>
      <div className="p-5 flex flex-col dark:bg-zinc-900 flex-wrap justify-center">
        <div>
          <Link className='characterItem' to={`/${user._id}/characters/edit/${characterId}`}><button className='bg-blue-100 hover:bg-blue-200 rounded px-1 border-solid border-2 mt-5 border-blue-400 mb-5 dark:text-black'>Edit Character</button></Link>
        </div>
        <div className="mb-3 m-1 bg-zinc-800 p-5 rounded">
          <div className="flex p-3 items-center">
            <div className="flex flex-none flex-col items-center justify-items-center mr-5">
              <p className="mb-2 text-3xl font-bold">{character.name}</p>
              <img className="w-64 h-64 rounded " src={`/images/characters/${character.img}`} alt={`${character.name}`} />
            </div>
            <p className="text-sm text-left">{character.backstory}</p>
          </div>
        </div>
        {race.race && (
          <div className="mb-3 m-1 bg-zinc-800 p-5 rounded">
            <div className="flex p-3 items-center">
              <div className="flex flex-none flex-col items-center justify-items-center mr-5">
                <p className="mb-2 text-xl font-bold">{race.race.name}</p>
                <img className="w-40 h-40 rounded " src={`/images/races/${race.race.image[0]}.jpg`} alt={`${race.race.name}`} />
              </div>
              <p className="text-sm text-left">{race.race.description}</p>
            </div>
          </div>
        )}
        {background.background && (
          <div className="mb-3 m-1 bg-zinc-800 p-5 rounded">
          <div className="flex p-3 items-center">
            <div className="flex flex-none flex-col items-center justify-items-center mr-5">
              <p className="mb-2 text-xl font-bold">{background.background.name}</p>
              <img className="w-40 h-40 rounded " src={`/images/races/${background.background.image[0]}.jpg`} alt={`${background.background.name}`} />
            </div>
            <p className="text-sm text-left">{background.background.description}</p>
          </div>
        </div>
        )}
        <div className="mb-3">
          <strong>Specializations:</strong>{" "}
          {specializations.length > 0 ? (
            specializations.map((specialization) => (
              <span key={specialization._id}>{specialization.name} </span>
            ))
          ) : (
            <span>No specializations available</span>
          )}
        </div>
        <div className="mb-3">
          <strong>Talents:</strong>{" "}
          {talents.length > 0 ? (
            talents.map((talent) => (
              <span key={talent._id}>{talent.name} </span>
            ))
          ) : (
            <span>No talents available</span>
          )}
        </div>
      </div>
      <Link className='characterItem' to={`/${user._id}/characters/edit/${characterId}`}><button className='bg-blue-100 hover:bg-blue-200 rounded px-1 border-solid border-2 mt-5 border-blue-400 mb-5 dark:text-black'>Edit Character</button></Link>
    </div>
    )
  );
};

export default OneCharacter;