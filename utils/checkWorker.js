const { parentPort } = require("worker_threads");

const checkSolution = solution => {
	console.log(solution);
};

parentPort.on("message", solution => {
	checkSolution(solution);
});
