const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3-v2');
const sharp = require("sharp")

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_BUCKET_REGION
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    // acl: 'public-read',
    shouldTransform: function (req, file, cb) {
      cb(null, /^image/i.test(file.mimetype))
    },
    limits: {
      fileSize: 1024 * 1024 * 5 // Limit file size to 5MB
    },
    transforms: () =>
      sharp()
        .resize(500, null),
    key: function (req, file, cb) {
        cb(null, "images/characters/" + Date.now().toString())
      },
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    }
  })
});

module.exports = upload;