const User = require("../models/user.model");


module.exports = {
  createCharacter: async (req, res) => {
    try {
      const { userId } = req.params;
      const { name, race, background, specializations, talents, backstory } = req.body;
      // const img = req.file.path;
      // const { name } = req.body;
      // const img = ""
      // races = []

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Create the character object
      const character = {
        name,
        // img,
        race,
        background,
        specializations,
        talents,
        backstory
      };

      // Add the character to the user's characters array
      user.characters.push(character);
      // console.log("attempting to save character")
      // Save the updated user document
      await user.save({ validateBeforeSave: false });

      return res.status(201).json({ character });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  },

  // Get all characters for a user
  getCharacters: async (req, res) => {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const characters = user.characters;
      return res.status(200).json({ characters });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  },

  // Get a specific character for a user
  getCharacterById: async (req, res) => {
    try {
      const { userId, characterId } = req.params;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const character = user.characters.id(characterId);
      if (!character) {
        return res.status(404).json({ error: 'Character not found' });
      }

      return res.status(200).json({ character });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  },

  // Update a specific character for a user
  updateCharacter: async (req, res) => {
    try {
      const { userId, characterId } = req.params;
      const { name, race, background, specializations, talents, backstory } = req.body;
      const img = req.file.path

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const character = user.characters.id(characterId);
      if (!character) {
        return res.status(404).json({ error: 'Character not found' });
      }

      // Update the character fields
      character.name = name;
      character.img = img;
      character.race = race;
      character.background = background;
      character.specializations = specializations;
      character.talents = talents
      character.backstory = backstory

      // Save the updated user document
      await user.save({ validateBeforeSave: false });

      return res.status(200).json({ character });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  },

  // Delete a specific character for a user
  deleteCharacter: async (req, res) => {
    try {
      const { userId, characterId } = req.params;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const character = user.characters.id(characterId);
      if (!character) {
        return res.status(404).json({ error: 'Character not found' });
      }
      
      // Remove the character from the user's characters array
      character.deleteOne();

      // Save the updated user document
      await user.save({ validateBeforeSave: false });

      return res.status(200).json({ message: 'Character deleted' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  }
}

// old way - when there was just one collection called characters:

// module.exports = {
//   // CREATE
//   createNewCharacter: (req, res) => {
//     Character.create(req.body)
//       .then(newCharacter => res.json({character: newCharacter}))
//       .catch(err => res.status(400).json(err));
//   },
//   // READ ALL
//   findAllCharacters: (req, res) => {
//     Character.find().sort({updatedAt:1})
//       .then(allCharacters => res.json({characters: allCharacters}))
//       .catch(err => res.json(err));
//   },
//   // READ ONE
//   findOneCharacter: (req, res) => {
//     Character.findOne({ _id: req.params.id })
//       .then(oneCharacter => res.json({character: oneCharacter}))
//       .catch(err => res.json(err));
//   },
//   // UPDATE
//   updateCharacter: (req, res) => {
//     Character.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
//       .then(updatedCharacter => res.json({character: updatedCharacter}))
//       .catch(err => res.status(400).json(err));
//   },
//   // DELETE
//   deleteCharacter: (req, res) => {
//     Character.deleteOne({ _id: req.params.id })
//       .then(result => res.json({result: result}))
//       .catch(err => res.json(err));
//   }
// }
