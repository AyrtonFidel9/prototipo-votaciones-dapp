import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
    'vote-coac', // nombre de la base de datos 
    'postgres', // usuario
    '', // contraseña
    {
        host: '127.0.0.1', //ip del servidor
        dialect: 'postgres', //nombre del gestor de base de datos - SQL
    },
);

