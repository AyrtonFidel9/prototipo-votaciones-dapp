import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
    'vote-coac', // nombre de la base de datos 
    'postgres', // usuario
    '',//'postgres', // contraseña
    {
        host: 'localhost',//'172.20.249.214', //ip del servidor
        dialect: 'postgres', //nombre del gestor de base de datos - SQL
    },
);

