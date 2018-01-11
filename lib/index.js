var DD = require("node-dogstatsd").StatsD;

module.exports = function (options) {
  var datadog = options.dogstatsd || new DD();
  var stat = options.stat || "node.express.router";
  var tags = options.tags || [];
  var path = options.path || false;
  var base_url = options.base_url || false;
  var response_code = options.response_code || false;

  return function (req, res, next) {
    if (!req._startTime) {
      req._startTime = new Date();
    }

    var end = res.end;
    res.end = function (chunk, encoding) {
      res.end = end;
      res.end(chunk, encoding);

      var apiPath = (req.route && req.route.path) || (req.swagger && req.swagger.apiPath);
      if (!apiPath) {
        return;
      }

      var baseUrl = (base_url !== false) ? req.baseUrl : '';
      var statTags = [
        "route:" + baseUrl + apiPath
      ].concat(tags);

      if (options.method) {
        statTags.push("method:" + req.method.toLowerCase());
      }

      if (options.protocol && req.protocol) {
        statTags.push("protocol:" + req.protocol);
      }

      if (path !== false) {
        statTags.push("path:" + baseUrl + req.path);
      }

      if (options.headers && options.headers.length > 0) {
        options.headers.forEach(function (header) {
          if (req.headers[header]) {
            statTags.push(header + ':' + req.headers[header]);
          }
        });
      }

      if (req._customTags) {
        req._customTags.forEach(function (tag) {
          statTags.push(tag);
        });
      }

      if (response_code) {
        statTags.push("response_code:" + res.statusCode);
        datadog.increment(stat + '.response_code.' + res.statusCode, 1, statTags);
        datadog.increment(stat + '.response_code.all', 1, statTags);
      }

      datadog.histogram(stat + '.response_time', (new Date() - req._startTime), 1, statTags);
    };

    next();
  };
};
