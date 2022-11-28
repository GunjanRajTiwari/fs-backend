const { Register, Contest, Problem, Sequelize } = require("../models");
const { Op } = Sequelize;

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
		contest.dataValues.running =
			now >= contest.start && now <= contest.end;

		const registration = await Register.count({
			where: {
				ContestId: contestId,
				UserId: req.user.id,
			},
		});

		contest.dataValues.registered = !!registration;

		if (!contest.dataValues.running)
			return res.send({ data: contest });

		const problems = await Problem.findAll({
			where: {
				contestId: contest.id,
			},
		});
		contest.dataValues.problems = problems;
		res.send({ data: contest });
	} catch (error) {
		res.send({ error });
	}
};

const updateContest = (req, res) => {};

const deleteContest = (req, res) => {};

const addProblem = (req, res) => {};

const getProblems = (req, res) => {};

const register = async (req, res) => {
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

		if (contest.start <= new Date())
			return res.send({
				error: "Cant register after the contest has started.",
			});

		await Register.create({
			ContestId: contestId,
			UserId: req.user.id,
		});
		res.send({ data: "ok" });
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
};
