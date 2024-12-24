
import multer, { diskStorage } from "multer";
//import multer, { diskStorage } from 'multer';

// Set up storage configuration
const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // specify the folder where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // generate a unique name for each file
  }
});

// Create an upload instance
const upload = multer({ storage: storage });

// Example POST route to handle file upload
app.post("/users/register", upload.single('profilePicture'), (req, res) => {
  // 'profilePic' is the name of the input field in your form
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send('File uploaded successfully!');
});

