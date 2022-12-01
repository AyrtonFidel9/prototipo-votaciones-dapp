import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import { Socios } from './socios.model.js';
import { Elecciones } from './elecciones.model.js';

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
    },
    numRepresentantes: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    numGanadores: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

Agencias.hasMany( Socios, {
    foreignKey: 'idAgencia',
    sourceKey: 'id'
});

Socios.belongsTo( Agencias, {
    foreignKey: 'idAgencia',
    sourceKey: 'id'
});

Agencias.hasMany( Elecciones, {
    foreignKey: 'idAgencia',
    sourceKey: 'id'
});

Elecciones.belongsTo( Agencias, {
    foreignKey: 'idAgencia',
    sourceKey: 'id'
});

// export default Agencias;

