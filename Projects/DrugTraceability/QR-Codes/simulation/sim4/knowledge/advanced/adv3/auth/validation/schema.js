const Joi = require('@hapi/joi')

const authSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(8).max(30).required(),
    role: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required()
})

const loginSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(8).max(30).required()
})

const blockchainSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(8).max(30).required()
})

const resetPasswordSchema = Joi.object({
    token: Joi.string().required(),
    newPassword: Joi.string().min(6).max(100).required(),
    confirmPassword: Joi.string().min(6).max(100).required()
});

module.exports = {
    authSchema,
    loginSchema,
    blockchainSchema,
    resetPasswordSchema
}
