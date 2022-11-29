import Sequelize from 'sequelize';

export const sequelize = new Sequelize('vote-coac', 'postgres', 'postgres', {
    host: '172.18.5.72',
    dialect: 'postgres',
},
);

