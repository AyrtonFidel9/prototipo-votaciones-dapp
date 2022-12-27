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
            notNull: {
                msg: 'Por favor, ingrese el nombre de la agencia'
            }
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
            },
            notNull: {
                msg: 'Por favor, ingrese la ubicación de la agencia'
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
            },
            notNull: {
                msg: 'Por favor, ingrese el numero de representantes de la agencia'
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
            },
            notNull: {
                msg: 'Por favor, ingrese la cantidad de ganadores de la agencia'
            }
        },
    }
});

Agencias.hasMany( Socios, {
    foreignKey: 'idAgencia',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'  
});

Socios.belongsTo( Agencias, {
    foreignKey: 'idAgencia',
    sourceKey: 'id'
});

Agencias.hasMany( Elecciones, {
    foreignKey: 'idAgencia',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'  
});

Elecciones.belongsTo( Agencias, {
    foreignKey: 'idAgencia',
    sourceKey: 'id'
});

// export default Agencias;

