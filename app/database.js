import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
    'vote-coac', // nombre de la base de datos 
    'postgres', // usuario
    '', // contraseña
    {
        host: 'localhost', //ip del servidor
        dialect: 'postgres', //nombre del gestor de base de datos - SQL
    },
);

