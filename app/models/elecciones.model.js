import { DataTypes } from 'sequelize';
import { sequelize } from '../database';
import { Listas } from './listas.model';

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
        type: DataTypes.TINYINT
    }
});

Elecciones.hasMany(Listas, {
    foreignKey: 'idElecciones',
    sourceKey: 'id'
});

Listas.belongsTo(Elecciones, {
    foreignKey: 'idElecciones',
    targetKey: 'id'
});