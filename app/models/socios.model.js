import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import { Cuenta } from './cuenta.model.js';
import { Inscripciones } from './inscipcion.model.js';

export const Socios = sequelize.define('socios',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombres: {
        type: DataTypes.STRING,
        notEmpty: {
            msg: 'No se admiten campos vacíos'
        }
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: {
            msg: 'No se admiten campos vacíos'
        }
    },
    cedula: {
        type: DataTypes.STRING,
        allowNull: false,
        isNumeric: {
            msg: 'Solo se admiten números'
        }
    },
    codigo: {
        type: DataTypes.INTEGER.UNSIGNED,
        notEmpty: {
            msg: 'No se admiten campos vacíos'
        }
    },
    imagen: {
        type: DataTypes.BLOB,
        allowNull: true,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        notEmpty: {
            msg: 'No se admiten campos vacíos'
        }
    },
    email: {
        type: DataTypes.STRING,
        isEmail: {
            msg: 'Los datos del campo email no corresponden a un correo electrónico'
        }
    },
    celular: {
        type: DataTypes.STRING,
        defaultValue: '0999999999',
        isNumeric: {
            msg: 'Solo se admiten números'
        }
    }
}, {
    freezeTableName: true
});

Socios.hasOne(Cuenta, {
    foreignKey: 'idSocio',
    sourceKey: 'id'
});

Cuenta.belongsTo(Socios, {
    foreignKey: 'idSocio',
    targetKey: 'id'
});

Socios.hasOne(Inscripciones, {
    foreignKey: 'idSocio',
    sourceKey: 'id'
})

Inscripciones.belongsTo(Socios, {
    foreignKey: 'idSocio',
    targetKey: 'id'
})
