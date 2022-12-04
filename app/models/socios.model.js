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
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'No se admiten campos vacíos'
            },
            notNull: {
                msg: 'Por favor, ingrese los nombres'
            }
        },
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'No se admiten campos vacíos'
            },
            notNull: {
                msg: 'Por favor, ingrese los apellidos'
            }
        },
    },
    cedula: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'No se admiten campos vacíos'
            },
            notNull: {
                msg: 'Por favor, ingrese la cédula'
            }
        },
    },
    codigo: {
        type: DataTypes.INTEGER.UNSIGNED,
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
    imagen: {
        type: DataTypes.STRING,
        allowNull: true,
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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'No se admiten campos vacíos'
            },
            notNull: {
                msg: 'Por favor, ingrese el email'
            },
            isEmail: {
                msg: 'Los datos del campo email no corresponden a un correo electrónico'
            }
        },
    },
    celular: {
        type: DataTypes.STRING,
        defaultValue: '0999999999',
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'No se admiten campos vacíos'
            },
            notNull: {
                msg: 'Por favor, ingrese el email'
            },
            isNumeric: {
                msg: 'Solo se admiten números'
            }
        },
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
