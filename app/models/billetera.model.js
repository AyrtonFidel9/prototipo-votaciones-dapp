import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import { Representantes } from './representantes.model.js';
import { Socios } from './socios.model.js';

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


Listas.hasOne(Billetera, {
    foreignKey: 'billetera',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Billetera.belongsTo(Listas);


Socios.hasOne(Billetera, {
    foreignKey: 'billetera'
});

Billetera.belongsTo(Socios);



