import crypto from 'node:crypto';

export default function generarCodigo(){
    return crypto.randomBytes(3).toString('hex');
}