import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Recuperacion = sequelize.define('recuperacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ipRecovery:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIP: true,
        }
    },
    fecha:{
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    hora:{
        type: DataTypes.TIME,
        allowNull: false,
    },
    codigo:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    isRecuperado:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
},
{
    freezeTableName: true
}
);
