const User = require("../models/user.model");
const aws = require('aws-sdk');

// Create a new S3 instance
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_BUCKET_REGION
});


module.exports = {
  createCharacter: async (req, res) => {
    try {
      const { userId } = req.params;
      const { name, race, background, specializations, talents, backstory} = req.body;
      // console.log(req.body)

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      // Create the character object
      const character = {
        name,
        // img, // This will be the URL of the uploaded file
        race: JSON.parse(race),
        background: JSON.parse(background),
        specializations: specializations.map(JSON.parse),
        talents: talents.map(JSON.parse),
        backstory
      };

      if (req.file) {
        character.img = req.file.location; 
      }

      // console.log(character)
      if(character.name == null) {
        return res.status(500).json({ error: 'Characters must have a name' });
      }
      // Add the character to the user's characters array
      user.characters.push(character);
      user.markModified('characters');

      // Save the updated user document
      await user.save();

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

      const user = await User.findById(userId).populate({
        path: 'characters',
        match: { _id: characterId },
        populate: [
          { path: 'race', model: 'Races' },
          { path: 'background', model: 'Backgrounds' },
          { path: 'specializations', model: 'Specializations' },
          { path: 'talents', model: 'Talents' }
        ]
      });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const character = user.characters.id(characterId);
      if (!character) {
        return res.status(404).json({ error: 'Character not found' });
      }
      // console.log(character)
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
      const { name, race, background, specializations, talents, backstory} = req.body;
      // console.log(req.body)
      // const img = req.file.location;

      if(name == null) {
        return res.status(500).json({ error: 'Characters must have a name' });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const character = user.characters.id(characterId);
      if (!character) {
        return res.status(404).json({ error: 'Character not found' });
      }

      if (req.file) {
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: new URL(character.img).pathname.substring(1)
        };
        try {
          // Awaiting s3.deleteObject promise
          const data = await s3.deleteObject(params).promise();
          console.log(data);
        } catch(err) {
          console.log(err, err.stack);
        }
        character.img = req.file.location; 
      }
      // Delete the image from the S3 bucket

      // Update the character fields
      character.name = name;
      // character.img = img;
      character.race = JSON.parse(race);
      character.background = JSON.parse(background);
      character.specializations = specializations.map(JSON.parse);
      character.talents = talents.map(JSON.parse);
      character.backstory = backstory;

      // Save the updated user document
      user.markModified('characters');
      await user.save();
      // console.log(character)
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
      
      // Remember the image key before deleting the character
      if(character.img) {
        const imageKey = new URL(character.img).pathname.substring(1);
        // Remove the character from the user's characters array
        character.deleteOne();
        user.markModified('characters');
        // Save the updated user document
        await user.save({ validateBeforeSave: false });
  
        // Delete the image from the S3 bucket
        
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: imageKey,
        };
        try {
          // console.log("attempting to delete image from S3 Bucket", imageKey)
          // Awaiting s3.deleteObject promise
          const data = await s3.deleteObject(params).promise();
          console.log(data);
        } catch(err) {
          console.log(err, err.stack);
          return res.status(500).json({ error: err.message });
        }
      } else {
        // Remove the character from the user's characters array
        character.deleteOne();
        user.markModified('characters');
        // Save the updated user document
        await user.save({ validateBeforeSave: false });
      }
      return res.status(200).json({ message: 'Character deleted' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  }
}

