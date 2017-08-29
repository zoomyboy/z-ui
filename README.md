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
___
## Table component
You can set different types for a column:

### Icon type
```
{title: 'Gender', data: 'gender', type: 'icon', icons: [
	{value: 1, icon: 'venus', color: 'red'},
	{value: 0, icon: 'mars', color: 'blue'}
]},
```
**Title**  
Set title to display in Column header
 
**data**  
Set Data to display in cell

**type**  
This should always be 'icon' for icon type

**icons**  
Icons to choose from. Each icon is an object with the color of the displayed icon, the Font-Awesome class (without the'fa-'-Prefix) and the associated value of that icon.

If the cell value cannot be found in any value Property of the given icons-Array, an empty string is returned.
___
