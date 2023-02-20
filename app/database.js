import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
    'vote-coac', // nombre de la base de datos 
    'postgres', // usuario
    'postgres', // contraseña
    {
        host: 'localhost', //ip del servidor
        port: 5432,
        dialect: 'postgres', //nombre del gestor de base de datos - SQL
    },
    // 'Database-vote-coac-dapp', // nombre de la base de datos 
    // 'dbmasteruser', // usuario
    // 'dnr19MGecto)D&y!m~]up?>;1DbZmGhi', // contraseña
    // {
    //     host: 'ls-63d20d592112abff3e464a5115686454375bfbcc.cqzhclnqhlcc.us-east-1.rds.amazonaws.com', //ip del servidor
    //     port: 5432,
    //     dialect: 'postgres', //nombre del gestor de base de datos - SQL
    // },
);

