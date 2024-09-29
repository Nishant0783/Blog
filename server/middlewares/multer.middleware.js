
import multer from 'multer';
console.log("Multer called");
const storage = multer.diskStorage({


    destination: function (req, file, cb) {
        cb(null, './public/temp');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

console.log("Multer upload called")
export const upload = multer(

    {
        storage,
    }
)