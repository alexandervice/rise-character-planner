import React, {useState} from 'react';

const Background = (props) => {
  const {allBackgrounds, characterData, setCharacterData} = props;
  const [hovered, setHovered] = useState(null);


  const handleBackgroundSelection = (selected) => {
    setCharacterData(data => ({ ...data, background: selected }));
  }


  return (
    <div className="flex bg-zinc-800 rounded flex-wrap justify-center py-5">
      <p className='text-xl pb-5'>Please select one of the following backgrounds. This will determine what your character spent their time doing prior to becoming an adventurer, as well as your starting gear. Please see the documentation page for more details.</p>
      {allBackgrounds.map((background, index) => (
        <div key={index} className={`m-4  ${characterData && characterData.background === background ? 'border-4 border-blue-500' : ''}`} onClick={() => handleBackgroundSelection(background)} onMouseEnter={() => setHovered(background)} onMouseLeave={() => setHovered(null)}>
          <img src={`/images/backgrounds/${background.name}`} alt={background.name} className="cursor-pointer w-40 h-40" />
          <p className="text-center text-yellow-500 my-2">{background.name}</p>
          {hovered === background && (
          <div className="absolute left-1/2 transform -translate-x-1/2 bg-zinc-900 p-4 rounded">
            <p className="text-center text-sm ">{background.description}</p>
          </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Background;