import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import { Socios } from './Socios.model.js';
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
    }
});

Agencias.hasMany( Socios, {
    foreignKey: 'idAgencia',
    sourceKey: 'id'
});

Socios.belongsTo( Agencias );

Agencias.hasMany( Elecciones, {
    foreignKey: 'idAgencia',
    sourceKey: 'id'
});

Elecciones.belongsTo( Agencias );

// export default Agencias;