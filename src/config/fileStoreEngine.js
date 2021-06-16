const multer = require('multer');

const fileStoreEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname);
    }, 
})

const upload = multer({
    storage: fileStoreEngine,
    fileFilter: (req, file, cb) => {
        if(file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
            cb(null, true);
        }else {
            cb(null, false);
        }
    },
    limits: {
        fileSize: 3145728,
    }
});

module.exports = upload;

