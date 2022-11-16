import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';
import { Listas } from './listas.model';

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