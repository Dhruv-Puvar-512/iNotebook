const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "dhruvisgoodboy";
var fetchuser = require("../middleware/fetchuser");
//Route 1:  Creat a User using : POST "api/auth/createuser". Doesn't require to login
router.post(
	"/createuser",
	[
		body("email", "enter the valid email").isEmail(),
		body("name", "enter the valid name").isLength({ min: 3 }),
		body("password", "password must me atleast 5 characters").isLength({
			min: 5,
		}),
	],
	async (req, res) => {
		let success = false;
		// if there are errors, return Bad Request and the error message
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ success, errors: errors.array() });
		}

		try {
			//Check whether the user with the same email exists already
			let user = await User.findOne({ email: req.body.email });

			if (user) {
				return res.status(400).json({
					success,
					error: "Sorry a user with this email already exists",
				});
			}

			const salt = await bcrypt.genSalt(10);
			secPass = await bcrypt.hash(req.body.password, salt);
			//Create a new user
			user = await User.create({
				name: req.body.name,
				email: req.body.email,
				password: secPass,
			});
			const data = {
				user: {
					id: user.id,
				},
			};
			const authtoken = jwt.sign(data, JWT_SECRET);
			success = true;
			res.json({ success, authtoken });
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Some error occured");
		}
	}
);

//Route 2: Authenticate a User :POST "/api/auth/login". no login required
router.post(
	"/login",
	[
		body("email").isEmail(),
		body("password", "password cannot be blank").exists(),
	],
	async (req, res) => {
		let success = false;
		// if there are errors, return Bad Request and the error message
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({
					success,
					error: "Please try to login with correct credentials",
				});
			}
			const passwordCompare = await bcrypt.compare(password, user.password);
			if (!passwordCompare) {
				return res.status(400).json({
					success,
					error: "Please try to login with correct credentials",
				});
			}
			const data = {
				user: {
					id: user.id,
				},
			};
			const authtoken = jwt.sign(data, JWT_SECRET);
			success = true;
			res.json({ success, authtoken });
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Internal Server Error occured");
		}
	}
);

//Route 3: Get loggedIn User Details :POST "/api/auth/getuser".  login required
router.post(
	"/getuser",
	fetchuser,

	async (req, res) => {
		try {
			userId = req.user.id;
			const user = await User.findById(userId).select("-password");
			res.send(user);
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Internal Server Error occured");
		}
	}
);
module.exports = router;
