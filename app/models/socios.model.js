import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import { Billetera } from './billetera.model.js';
import { Cuenta } from './cuenta.model.js';
import { Inscripciones } from './inscripcion.model.js';

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
    foreignKey: {
        name: 'idSocio',
        allowNull: false,
        unique: true
    },
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Cuenta.belongsTo(Socios, {
    foreignKey: 'idSocio',
    targetKey: 'id'
});

Socios.hasMany(Inscripciones, {
    foreignKey: {
        name: 'idSocio',
        allowNull: false,
    },
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    hooks: true
})

Inscripciones.belongsTo(Socios, {
    foreignKey: 'idSocio',
    targetKey: 'id',
})

Billetera.hasOne(Socios,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Socios.belongsTo(Billetera);
