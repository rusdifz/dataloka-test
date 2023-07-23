import { Entities } from "../../entities";

export const database = () => ({
  config_db: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
      ...Entities
    ],
    synchronize: process.env.ENV == "staging" ? true : false,
    autoLoadEntities: process.env.ENV == "staging" ? true : false,
    logging: process.env.ENV == "production" ? true : false,
  }
});
