import  Joi from "joi";
import router from "../routes/userRoutes.js";

const userScheme = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).optional(),
    password: Joi.string().min(8).required(),
    accountType: Joi.string().valid('donor', 'campaigner', 'both').optional(),
});

const validateUser= (req, res, next) => {
    const {error} = userScheme.validate(req.body);
    if (error) {
        return res.status(400).send({
            status: 400,
            message: "Invalid input data",
            error: error.details[0].message,
        });
    }
    next();
};

export default validateUser;