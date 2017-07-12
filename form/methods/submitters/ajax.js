import swal from 'sweetalert2';

export default {
	submit: function(vm, data) {
		if (vm.confirm != '') {
			swal({
				title: vm.confirm,
				text: "You won't be able to revert this!",
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Ja, löschen!',
				cancelButtonText: 'Nein danke!',
				confirmButtonClass: 'btn btn-success',
				cancelButtonClass: 'btn btn-danger',
				buttonsStyling: false
			}).then(function () {
				askSubmitButton(vm, data);
			}, function (dismiss) { });
		} else {
			askSubmitButton(vm, data);
		}
	}
}

function askSubmitButton(vm, data) {
	if (vm.submitConfirm != false) {
		swal({
			title: vm.submitConfirm.v,
			text: "",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Ja, bitte!',
			cancelButtonText: 'Nein danke!',
			confirmButtonClass: 'btn btn-success',
			cancelButtonClass: 'btn btn-danger',
			buttonsStyling: false
		}).then(function () {
			submit(vm, data);
		}, function (dismiss) { });
	} else {
		submit(vm, data);
	}
}

function submit(vm, data) {
	var sendingMessage = vm.opts.texts.sending;
	if (sendingMessage !== false) {
		vm.$events.fire('messageInfo', sendingMessage, vm.statusbar);
	}
	vm.$events.fire('cleanFormErrors');

	var method = vm.realMethod.toLowerCase();
	axios[method](vm.action, vm.modifyData(data)).then(function(ret){
		vm.$events.fire('messageClear', vm.statusbar);

		if (vm.redirect.length > 0 && vm.$router) {
			if (vm.$session) {
				vm.$session.flash(vm.$props.msg);
			}
			vm.$router.push({name: vm.redirect});
			return;
		}

		if (ret.request.responseURL && vm.$props.follow) {
			window.location.href = ret.request.responseURL;
			return;
		}

		if (vm.$props.msg != '') {
			vm.$events.fire('messageSuccess', vm.$props.msg, vm.statusbar);
		}

		var table = vm.getTable();
		if (table) {
			table.$emit('row-deleted', {'data': data, 'url': vm.action});
		}
	})
	.catch(function(error) {
		vm.$events.fire('messageClear');
		switch(error.response.status) {
			case 404:
				vm.$events.fire('messageDanger', vm.opts.texts.notfound, vm.statusbar);
				break;
			case 500:
				vm.$events.fire('messageDanger', `<b>E500: Ein Fehler ist aufgetreten:</b><br>${error.response.data.message}<br>in file ${error.response.data.file}<br>on line ${error.response.data.line}`, vm.statusbar);
				break;
			case 403:
				vm.$events.fire('messageDanger', vm.opts.texts.unauthorized, vm.statusbar);
				break;
			case 422:
				var globalErr = vm.opts.texts.validationError;
				Object.keys(error.response.data).forEach((k) => {
					var field = vm.getField(k);

					if (field == false) {
						globalErr += '<br>'+objOrString(error.response.data[k]);
						return;
					}

					field.$emit('parseError', objOrString(error.response.data[k]));
				});
				if (globalErr.length) {
					vm.$events.fire('messageDanger', globalErr, vm.statusbar);
				}
		}
	});

	return true;
}

function objOrString(v) {
	if (typeof v == 'object') {
		return v.join(', ');
	}

	return v;
}
