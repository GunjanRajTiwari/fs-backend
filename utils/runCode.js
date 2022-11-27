const axios = require("axios");

const runCode = async (code, language, input) => {
	try {
		var apiOutput = await axios({
			method: "post",
			url: "https://codex-api.herokuapp.com/",
			data: {
				code,
				language,
				input,
			},
		});
		// if (apiOutput.data.output.indexOf("Execution Timed Out!") !== -1) {
		// 	return {
		// 		status: 0,
		// 		error: "Time Limit Exceeded!",
		// 	};
		// } else {
		return {
			status: 1,
			result: apiOutput,
		};
		// }
	} catch (e) {
		return { status: 0, error: e };
	}
};

module.exports = runCode;
