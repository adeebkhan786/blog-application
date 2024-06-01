import grid from "gridfs-stream";
import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";

const url = 'http://localhost:8000';


// let gfs, gridfsBucket;
// const conn = mongoose.connection;
// // const conn = mongoose.createConnection('mongodb://localhost:27017/blog-app');
// conn.once('open', () => {
//   gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
//     bucketName: 'fs'
//   });
//   gfs = grid(conn.db, mongoose.mongo);
//   gfs.collection('fs');
// });




let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'photos'
  });
  gfs = gridfsBucket;
});



export const uploadImage = async (request, response) => {
  if (!request.file) {
    return response.status(404).json({
      msg: 'File not found'
    })
  }

  const imageUrl = `${url}/file/${request.file.filename}`;

  return response.status(200).json({
    imageUrl,
  })
};




export const getImage = async (request, response) => {
  // use grdifs-stream package for convert chunk data into original image.
  try {
    // const file = await gfs.files.find({ filename: request.params.filename });
    const file = await gfs.find({ filename: request.params.filename }).toArray();
    if (!file.length) {
      return response.status(404).json({ error: 'File not found' });
    }
    // const readStream = gridfsBucket.openDownloadStream(file._id);
    const readStream = gridfsBucket.openDownloadStream(file[0]._id);
    await readStream.pipe(response);
  } catch (error) {
    return response.status(500).json({
      msg: error.message
    })
  }
}