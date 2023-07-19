import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import { Votos } from './votos.model.js';
import { Cuenta } from './cuenta.model.js';
import { Inscripciones } from './inscripcion.model.js';
import { Justificacion } from './justificacion.model.js';

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
        unique: true
    },
    codigo: {
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
        unique: {
            arg: true,
            msg: 'Código ya registrado'
        }
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
        allowNull: true,
        validate: {
            isEmail: {
                msg: 'Los datos del campo email no corresponden a un correo electrónico'
            }
        },
        unique: {
            arg: true,
            msg: 'Este email ya está registrado'
        }
    },
    celular: {
        type: DataTypes.STRING,
        defaultValue: '0999999999',
        allowNull: true,
        validate: {
            isNumeric: {
                msg: 'Solo se admiten números'
            },
        },
        unique: {
            arg: true,
            msg: 'Número de celular ya esta registrado'
        }
    }
}, {
    freezeTableName: true,
    
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

Justificacion.belongsTo(Socios, {
    foreignKey: 'idSocio',
    targetKey: 'id'
})

Socios.hasMany(Justificacion, {
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

Socios.hasMany(Votos,{
    foreignKey: 'idSocio',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Votos.belongsTo(Socios,{
    foreignKey: 'idSocio',
    sourceKey: 'id',
});
