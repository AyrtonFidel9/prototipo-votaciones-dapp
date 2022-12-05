import { Cuenta } from "../models/index.js";
import { Socios } from "../models/index.js";

const checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    Cuenta.findOne({
        where: {
            usuario: req.body.usuario
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! User is already in use!"
            });
            return;
        }

        // Email
        Socios.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "Failed! Email is already in use!"
                });
                return;
            }

            next();
        });
    });
};

const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!Cuenta.rol.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                });
                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
};

export { verifySignUp };