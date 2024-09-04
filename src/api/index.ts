import express, { Request, Response } from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { configDotenv } from 'dotenv';
import { DataSource } from 'typeorm';
import { Images } from './Image';

const app = express();
const port = process.env.PORT || 3000;

configDotenv({ path: ".env.local" }); // read .env.config


export default async function handler(request: VercelRequest, response: VercelResponse){
  try
  {
    const AppDataSource = new DataSource({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      synchronize: false,
      logging: true,
      ssl: { rejectUnauthorized: false },
      entities: [Images],
      subscribers: [],
      migrations: [],
    });

    AppDataSource.initialize()
      .then(() => {
        app.get('/', (request: Request, response: Response) => {
          response.send('Hello World!');
        });
        app.get('/images', async (request: Request, response: Response) => {
          console.log("Prueba");
          try{
            const images = await AppDataSource.getRepository(Images).find();
            response.json({items: images});
          }
          catch(error)
          { 
            console.error("Error de conexión: ", error); 
          }
        });
      })
      .catch((err) => {
        console.error("Error during Data Source initialization:", err);
      });
  }
  catch(error)
  { 
    console.error("Error de conexión: ", error); 
  }

}