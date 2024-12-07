// multer-config.js
const multer = require('multer');

// Set storage engine for the uploaded file (profile picture)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define upload folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Name the file with a timestamp
  },
});

// Initialize multer with storage config
const upload = multer({ storage: storage });

module.exports = upload;
