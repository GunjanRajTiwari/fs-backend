const { parentPort } = require("worker_threads");
const runCode = require("./runCode");
const { Register, Solution, sequelize, Sequelize } = require("../models");

const WRONGPENALTY = 300;

const checkSolution = async solution => {
	try {
		const response = await runCode(
			solution.code,
			solution.language,
			solution.testcase
		);

		if (response.status == 0) {
			if (solution.failed) return;
			solution.failed = true;
			return checkSolution(solution);
		}

		const { success, output, error } = response.result;
		if (success == false) {
			var status = "CE";
			if (error.includes("Timed Out")) status = "TLE";

			await Solution.update(
				{ status },
				{
					where: {
						id: solution.id,
					},
				}
			);
			return;
		}

		console.log(solution.checkerLang);

		const checkerTestCase = solution.testcase + output;
		const checkerResult = await runCode(
			solution.checker,
			solution.checkerLang,
			checkerTestCase
		);

		var isCorrect = false;

		if (
			checkerResult.result.success &&
			(checkerResult.result.output === "1" ||
				checkerResult.result.output === "1\n")
		)
			isCorrect = true;

		var status = isCorrect ? "ACCEPTED" : "WRONG";
		if (!solution.inContest) {
			await Solution.update(
				{ status },
				{
					where: {
						id: solution.id,
					},
				}
			);
			return;
		}

		if (!isCorrect) {
			await Solution.update(
				{ status },
				{
					where: {
						id: solution.id,
					},
				}
			);

			return;
		}

		await sequelize.transaction(async t => {
			var submissions = await Solution.count({
				where: {
					problemId: solution.problemId,
				},
			});

			await Solution.update(
				{ status },
				{
					where: {
						id: solution.id,
					},
				}
			);

			var submissionTime = solution.time;
			var notFirst = await Solution.count({
				where: {
					UserId: solution.userId,
					ProblemId: solution.problemId,
					status: "ACCEPTED",
				},
			});
			if (!notFirst) {
				await Register.update(
					{
						solved: Sequelize.literal("solved + 1"),
						submission: sequelize.literal(
							"submission +" + submissions
						),
						score: Sequelize.literal(
							"score + " + solution.point
						),
						timePenalty: Sequelize.literal(
							submissionTime +
								"+(submission - solved)*" +
								WRONGPENALTY
						),
					},
					{
						where: {
							UserId: solution.userId,
							ContestId: solution.contestId,
						},
					}
				);
			}
		});
	} catch (e) {
		console.log(e);
	}
};

parentPort.on("message", solution => {
	checkSolution(solution);
});
