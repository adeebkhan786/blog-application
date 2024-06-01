
// import multer from "multer";
// import { GridFsStorage } from "multer-gridfs-storage";
// // dotenv.config();

// const storage = new GridFsStorage({
//   //mongo db ka url pass krna hai jnha hme upload krna hai image ko.
//   url: ` mongodb://localhost:27017/blog-app `,
//   // url: process.env.DB_URI,
//   options: { useNewUrlParser: true },
//   file: (request, file) => {
//       // check krte hain ki kaun kaun si images hum upload krna chahte hain.
//       const match = ["image/png", "image/jpg", "image/jpeg"];
//       if (match.indexOf(file.mimetype) === -1) {
//         return (`${Date.now()}-blog-${file.originalname}`)
//       }

//       const filename = `${Date.now()}-blog-${file.originalname}`;
//       return ({
//         bucketName: "photos",
//         filename: filename,
//         metadata: {
//           originalname: file.originalname
//         }
//       });
//   }
// })

// const upload = multer({ storage });

// export default upload;





import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';


// Create storage engine for multer-gridfs-storage
const storage = new GridFsStorage({
  url: 'mongodb://localhost:27017/blog-app',
  file: (request, file) => {
    const filename = `${Date.now()}-blog-${file.originalname}`;
    const fileInfo = {
      filename: filename,
      bucketName: 'photos' // specify the bucket name
    };
    return fileInfo;
  }
});

const imageFilter = async (request, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    // Create an error message to be returned in case validation fails
    request.fileValidationError = 'Invalid image format. Only jpeg, jpg, png and gif images are allowed.';
    return cb(new Error('Invalid image format'), false);
  }
  await cb(null, true);
};

// Create a multer instance with the storage and fileFilter options
const upload = multer({ storage, fileFilter: imageFilter });

export default upload;


