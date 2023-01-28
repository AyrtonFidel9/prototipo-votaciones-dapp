import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import { Elecciones } from './elecciones.model.js';

export const Justificaciones = sequelize.define('justificaciones',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    documento: {
        type: DataTypes.STRING,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM,
        values: [
            'pendiente',
            'aprobado',
            'reprobado',
        ],
        defaultValue: 'pendiente'
    }
})


Justificaciones.belongsTo(Elecciones, {
    foreignKey: 'idElecciones',
    targetKey: 'id'
})

Elecciones.hasMany(Justificaciones, {
    foreignKey: 'idElecciones',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})
