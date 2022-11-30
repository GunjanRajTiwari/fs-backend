const { Problem, Register, Solution } = require("../models");

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
		// const { code, language, time, problemId } = req.body;
		// if (!code || !language || !time)
		// 	return res.send({ error: "Data Insufficnent." });

		// const problemStatus = await Problem.findOne({
		// 	where: { id: problemId },
		// 	attributes: {
		// 		include: ["status"],
		// 	},
		// });

		// if (!problemStatus || problemStatus === "HIDDEN")
		// 	return res.send({ error: "Problem not found!" });

		// const inContest = problemStatus === "LIVE";

		// const solution = await Solution.create({
		// 	language,
		// 	code,
		// 	time,
		// 	inContest,
		// 	status: "PENDING",
		// 	ProblemId: problemId,
		// 	UserId: req.user.id,
		// });
		const solution = req.query.solution;
		res.send({ data: "ok" });

		const checkWorker = new Worker("./utils/checkWorker.js");
		checkWorker.postMessage(solution);
	} catch (error) {
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
