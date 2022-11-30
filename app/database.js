import Sequelize from 'sequelize';

export const sequelize = new Sequelize('vote-coac', 'postgres', 'postgres', {
    host: '172.24.57.77',
    dialect: 'postgres',
},
);

