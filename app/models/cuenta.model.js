import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import { Notificaciones } from './notificaciones.model.js';
import { Recuperacion } from './recuperacion.model.js';

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
    },
    ipCliente:{
        type: DataTypes.STRING,
        validate: {
            isIP: true
        },
        allowNull: false,
    },
    ultimoAcceso:{
        type: DataTypes.DATE,
        allowNull: false,
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

Cuenta.hasMany(Recuperacion, {
    foreignKey: 'idCuenta',
    sourceKey: 'id'
});

Recuperacion.belongsTo(Cuenta, {
    foreignKey: 'idCuenta',
    targetKey: 'id'
});