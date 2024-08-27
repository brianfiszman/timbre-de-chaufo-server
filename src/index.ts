import express, { Request, Response } from 'express';
import { list } from '@vercel/blob';
import { configDotenv } from 'dotenv';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"



const app = express();
const port = process.env.PORT || 8080;

// const getImages = async () => {
//   const { blobs } = await list();

//   const imagesURLs = blobs.map(blob => {
//     return {name: blob.pathname.substring(0, blob.pathname.lastIndexOf('.webp')), url: blob.url};  
//   });

// }

configDotenv({ path: ".env.local" }); // read .env.config

app.get('/', async (_req: Request, res: Response) => {
  const { blobs } = await list();
  return res.json(blobs);
})

app.get('/ping', (_req: Request, res: Response) => {
  return res.send('pong 🏓');
})

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
})
