import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';
import { Listas } from './listas.model';

export const Votos = sequelize.define('votos',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATEONLY,
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    ethList: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Votos.hasOne(Listas, {
    foreignKey: 'idVoto',
    sourceKey: 'id'
});

Listas.belongsTo(Votos, {
    foreignKey: 'idVoto',
    targetKey: 'id'
})