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

  const [allRaces, setAllRaces] = useState([]);
  const [allBackgrounds, setAllBackgrounds] = useState([]);
  const [allSpecializations, setAllSpecializations] = useState([]);
  const [allTalents, setAllTalents] = useState([]);

  

  const fetchRaceData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/races/find/all');
      setAllRaces(response.data.races);
    } catch (error) {
      console.error('Error fetching data for races:', error);
    }
  };

  const fetchBackgroundData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/backgrounds/find/all');
      setAllBackgrounds(response.data.backgrounds);
    } catch (error) {
      console.error('Error fetching data for backgrounds:', error);
    }
  };

  const fetchSpecializationData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/specializations/find/all');
      setAllSpecializations(response.data.specializations);
    } catch (error) {
      console.error('Error fetching data for specializations:', error);
    }
  };

  const fetchTalentData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/talents/find/all');
      setAllTalents(response.data.talents);
    } catch (error) {
      console.error('Error fetching data for talents:', error);
    }
  };

  const getRaceById = (raceId) => {
    const race = allRaces.find((race) => race._id === raceId);
    setRace(race);
  };

  const getBackgroundById = (backgroundId) => {
    const background = allBackgrounds.find((background) => background._id === backgroundId);
    setBackground(background);
  };

  const getSpecializationsByIds = (specializationIds) => {
    if (!specializationIds) {
      setSpecializations([]);
      return;
    }
    const specializations = specializationIds.map((id) =>
      allSpecializations.find((specialization) => specialization._id === id)
    );
    setSpecializations(specializations);
  };

  const getTalentsByIds = (talentIds) => {
    if (!talentIds) {
      setSpecializations([]);
      return;
    }
    const talents = talentIds.map((id) =>
      allTalents.find((talent) => talent._id === id)
    );
    setTalents(talents);
  };
  

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/${user._id}/characters/find/${characterId}`)
      .then( res => {
        // console.log(res.data.character);
        setCharacter(res.data.character);
      })
      .catch( err=>console.log(err) );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const characterResponse = await axios.get(
          `http://localhost:8000/api/users/${user._id}/characters/find/${characterId}`
        );
        setCharacter(characterResponse.data.character);

        await fetchRaceData();
        await fetchBackgroundData();
        await fetchSpecializationData();
        await fetchTalentData();
      } catch (error) {
        console.error("Error fetching character data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    getRaceById(character.race);
    getBackgroundById(character.background);
    getSpecializationsByIds(character.specializations)
    getTalentsByIds(character.talents)
    // Fetch data for additional info
  }, [characterId, user._id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="p-5 flex flex-col dark:bg-zinc-900 flex-wrap justify-center">
        <h1 className="text-3xl font-bold mb-5">{character.name}</h1>
        <img src={`/images/characters/${character.img}`} alt={character.name} className="mb-3 w-40 h-40" />
        <div className="mb-3">
          <strong>Backstory:</strong> {character.backstory}
        </div>
        {race && (
          <div className="mb-3 m-1 bg-zinc-800 p-5 rounded">
            <strong>Race:</strong> {race.name}
            <div className="flex p-3">
              <img className=" w-48 h-48 rounded mr-5" src={`/images/races/${race.image}1.jpg`} alt={`${race.name}`} />
              <p className="text-sm text-left">{race.description}</p>
            </div>
          </div>
          
        )}
        {background && (
          <div className="mb-3">
            <strong>Background:</strong> {background.name}
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
            talents.map((talent) => <span key={talent._id}>{talent.name} </span>)
          ) : (
            <span>No talents available</span>
          )}
        </div>
    </div>
      <CancelButton/>
      <Link className='characterItem' to={`/${user._id}/characters/edit/${characterId}`}><button className='bg-blue-100 hover:bg-blue-200 rounded px-1 border-solid border-2 mt-5 border-blue-400 mb-5 dark:text-black'>Edit Character</button></Link>
    </div>
  );
};

export default OneCharacter;