const mongoose = require("mongoose");
require('dotenv').config()

mongoose.set('strictQuery', false);
module.exports = () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	try {
		mongoose.connect("mongodb://127.0.0.1:27017/myLoginRegisterDB",connectionParams);
		console.log("Connected to database successfully");
	} catch (error) {
		console.log(error);
		console.log("Could not connect database!");
	}
};
