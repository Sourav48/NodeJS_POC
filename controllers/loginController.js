const Joi = require('joi');
const bcrypt = require('bcrypt');
const User = require('../models/users');
const jwt = require('jsonwebtoken');

const loginController = {
    async login(req, res) {

        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        });

        const { error } = loginSchema.validate(req.body);

        if (error) {
            res.send(error);
        }

        try{
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                res.send("Wrong Credentials");
            }
            const match = await bcrypt.compare(req.body.password, user.password);
            if (!match) {
                res.send("Wrong Credentials");
            }
            else if(match) {
                jwt.sign({user},'secretcode@123',(err, token) =>{
                    res.status(201).json({token})
                })
            }
        } catch(err) {
            res.send(err);
        }

    }
};

module.exports = loginController;