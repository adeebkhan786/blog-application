// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then((data) => {
    // mongoose.connect(process.env.DB_URI).then((data) => {
    console.log(`MongoDB connected with server data: ${data.connection.host}`)
  })
    .catch((err) => {
      console.log(`Database connection failed!, ${err}`)
    })
}


export default connectDatabase;