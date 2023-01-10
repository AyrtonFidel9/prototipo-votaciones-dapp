import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Notificaciones = sequelize.define('notificaciones', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'No se admiten campos vacíos'
            },
            notNull: {
                msg: 'Por favor, ingrese la fecha'
            }
        },
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'No se admiten campos vacíos'
            },
            notNull: {
                msg: 'Por favor, ingrese la hora'
            }
        },
    },
    msg: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'No se admiten campos vacíos'
            },
            notNull: {
                msg: 'Por favor, ingrese un mensaje'
            }
        },
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'No se admiten campos vacíos'
            },
            notNull: {
                msg: 'Por favor, ingrese el estado'
            }
        },
    },
    grado: {
        type: DataTypes.ENUM,
        values: [
            '1',
            '2',
            '3'
        ],
        defaultValue: '1',
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'No se admiten campos vacíos'
            },
            notNull: {
                msg: 'Por favor, ingrese el grado'
            }
        },
    }
});