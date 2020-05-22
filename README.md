# node-connect-datadog

Datadog middleware for Connect JS / Express


## Usage

Add middleware immediately before your router.

	app.use(require("@mergermarket/connect-datadog")({}));
	app.use(app.router);

## Options

All options are optional.

* `dogstatsd` node-dogstatsd client. `default = new (require("hot-shot")).StatsD()`
* `stat` *string* name for the stat. `default = "node.express.router"`
* `tags` either:
	* *array* of tags to be added to the histogram
	* *function* that takes `req` and `res`, returning an array of tags
	* `default = []`
* `path` *boolean* include path tag. `default = false`
* `method` *boolean* include http method tag. `default = false`
* `protocol` *boolean* include protocol tag. `default = false`
* `response_code` *boolean* include http response codes. `default = false`
* `response_code_grouped` *boolean* include http response codes grouped by 100, e.g. 5xx. `default = false`

## License

View the [LICENSE](https://github.com/mergermarket/node-connect-datadog/blob/master/LICENSE) file.

