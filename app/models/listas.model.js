import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

export const Listas = sequelize.define('listas',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
    },
    imagen: {
        type: DataTypes.BLOB
    },
    ethCantVot: {
        type: DataTypes.SMALLINT
    }
});