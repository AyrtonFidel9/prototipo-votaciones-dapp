import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';
import { Notificaciones } from './notificaciones.model';

export const Cuenta = sequelize.define('cuenta',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rol: {
        type: DataTypes.STRING,
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