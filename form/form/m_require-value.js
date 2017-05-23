export default function(name) {
	var vm = this;
	if (vm.model[name] == undefined) {
		return;
	}

	if (!vm.getField(name)) {
		return;
	}

	vm.getField(name).setValue(vm.model[name]);
};
