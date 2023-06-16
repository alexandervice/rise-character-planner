const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../client/public/images/characters/', req.params.characterId))
  },
  filename: function (req, file, cb) {
    cb(null, 'character.jpg') // saving as the same filename ensures only one image per character
  }
});

const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|png)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });