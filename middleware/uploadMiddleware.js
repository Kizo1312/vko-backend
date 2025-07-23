import multer from 'multer';
import path from 'path';

// Define storage strategy
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save in /uploads folder
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + ext); // e.g., 17234923-812387123.jpg
  }
});

const upload = multer({ storage });

export default upload;
