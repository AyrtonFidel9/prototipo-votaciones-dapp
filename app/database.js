import Sequelize from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DATABASE_NAME, // nombre de la base de datos
  process.env.DATABASE_USER, // usuario
  process.env.DATABASE_PASSWORD, // contraseña
  {
    host: process.env.DATABASE_URL, //ip del servidor
    port: 5432,
    dialect: "postgres", //nombre del gestor de base de datos - SQL
  }
);
