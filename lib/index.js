var DD = require("hot-shots").StatsD;

module.exports = function (options) {
	var datadog = options.dogstatsd || new DD();
	var stat = options.stat || "node.express.router";
	var tags = options.tags || [];
	var path = options.path || false;
	var base_url = options.base_url || false;
	var response_code = options.response_code || false;
	var response_code_grouped = options.response_code_grouped || false;
	var map_route_tag = typeof options.map_route_tag === 'function' ? options.map_route_tag : null;

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

			var baseUrl = (base_url !== false) ? req.baseUrl : '';
			var routeTagValue = baseUrl + req.route.path;
			if (map_route_tag !== null) {
				routeTagValue = map_route_tag(routeTagValue);
			}
			var statTags = [
				"route:" + routeTagValue
			].concat(typeof tags === 'function' ? tags(req, res) : tags);

			if (options.method) {
				statTags.push("method:" + req.method.toLowerCase());
			}

			if (options.protocol && req.protocol) {
				statTags.push("protocol:" + req.protocol);
			}

			if (path !== false) {
				statTags.push("path:" + baseUrl + req.path);
			}

			if (response_code || response_code_grouped) {
				statTags.push("response_code:" + res.statusCode);
			}

			if (response_code) {
				datadog.increment(stat + '.response_code.' + res.statusCode , 1, statTags);
				datadog.increment(stat + '.response_code.all' , 1, statTags);
			}

			if (response_code_grouped) {
				var groupedStatusCode = Math.floor(res.statusCode / 100) + 'xx'
				datadog.increment(stat + '.response_code.' + groupedStatusCode , 1, statTags);
			}

			datadog.histogram(stat + '.response_time', (new Date() - req._startTime), 1, statTags);
		};

		next();
	};
};
