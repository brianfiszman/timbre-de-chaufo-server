import express, { Request, Response } from 'express';
import { list } from '@vercel/blob';
import { configDotenv } from 'dotenv';
import { DataSource } from 'typeorm';
import { Images } from './Image';

const app = express();

configDotenv({ path: ".env.local" }); // read .env.config

let dataSource: any;

async function getConnection() {
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
  console.log("Connection has been established successfully.");

  dataSource = AppDataSource;
}

getConnection().catch(error => console.error("Error de conexión: ", error));

const getImages = async () => {
  const images = await dataSource.getRepository(Images).find();
  return images;
}


app.get('/', async (_req: Request, res: Response) => {
  return res.send("Hello World");
})

app.get('/images',  async (_req: Request, res: Response) => {
  try{
    const response = await getImages();
    res.send(response)
  }
  catch(error){
    console.error("Error al obtener las imágenes: ", error)
  }
})