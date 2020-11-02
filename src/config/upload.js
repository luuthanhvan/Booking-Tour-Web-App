/* Using multer middleware to handle upload file */
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: './src/public/files_uploaded',
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage });

module.exports = upload;
