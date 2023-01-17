import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import { validateRepresentante } from '../middleware/index.js';
import { Billetera } from './billetera.model.js';

export const Representantes = sequelize.define('representantes',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    principal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            
            min: 1,
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
        allowNull: false,
        validate: {
            min: 1,
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
        allowNull: false,
        validate: {
            min: 1,
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
},
{
    indexes: [
        {
            unique: true,
            fields: ['principal', 'psuplente', 'ssuplente'],
            
        }
    ],
    validate: {
        validateRepresentante() {
            if ((this.principal === principal) !== (this.longitude === null)) {
                throw new Error('Either both latitude and longitude, or neither!');
            }
        }
    }
},
    
);
