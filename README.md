# z-ui

First of all, you should add the following webpack alias to you webpack config file to make sure all styles
are loaded properly:

```
mix.webpackConfig({
	resolve: {
		alias: {
			"uiStyle.less": "z-ui/less/style.less",
			'inputmask.dependencyLib': 'vue-inputmask/3rd/inputmask.dependencyLib'
		}
	}
});
```
