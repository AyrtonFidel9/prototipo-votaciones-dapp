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
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'No se admiten campos vacíos'
            },
        },
        unique:{
            arg: true,
            msg: 'El nombre de la agencia ya existe'
        },
    },
    ubicacion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'No se admiten campos vacíos'
            }
        },
    },
    numRepresentantes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'No se admiten campos vacíos'
            },
            isNumeric: {
                msg: 'Solo se admiten números'
            }
        },
    },
    numGanadores: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'No se admiten campos vacíos'
            },
            isNumeric: {
                msg: 'Solo se admiten números'
            }
        },
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