const {
	Problem,
	Register,
	Solution,
	Contest,
	sequelize,
} = require("../models");

const { Worker } = require("worker_threads");

const addProblem = async (req, res) => {
	const { title, description, testcase, checker, checkerLang } =
		req.body;

	if (!title || !description || !testcase || !checker || !checkerLang) {
		return res.json({ error: "Data insufficient" });
	}

	try {
		await Problem.create({
			title,
			description,
			testcase,
			checker,
			checkerLang,
			status: "HIDDEN",
		});
		return res.json({
			data: "ok",
		});
	} catch (error) {
		res.json({ error });
	}
};

const getAllProblems = async (req, res) => {
	try {
		const problems = await Problem.findAll({
			where: {
				status: "PRACTICE",
			},
		});
		res.send({ data: problems });
	} catch (error) {
		res.send({ error });
	}
};

const getProblem = async (req, res) => {
	const problemId = req.params.id;
	try {
		const problem = await Problem.findOne({
			where: {
				id: problemId,
			},
			attributes: {
				exclude: ["testcase", "checker", "checkerLang"],
			},
		});

		if (!problem || problem.status === "HIDDEN")
			return res.send({ error: "Problem not found" });

		if (problem.status === "LIVE") {
			const registered = await Register.count({
				where: {
					ContestId: problem.ContestId,
					UserId: req.user.id,
				},
			});
			if (!registered || registered === 0)
				return res.send({
					error: "User not registered in the contest.",
				});
		}

		const solutions = await Solution.findAll({
			where: {
				ProblemId: problem.id,
				UserId: req.user.id,
			},
		});
		problem.dataValues.solutions = solutions;

		res.send({ data: problem });
	} catch (error) {
		res.send({ error });
	}
};

const updateProblem = (req, res) => {};

const deleteProblem = (req, res) => {};

const submit = async (req, res) => {
	try {
		const problemId = req.params.id;
		const { code, language } = req.body;
		if (!code || !language || !problemId)
			return res.send({ error: "Data Insufficnent." });

		const problemObject = await Problem.findOne({
			where: { id: problemId },
			attributes: [
				"status",
				"checker",
				"checkerLang",
				"testcase",
				"point",
				"contestId",
				[sequelize.col("Contest.start"), "start"],
			],
			include: [
				{
					model: Contest,
					attributes: [],
				},
			],
		});

		if (!problemObject || problemObject.dataValues.status === "HIDDEN")
			return res.send({ error: "Problem not found!" });

		const {
			start,
			status,
			contestId,
			testcase,
			checker,
			checkerLang,
			point,
		} = problemObject.dataValues;
		const inContest = status === "LIVE";
		const currentTime = new Date().getTime();
		const startTime = new Date(start).getTime();
		const time = Math.floor((currentTime - startTime) / 1000);

		const solutionObject = await Solution.create({
			language,
			code,
			time,
			inContest,
			status: "PENDING",
			ProblemId: problemId,
			UserId: req.user.id,
		});
		res.send({ data: "ok" });

		const solution = {
			id: solutionObject.id,
			code: solutionObject.code,
			language: solutionObject.language,
			testcase,
			checker,
			checkerLang,
			inContest,
			problemId,
			time,
			point,
			userId: req.user.id,
			contestId,
		};

		const checkWorker = new Worker("./utils/checkWorker.js");
		checkWorker.postMessage(solution);
	} catch (error) {
		console.log(error);
		res.send({ error });
	}
};

module.exports = {
	addProblem,
	getAllProblems,
	getProblem,
	updateProblem,
	deleteProblem,
	submit,
};
