import Sequelize from 'sequelize';

export const sequelize = new Sequelize('vote-coac', 'postgres', 'postgres', {
    host: '172.19.152.30',
    dialect: 'postgres',
},
);

