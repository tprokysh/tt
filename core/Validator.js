import ValidatorJs from 'validatorjs';

export default class Validator {
    vehicleValidation(data, rules) {
        const validation = new ValidatorJs(data, rules);

        const validationResult = {
            isValid: validation.passes(),
            validationErrors: validation.errors,
        }

        return validationResult
    }
}