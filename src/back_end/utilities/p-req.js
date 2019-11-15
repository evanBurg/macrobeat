const request = require(`request`);

const get = (options) => {
	return new Promise((resolve, reject) => {
		request.get(options, (error, response, body) => {
			if (error) {
				reject(error);
			} else {
				resolve(body);
			}
		});
	});
};

const post = (options) => {
	return new Promise((resolve, reject) => {
		request.post(options, (error, response, body) => {
			if (error) {
				reject(error);
			} else {
				resolve(body);
			}
		});
	});
};

module.exports = {
	get,
	post
};
