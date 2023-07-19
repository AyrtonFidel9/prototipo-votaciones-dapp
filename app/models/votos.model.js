import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Votos = sequelize.define('votos',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: (new Date()).toLocaleTimeString()
    }
});



