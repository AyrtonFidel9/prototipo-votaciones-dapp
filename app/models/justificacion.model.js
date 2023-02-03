import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import { Elecciones } from './elecciones.model.js';

export const Justificacion = sequelize.define('justificaciones',{
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


Justificacion.belongsTo(Elecciones, {
    foreignKey: 'idElecciones',
    targetKey: 'id'
})

Elecciones.hasMany(Justificacion, {
    foreignKey: 'idElecciones',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})
