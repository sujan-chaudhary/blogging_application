import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "server/uploads");
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now()+ "-" + file.originalname);
    }
})

const fileFilter = (req, file, cb) =>{
    const allowedTypes = ["image/jpeg", "image/png", "image/gif","image/jpg"];
    if(allowedTypes.includes(file.mimetype)){
        cb(null, true);
    }else{
        cb(new Error("Invalid file type. Only jpeg, png, and gif allowed"), false);
    }
}


const upload = multer({storage, fileFilter});

export default upload;