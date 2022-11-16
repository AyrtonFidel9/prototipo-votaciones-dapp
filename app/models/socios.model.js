import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';
import { Cuenta } from './cuenta.model';
import { Inscripciones } from './inscipcion,model';
import { Votos } from './votos.model';

export const Socios = sequelize.define('socios',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombres: {
        type: DataTypes.STRING,
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cedula: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigo: {
        type: DataTypes.INTEGER
    },
    imagen: {
        type: DataTypes.BLOB
    },
    estado: {
        type: DataTypes.BOOLEAN
    },
    email: {
        type: DataTypes.STRING
    },
    celular: {
        type: DataTypes.STRING,
        defaultValue: '0999999999'
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

Socios.hasOne(Votos, {
    foreignKey: 'idSocio',
    sourceKey: 'id'
});

Votos.belongsTo(Socios, {
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