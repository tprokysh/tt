export default class BaseController {
    constructor(container) {
        this.container = container;

        this.ERRORS = {
            VALIDATION_ERROR: 412,
            INTERNAL_ERROR: 400
        };
    }

    returnResult({ res, type, message, data }) {
        const result = {
            success: Object.values(this.ERRORS).includes(type) ? false : true,
            message,
            data
        };

        return res.status(type || 200).json(result);
    }

    validateModel(res, data, rules) {
        const validationResult = this.container.validator.vehicleValidation(data, rules);

        if (!validationResult.isValid) {
             return this.returnResult({ 
                res, 
                type : this.ERRORS.VALIDATION_ERROR,
                error: {
                    message: 'Validation failed!',
                    validation_errors: validationResult.validationErrors
                }
            });
        }
    }

    async makeLogic({ res, message, model, method, data }) {
        try {
            const result = await model[method](...data);
            
            return this.returnResult({
                res,
                message, 
                data: result
            });
        } catch (error) {
            return this.returnResult({
                res,
                type: this.ERRORS.INTERNAL_ERROR,
                message: error.message,
                error: {}
            });
        }
    }
}