import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import { Inscripciones } from './inscripcion.model.js';
import { Representantes } from './representantes.model.js';

export const Elecciones = sequelize.define('elecciones',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
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
    },
    dia: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: (new Date()).toLocaleTimeString()
    },
    duracion: {
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
                msg: 'Por favor, ingrese el código'
            }
        },
    },
    estado: {
        type: DataTypes.ENUM({
            values:[
                'NULIDAD',
                'EXITOSO',
                'EN-CURSO',
                'IMPUGNADO',
                'NO-INICIADO'
            ],
        }),
        defaultValue: 'NO-INICIADO',
        allowNull: false,
    },
});

Elecciones.hasMany(Representantes, {
    foreignKey: 'idElecciones',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Representantes.belongsTo(Elecciones, {
    foreignKey: 'idElecciones',
    targetKey: 'id',
});

Elecciones.hasMany(Inscripciones, {
    foreignKey: 'idElecciones',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

Inscripciones.belongsTo(Elecciones,{
    foreignKey: 'idElecciones',
    targetKey: 'id',
})
