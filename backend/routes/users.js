const router = require("express").Router();
const { User, validate } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const { connection } = require("mongoose");

router.post("/", async (req, res) => {
	console.log('done from users');
	try {
		// const { error } = validate(req.body);
		const error = undefined;
		if (error) {
			console.log(error);
			return res.status(400).send({ message: error.details[0].message });
		}
		console.log("done")
		let user = await User.findOne({ email: req.body.email });
		if (user){
			console.log("409 error");
			return res.status(200).send({ message: "User with given email already Exist!" });
		}
		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		console.log(req.body.password);
		const hashPassword = await bcrypt.hash(req.body.password, salt);
		console.log("after user")
		
		user = await new User({ ...req.body, password: hashPassword}).save();
		

		const token = await new Token({
			userId: user._id,
			token: crypto.randomBytes(32).toString("hex"),
		}).save();
		const url = `http://localhost:3000/users/${user.id}/verify/${token.token}`;
		console.log(url);
		await sendEmail(user.email, "Verify Email", url);
		res.status(201).send({ message: "An Email sent to your account please verify" });
	} catch (error) {
		//console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/:id/verify/:token/", async (req, res) => {
	//console.log(req.params.id);
	try {
		const user = await User.findOne({ _id: req.params.id });
		//console.log(user);
		if (!user) {
			return res.status(400).send({ message: "Invalid link" });
		}

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		//console.log(token);
		if (!token) {
			return res.status(400).send({ message: "Invalid link" });
		}

		await User.updateOne({ _id: user._id, verified: true });
		await token.remove();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;