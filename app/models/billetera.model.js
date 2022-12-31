import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import { Representantes } from './representantes.model.js';
import { Socios } from './socios.model.js';

export const Billetera = sequelize.define('billetera',{
    address: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    privateKey: {
        type: DataTypes.JSON,
    }
});


Representantes.hasOne(Billetera, {
    foreignKey: 'billetera',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Billetera.belongsTo(Representantes);


Socios.hasOne(Billetera, {
    foreignKey: 'billetera',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Billetera.belongsTo(Socios);



