import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
    'vote-coac', // nombre de la base de datos 
    'postgres', // usuario
    '', // contraseña
    {
        host: 'localhost', //ip del servidor
        port: 5432,
        dialect: 'postgres', //nombre del gestor de base de datos - SQL
    },
    // 'votecoacdb', // nombre de la base de datos 
    // 'postgres', // usuario
    // 'postgres1289', // contraseña
    // {
    //     host: 'votaciones-database.cku9jbxpkmwv.us-east-1.rds.amazonaws.com', //ip del servidor
    //     port: 5432,
    //     dialect: 'postgres', //nombre del gestor de base de datos - SQL
    // },
);

