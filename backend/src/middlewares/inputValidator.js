import  Joi from "joi";
import router from "../routes/userRoutes.js";

const userScheme = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
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