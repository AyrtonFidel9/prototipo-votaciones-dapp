import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import { Representantes } from './representantes.model.js';

export const Billetera = sequelize.define('billetera',{
    address: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'No se admiten campos vacíos'
            },
            notNull: {
                msg: 'Por favor, ingrese la direccion de la billetera'
            }
        },
    },
    privateKey: {
        type: DataTypes.JSON,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'No se admiten campos vacíos'
            },
            notNull: {
                msg: 'Por favor, ingrese la clave privada'
            }
        },
    }
});

Billetera.hasOne(Representantes,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Representantes.belongsTo(Billetera);


