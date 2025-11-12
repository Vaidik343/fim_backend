const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../uploads');
console.log("🚀 ~ uploadDir:", uploadDir)
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });
console.log("🚀 ~ upload:", upload)

router.post('/upload', upload.single('file'), (req, res) => {
  console.log('📦 File received:', req.file.filename);
  res.json({ message: 'File uploaded successfully', file: req.file.filename });
});

module.exports = router;
