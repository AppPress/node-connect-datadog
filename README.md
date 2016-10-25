# node-connect-datadog

Datadog middleware for Connect JS / Express


## Usage

Add middleware immediately before your router.

	app.use(require("connect-datadog")({}));
	app.use(app.router);

## Options

All options are optional.

* `dogstatsd` node-dogstatsd client. `default = new (require("node-dogstatsd")).StatsD()`
* `stat` *string* name for the stat. `default = "node.express.router"`
* `tags` *array* of tags to be added to the histogram. `default = []`
* `req_tags` *function* that takes a `req` and returns tags to be added to the histogram.
* `res_tags` *function* that takes a `res` and returns tags to be added to the histogram.
* `path` *boolean* include path tag. `default = false`
* `method` *boolean* include http method tag. `default = false`
* `protocol` *boolean* include protocol tag. `default = false`
* `response_code` *boolean* include http response codes. `default = false`

## License

View the [LICENSE](https://github.com/brandnetworks/node-connect-datadog/blob/master/LICENSE) file.

