module.exports = function() {

  var options = {
	  submitLabel: 'Send',
	  texts: {
		  sending: 'Sending form...',
		  unauthorized: 'You\'re not allowed to do this!',
		  notfound: 'This resource wasn\'t found'
	  },
	  fieldClass: 'form-control',
	  showLabel: true
  };

  return options;
}
