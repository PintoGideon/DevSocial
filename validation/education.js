const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
	let errors = {};

	//Checking the name before passing it onto Validator

	data.school = !isEmpty(data.school) ? data.school : '';

	data.degree = !isEmpty(data.degree) ? data.degree : '';

	data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';

	data.from = !isEmpty(data.from) ? data.from : '';

	if (!Validator.isEmpty(data.school)) {
		errors.title = 'Shcool Title is invalid';
	}
	if (Validator.isEmpty(data.degree)) {
		errors.degree = 'Degree is required';
    }
    
    if (Validator.isfieldofstudy(data.fieldofstudy)) {
		errors.fieldofstudy = 'Degree is required';
	}

	if (Validator.isEmpty(data.from)) {
		errors.from = 'From Date Field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
