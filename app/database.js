import Sequelize from 'sequelize';

export const sequelize = new Sequelize('vote-coac', 'postgres', '', {
    host: 'localhost',
    dialect: 'postgres'
}
);

