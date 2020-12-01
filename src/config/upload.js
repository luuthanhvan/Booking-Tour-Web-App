/* Using multer middleware to handle upload file */
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: './src/public/files_uploaded',
    filename: function (req, file, cb) {
        const data = req.body;
        // rename name of the file before upload: fileName = destId + original file name
        let fileName = data.destId + "_" + file.originalname; // eg: HCM_003_Ben_Thanh_market.jpg
        // console.log(fileName);
        cb(null, fileName)
    }
});
const upload = multer({ storage: storage });

module.exports = upload;
