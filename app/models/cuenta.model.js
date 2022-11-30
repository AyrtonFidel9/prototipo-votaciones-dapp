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
                'ROLE_SOCIO',
                'ROLE_ADMIN',
                'ROLE_JGE' 
            ],
        }),
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
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