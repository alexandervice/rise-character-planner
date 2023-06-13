import React from 'react';

const Race = (props) => {
  const {allRaces, characterData, setCharacterData} = props


  const handleRaceSelection = (selectedRace) => {
    setCharacterData(data => ({ ...data, race: selectedRace }));
  }


  return (
    <div className="flex bg-zinc-800 rounded flex-wrap justify-center">
      {allRaces.map((race, index) => (
        <div key={index} className={`m-4  ${characterData && characterData.race === race ? 'border-4 border-blue-500' : ''}`} onClick={() => handleRaceSelection(race)}>
          <img src={`/images/races/${race.image[0]}`} alt={race.name} className="cursor-pointer w-40 h-40" />
          <p className="text-center text-xl my-2">{race.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Race;