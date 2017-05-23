import axios from 'axios';

export default function(vm) {
	if (vm.url == '') {
		return;
	}
	axios.get(vm.url).then(function(ret) {
		if (!vm.model) {
			vm.model = ret.data;
			vm.$events.fire('model-loaded', vm);
		}
	});

};

function setValues(data, vm) {
	Object.keys(data).forEach(function(key) {
		if (!vm.getField(key)) {
			return;
		}
		vm.getField(key).setValue(data[key]);
	});
}
