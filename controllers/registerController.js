const Joi = require('joi');
const bcrypt = require('bcrypt');
const User = require('../models/users');
const jwt = require('jsonwebtoken');

const registerController = {
    async register(req, res) {

        const { username, email, password } = req.body;

        const registerSchema = Joi.object({                                                        
            username: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            repeatPassword: Joi.ref('password')
        });                                

        try {             
            const exist = await User.exists({ email: req.body.email });
            if (exist) {
                res.send('This email is already taken.');
            }
        } catch(err) {
            res.send(err);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        const { error } = registerSchema.validate(req.body);
        if (error) {
            res.send(error)
            }
        else {                      
            const userDetails =  await user.save() 
                jwt.sign({userDetails},'secretcode@123',(err, token) =>{
                    res.status(201).json({token})
                })
            }                            
        }
}

module.exports = registerController;
