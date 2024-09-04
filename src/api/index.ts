import express, { Request, Response } from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { configDotenv } from 'dotenv';
import { DataSource } from 'typeorm';
import { Images } from './Image';

const app = express();
const port = process.env.PORT || 443;

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

    await AppDataSource.initialize();

    switch(request.method){
      case 'GET':
        if(request.url === '/images'){
          const images = await AppDataSource.getRepository(Images).find();
          response.json({items: images});
        }
        else{
          response.status(404).send('Not found');
        }
        break;
    }
  }
  catch(error)
  { 
    console.error("Error de conexión: ", error); 
  }

}