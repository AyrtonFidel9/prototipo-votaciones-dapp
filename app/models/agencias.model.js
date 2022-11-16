import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';
import { Socios } from './Socios.model';
import { Elecciones } from './elecciones.model';

export const Agencias = sequelize.define('agencias',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
    },
    ubicacion: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Agencias.hasMany(Socios, {
    foreignKey: 'idAgencia',
    sourceKey: 'id'
});

Socios.belongsTo(Agencias, {
    foreignKey: 'idAgencia',
    targetKey: 'id'
});

Agencias.hasMany(Elecciones, {
    foreignKey: 'idAgencia',
    sourceKey: 'id'
});

Elecciones.belongsTo(Agencias, {
    foreignKey: 'idAgencia',
    targetKey: 'id'
});