const multer = require("multer");
//const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public")
    },
    
    filename: function (req, file, cb) {
     
        let extension;
        if (file.mimetype == 'image/png') extension = 'png';
        if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg') extension = 'jpg'
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
    }
})
const upload = multer({
    storage:storage
});

module.exports = upload;