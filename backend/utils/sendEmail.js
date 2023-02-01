const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	try {
		console.log("Hey");
		console.log(email);
		console.log(text);
		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			service: 'gmail',
			port: 587,   
			secure: true,
			auth: {
				user: "meetgami34345@gmail.com",
				pass: "mygyabzbzmrjduid",
			},
		});

		await transporter.sendMail({
			from: "meetgami34345@gmail.com",
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};