import { DataSource } from "typeorm";
import { Images } from "../images";

export const createPostgreSQLConection = async () => {
  try {
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

    return AppDataSource;
  } catch (error) {
    console.error("PostgreSQL connection error: ", error);
  }
};
