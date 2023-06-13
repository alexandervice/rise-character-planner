import React, {useState} from 'react';

const Specializations = (props) => {
  const {allSpecializations, characterData, setCharacterData} = props
  const [hovered, setHovered] = useState(null);

  const handleSpecializationSelection = (selected) => {
    const currentSpecializations = characterData.specializations;
    
    // Check if the selected specialization is already in the array
    const index = currentSpecializations.indexOf(selected);
    
    let updatedSpecializations;
  
    if (index === -1) {
      // If not present, check if the limit of 2 specializations has been reached
      if (currentSpecializations.length < 2) {
        updatedSpecializations = [...currentSpecializations, selected];
      } else {
        // If the limit is reached, do not add the specialization
        return;
      }
    } else {
      // If already present, remove it from the array
      updatedSpecializations = [...currentSpecializations];
      updatedSpecializations.splice(index, 1);
    }
  
    setCharacterData(data => ({ ...data, specializations: updatedSpecializations }));
    console.log(updatedSpecializations)
    console.log(characterData)
  };


  return (
    <div className="flex bg-zinc-800 rounded flex-wrap justify-center py-5">
      <p className='text-xl pb-5'>Please select up to two of the following Specializations. Your Specializations represent your desired playstyle and greatly influence your combat abilities. Please see the documentation page for more details.</p>
      {allSpecializations.map((specialization, index) => (
        <div key={index} className={`m-4  ${characterData.specializations.includes(specialization) ? 'border-4 border-blue-500' : ''}`} onClick={() => handleSpecializationSelection(specialization)} onMouseEnter={() => setHovered(specialization)} onMouseLeave={() => setHovered(null)}>
          <img src={`/images/specializations/${specialization.name}`} alt={specialization.name} className="cursor-pointer w-40 h-40" />
          <p className="text-center text-xl my-2">{specialization.name}</p>
          {hovered === specialization && (
          <div className="absolute left-1/2 transform -translate-x-1/2 bg-zinc-900 p-4 rounded">
            <p className="text-center text-sm ">{specialization.description}</p>
          </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Specializations;