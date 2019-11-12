require(`dotenv`).config();
const express = require(`express`);
const router = express.Router();

const { User } = require(`../models`);

router.post(`/create`, async (req, res) => {
	try {
		const newuser = new User({
			uniqueId: req.body.uniqueId,
			userName: req.body.userName
		});
		newuser.save((err) => {
			if (err) {
				console.log(err);
				let resStr = `Could not create account.`;
				if (err.code === 11000) {
					resStr = `Username ${req.body.userName} is already taken.`;
				}
				return res.status(500).send(resStr);
			}
			res.cookie(process.env.USER_KEY, uniqueId);
			return res.send(`Account created. Your are now logged in as ${req.body.userName}.`);
		});
	} catch (err) {
		console.log(err.stack);
		return res.status(500).send(process.env.ERR_500);
	}
});

router.post(`/login`, async (req, res) => {
	try {
		const uniqueId = req.body.uniqueId;
		User.findOne({ uniqueId }, (err, body) => {
			if (err) {
				console.log(err);
				return res.status(500).send(process.env.ERR_500);
			}
			if (body) {
				res.cookie(process.env.USER_KEY, body.uniqueId);
				return res.send(`You are now logged in as ${req.body.userName}.`);
			}
			return res.send(`Account not found.`);
		});
	} catch (err) {
		console.log(err.stack);
		return res.status(500).send(process.env.ERR_500);
	}
});

router.get(`/check-taken/:userName`, async (req, res) => {
	try {
		const userName = req.params.userName;
		User.findOne({ userName }, (err, doc) => {
			if (!err && doc) {
				return res.send(true);
			} else {
				return res.send(false);
			}
		});
	} catch (err) {
		console.log(err.stack);
		return res.status(500).send(process.env.ERR_500);
	}
});

module.exports = router;
