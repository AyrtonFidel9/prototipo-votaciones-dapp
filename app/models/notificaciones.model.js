import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

export const Notificaciones = sequelize.define('notificaciones',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATEONLY
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    msg: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING
    },
    grado: {
        type: DataTypes.TINYINT
    }
});