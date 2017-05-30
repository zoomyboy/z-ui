var ucfirst = require('ucfirst');

export default function(value, heading, vm) {
	if (heading.type == undefined) {
		return parseString(value);
	}
	return eval('parse' + ucfirst(heading.type) + '(value, vm, heading);');
}

function parseBoolean(value, vm, heading) {
	value = (value == '0' || value == 'false' || !value) ? 0 : 1;


	var options = vm.getTable(vm).opts;
	if (heading.booleanIcon) {
		var boolOptions = options.booleanIconTypes[heading.booleanIcon];
		var type = heading.booleanIcon;
	} else {
		var boolOptions = options.booleanIconTypes[options.booleanIconType];
		var type = options.booleanIconType;
	}


	if (type == 'font-awesome') {
		return '<span class="fa fa-'+boolOptions[value].icon+'" style="color: '+boolOptions[value].color+';"></span>';
	}

	if (type == 'string') {
		return boolOptions[value];
	}
}
function parseString(value) {
	return value;
}
