import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import { Listas } from './listas.model.js';
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


Listas.hasOne(Billetera, {
    foreignKey: 'billetera',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Billetera.belongsTo(Listas);


Socios.hasOne(Billetera, {
    foreignKey: 'billetera',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'  
});

Billetera.belongsTo(Socios);



