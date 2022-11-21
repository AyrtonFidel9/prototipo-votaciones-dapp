import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Notificaciones = sequelize.define('notificaciones', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATEONLY
    },
    hora: {
        type: DataTypes.TIME
    },
    msg: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.ENUM,
        values: [
            'online',
            'offline',
        ],
        defaultValue: 'online'
    },
    grado: {
        type: DataTypes.ENUM,
        values : [
            '1',
            '2',
            '3'
        ],
        defaultValue: '1'
    }
});