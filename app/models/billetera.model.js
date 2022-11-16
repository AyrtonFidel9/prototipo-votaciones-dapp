import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

export const Billetera = sequelize.define('billetera',{
    address: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    privateKey: {
        type: DataTypes.JSON,
    }
});
