import express from 'express';
import connectDatabase from './database/db.js';
import dotenv from 'dotenv';
import Router from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

app.use(cors())
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', Router);


// const PORT = 8000;
const PORT = process.env.PORT || 3000;


connectDatabase();


app.listen(PORT, () => {
  console.log('***************************************************************');
  console.log(`Server is running successfully on this http://localhost:${PORT}`);
  console.log('***************************************************************');
})

// Connection();