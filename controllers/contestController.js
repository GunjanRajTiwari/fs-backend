const {
	Register,
	Contest,
	Problem,
	Sequelize,
	User,
	sequelize,
} = require("../models");
const { Op } = Sequelize;
const moment = require("moment");

const addContest = (req, res) => {};

const getNewContests = async (req, res) => {
	try {
		const newContests = await Contest.findAll({
			where: {
				end: {
					[Op.gt]: Date.now(),
				},
			},
		});
		res.send({ data: newContests });
	} catch (error) {
		res.send({ error });
	}
};

const getPastContests = async (req, res) => {
	try {
		const pastContests = await Contest.findAll({
			where: {
				end: {
					[Op.lt]: Date.now(),
				},
			},
			limit: 10,
		});
		res.send({ data: pastContests });
	} catch (error) {
		res.send({ error });
	}
};

const getContest = async (req, res) => {
	const contestId = req.params.id;
	try {
		var contest = await Contest.findOne({
			where: { id: contestId },
		});

		if (!contest) return res.send({ error: "Contest not found!" });

		const now = new Date();
		contest.dataValues.started = now >= contest.start;
		contest.dataValues.ended = now >= contest.end;

		const registration = await Register.count({
			where: {
				ContestId: contestId,
				UserId: req.user.id,
			},
		});

		contest.dataValues.registered = !!registration;
		if (contest.dataValues.started === false) {
			return res.send({ data: contest });
		}

		if (
			contest.dataValues.started === true &&
			contest.dataValues.ended === false &&
			contest.dataValues.registered === false
		) {
			return res.send({ data: contest });
		}

		const problems = await Problem.findAll({
			where: {
				ContestId: contest.id,
				status: {
					[Op.or]: ["LIVE", "PRACTICE"],
				},
			},
			attributes: ["id", "title", "point"],
		});

		contest.dataValues.Problems = problems;
		res.send({ data: contest });
	} catch (error) {
		console.log(error);
		res.send({ error });
	}
};

const updateContest = (req, res) => {};

const deleteContest = (req, res) => {};

const addProblem = (req, res) => {};

const getProblems = (req, res) => {};

const register = async (req, res) => {
	console.log("registered");
	const contestId = req.params.id;
	try {
		const contest = await Contest.findOne({
			where: {
				id: contestId,
			},
			attributes: {
				include: ["start"],
			},
		});

		if (contest.end <= new Date())
			return res.send({
				error: "Cant register after the contest has ended.",
			});

		await Register.create({
			ContestId: contestId,
			UserId: req.user.id,
		});
		res.send({ data: "ok" });
	} catch (error) {
		res.send({ error: " Something went wrong" });
	}
};

const getLeaderboard = async (req, res) => {
	try {
		const contestId = req.params.id;
		var leaderboard = await Register.findAll({
			where: {
				ContestId: contestId,
				score: {
					[Op.gt]: 0,
				},
			},
			include: [
				{
					model: User,
					attributes: ["username", "name", "rank"],
				},
			],
			attributes: {
				include: [
					[
						Sequelize.literal(
							"(RANK() OVER (ORDER BY score DESC, timePenalty))"
						),
						"rank",
					],
				],
			},
			order: [
				["score", "DESC"],
				["timePenalty", "ASC"],
				["solved", "DESC"],
			],
		});

		var me = leaderboard.find(
			user => user.User.username === req.user.username
		);

		res.send({ data: { me, leaderboard } });
	} catch (error) {
		res.send({ error });
	}
};

module.exports = {
	getNewContests,
	getPastContests,
	addContest,
	getContest,
	updateContest,
	deleteContest,
	addProblem,
	getProblems,
	register,
	getLeaderboard,
};
