import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import { Listas } from './listas.model.js';

export const Elecciones = sequelize.define('elecciones',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dia: {
        type: DataTypes.DATE,
    },
    hora: {
        type: DataTypes.TIME
    },
    duracion: {
        type: DataTypes.INTEGER
    }
});

Elecciones.hasMany(Listas, {
    foreignKey: 'idElecciones',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'  
});

Listas.belongsTo(Elecciones, {
    foreignKey: 'idElecciones',
    targetKey: 'id'
});
