const { Problem } = require("../models");

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

const getProblem = (req, res) => {};

const updateProblem = (req, res) => {};

const deleteProblem = (req, res) => {};

const submit = (req, res) => {};

module.exports = {
	addProblem,
	getProblem,
	updateProblem,
	deleteProblem,
};
