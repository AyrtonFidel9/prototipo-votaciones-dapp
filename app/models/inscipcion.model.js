import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import { Listas } from './listas.model.js';

export const Inscripciones = sequelize.define('inscrpciones',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    formulacio: {
        type: DataTypes.BLOB,
    },
    declaracion: {
        type: DataTypes.BLOB,
        allowNull: false
    },
    estao: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Inscripciones.hasOne(Listas, {
    foreignKey: 'idInscripcion',
    sourceKey: 'id'
})

Listas.belongsTo(Inscripciones, {
    foreignKey: 'idInscripcion',
    targetKey: 'id'
})