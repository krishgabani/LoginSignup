const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	Name: { type: String,},
	email: { type: String,},
	password: { type: String,  },
	verified: { type: Boolean, default: false },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		Name: Joi.string().label("Name"),
		email: Joi.string().email().label("Email"),
		password: label("Password"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };