import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;
export const DataSourceConfig:DataSource = new DataSource({
    type: "mysql",
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    entities: ["src/models/*.ts"],
    logging: true,
    synchronize: false
})