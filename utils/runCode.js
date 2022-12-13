const axios = require("axios");

const runCode = async (code, language, input) => {
	try {
		var apiOutput = await axios({
			method: "post",
			headers: {
				"Content-Type": "application/json",
				"Accept-Encoding": "application/json",
			},
			url: "https://codex-api-prod-fourspace-orw7so.mo2.mogenius.io/",
			data: {
				code,
				language,
				input,
			},
		});
		return {
			status: 1,
			result: apiOutput.data,
		};
	} catch (e) {
		return { status: 0, error: e };
	}
};

module.exports = runCode;
