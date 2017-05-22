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
				submit(vm, data);
			}, function (dismiss) { });
		} else {
			submit(vm, data);
		}
	}
}

function submit(vm, data) {
	vm.sending = true;
	vm.$events.fire('messageInfo', vm.opts.texts.sending);
	vm.$events.fire('cleanFormErrors');

	var method = vm.realMethod.toLowerCase();
	axios[method](vm.action,data).then(function(ret){
		vm.$events.fire('messageClear');

		if (vm.redirect.length > 0) {
			vm.$session.flash(vm.$props.msg);
			vm.$router.push({name: vm.redirect});
			return;
		}

		if (vm.$props.msg != '') {
			vm.$events.fire('messageSuccess', vm.$props.msg);
		}


		var table = vm.getTable();
		if (table) {
			table.$emit('row-deleted', {'data': data, 'url': vm.action});
		}

		vm.sending = false;
	})
	.catch(function(error) {
		console.log(error);
		vm.$events.fire('messageClear');
		if (error.response.status == 404) {
			vm.$events.fire('messageDanger', 'Die angegebene Resource wurde leider nicht gefunden.');
		}
		if (error.response.status == 500) {
			vm.$events.fire('messageDanger', `<b>E500: Ein Fehler ist aufgetreten:</b><br>${error.response.data.message}<br>in file ${error.response.data.file}<br>on line ${error.response.data.line}`);
		}
		if (error.response.status == 422) {
			vm.$events.fire('messageDanger', `Ein Fehler ist aufgetreten. Bitte prüfen Sie Ihre Eingaben.`);
			Object.keys(error.response.data).forEach((k) => {
				var field = vm.getField(k);
				if (field) {
					error.response.data[k].forEach((msg) => {
						field.$emit('parseError', msg);
					});
				}
			});
		}
	});

	return true;
}

