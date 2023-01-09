import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import { Representantes } from './representantes.model.js';

export const Inscripciones = sequelize.define('inscripciones',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    formulario: {
        type: DataTypes.STRING,
    },
    declaracion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM,
        values: [
            'online',
            'offline',
        ],
        defaultValue: 'online'
    }
})

Inscripciones.hasOne(Representantes, {
    foreignKey: 'idInscripcion',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

Representantes.belongsTo(Inscripciones, {
    foreignKey: 'idInscripcion',
    targetKey: 'id'
})