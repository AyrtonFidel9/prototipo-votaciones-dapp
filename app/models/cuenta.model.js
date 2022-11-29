import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import { Notificaciones } from './notificaciones.model.js';

export const Cuenta = sequelize.define('cuenta',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rol: {
        type: DataTypes.ENUM({
            values:[
                'socio',
                'admin',
                'PresidenteJGE' 
            ],
        }),
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pass: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Cuenta.hasMany(Notificaciones, {
    foreignKey: 'idCuenta',
    sourceKey: 'id'
});

Notificaciones.belongsTo(Cuenta, {
    foreignKey: 'idCuenta',
    targetKey: 'id'
});