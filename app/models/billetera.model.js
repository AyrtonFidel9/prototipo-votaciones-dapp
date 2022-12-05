import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import { Listas } from './listas.model.js';

export const Billetera = sequelize.define('billetera',{
    address: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    privateKey: {
        type: DataTypes.JSON,
    }
});


Listas.hasOne(Billetera);

Billetera.belongsTo(Listas);


