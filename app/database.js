import Sequelize from 'sequelize';

export const sequelize = new Sequelize('vote-coac', 'postgres', 'postgres', {
    host: '172.31.89.32',
    dialect: 'postgres',
},
);

