var DD = require("node-dogstatsd").StatsD;

module.exports = function (options) {
	var datadog = options.dogstatsd || new DD();
	var stat = options.stat || "node.express.router";

	return function (req, res, next) {
		if (!req._startTime) {
			req._startTime = new Date();
		}

		var end = res.end;
		res.end = function (chunk, encoding) {
			res.end = end;
			res.end(chunk, encoding);

			if (!req.route || !req.route.path) {
				return;
			}

			datadog.histogram(stat, (new Date() - req._startTime), 1, [
				"route:" + req.route.path,
				"path:" + req.path
			]);
		};

		next();
	};
};
