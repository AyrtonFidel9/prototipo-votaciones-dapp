import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import { Billetera } from './billetera.model.js';

export const Representantes = sequelize.define('representantes',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    principal: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1
        },
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'No se admiten campos vacíos'
            },
            isNumeric: {
                msg: 'Solo se admiten números'
            },
            notNull: {
                msg: 'Por favor, ingrese el código'
            }
        },
    },
    psuplente: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1
        },
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'No se admiten campos vacíos'
            },
            isNumeric: {
                msg: 'Solo se admiten números'
            },
            notNull: {
                msg: 'Por favor, ingrese el código'
            }
        },
    },
    ssuplente: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1
        },
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'No se admiten campos vacíos'
            },
            isNumeric: {
                msg: 'Solo se admiten números'
            },
            notNull: {
                msg: 'Por favor, ingrese el código'
            },
        },
    },
    ethCantVot: {
        type: DataTypes.SMALLINT
    }
});
