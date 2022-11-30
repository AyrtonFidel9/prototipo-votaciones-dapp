import Sequelize from 'sequelize';

export const sequelize = new Sequelize('vote-coac', 'postgres', 'postgres', {
    host: '172.30.113.159',
    dialect: 'postgres',
},
);

