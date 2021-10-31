const multer = require("multer");
const path = require("path");



const storage = multer.diskStorage({
    destination: "/var/www/html/formation/apotheose/projet-03-kid-oz-anges-back/app/public/",
    filename: function (req, file, cb) {
        
        let extension;
        if (file.mimetype == 'image/png') extension = 'png';
        if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg') extension = 'jpg'
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
    }
})

const upload = multer({
    storage
});

module.exports = upload;