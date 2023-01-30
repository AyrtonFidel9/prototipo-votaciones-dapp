import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import { Elecciones } from './elecciones.model.js';
import { Socios } from './socios.model.js';

export const Justificacion = sequelize.define('justificaciones',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
    },
    fecha:{
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    documento:{
        type: DataTypes.STRING,
    },
    estado:{
        type: DataTypes.ENUM,
        values: [
            'pendiente',
            'aprobado',
            'reprobado',
        ], 
        defaultValue: 'pendiente'
    }
});

Socios.hasMany(Justificacion, {
    foreignKey: 'idSocio',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Justificacion.belongsTo(Socios, {
    foreignKey: 'idSocio',
    targetKey: 'id'
});

Elecciones.hasMany(Justificacion, {
    foreignKey: 'idEleccion',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

Justificacion.belongsTo(Elecciones, {
    foreignKey: 'idEleccion',
    targetKey: 'id'
});

