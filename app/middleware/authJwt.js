import { Cuenta } from "../models";
import jwt from "jsonwebtoken";
import { secret } from "../config/index.js";

const verifyToken = (req, res, next) =>{
    const token = req.headers['x-access-token'];
}

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
};

module.exports = authJwt;


