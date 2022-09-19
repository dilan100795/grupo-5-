const path = require('path')
const multer = require('multer');
/*
const storage = multer.diskStorage({
    destination: (req,file,callback) => {
        callback(null,'./public/images/imagenesDePerfil')
    },
    filename:(req,file,callback) => {
        callback(null,'avatar-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage
    })
*/