define([
    'marionette', 'underscore',
    'formSerializer'
], function(Marionette, _) {


    return Marionette.Behavior.extend({

        errorFeedbackTemplate: _.template('<span id="<%= fieldId %>-icon" class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>'),

        defaults: {
            tooltipPlacement: 'right'
        },

        events: {
            'click @ui.submitButton': 'validateForm'
        },

        /**
         *  Register validation types and functions
         */
        initialize: function() {

            this.validationTypes =  {
                'NOT_EMPTY': this._validateNotEmpty,
                'MAX_LENGTH': this._validateMaxLength
            };
        },


        /**
         * Iterate through behaviour declared field validations and validate
         */
        validateForm: function() {
            var isFormValid = true;
            var fields = this.options.fields;

            if (!_.isUndefined(fields) && !_.isEmpty(fields)) {
                isFormValid = _.reduce(fields, this._doValidations, isFormValid, this);
            }

            this.view.triggerMethod('formValidated', isFormValid);
        },

        /**
         * Execute field validation
         * @param isFormValid overall form validation for reduce function
         * @param fieldConfig field validation configuration
         * @returns {*|boolean} if field value is valid
         * @private
         */
        _doValidations: function(isFormValid, fieldConfig) {

            var isFieldValid = true;

            isFieldValid = _.reduce(fieldConfig.validations, function(isFieldStillValid, validation) {
                if (!isFieldStillValid) {
                    return isFieldStillValid;
                }

                var field = this.$(fieldConfig.fieldSelector);
                var validationResult = _.bind(this.validationTypes[validation.type], this, field, validation);
                return isFieldStillValid && validationResult;

            }, isFieldValid, this);

            return isFormValid && isFieldValid;
        },

        /**
         * Process validation returning result and flagging the field on violation
         * @param field
         * @param validation field validation configuration
         * @param isValid
         * @returns {boolean}
         * @private
         */
        _processValidationResult: function(field, validation, isValid) {

            var errorClasses = 'has-error has-feedback';
            var fieldId = field.prop('id');

            if (isValid) {
                field.parent().removeClass(errorClasses);
                this.$('#' + fieldId + '-icon').remove();
                field.tooltip('destroy');
                return true;
            } else {
                field.parent().addClass(errorClasses);
                field.after(this.errorFeedbackTemplate({ fieldId: fieldId }));

                field.tooltip({ placement: this.options.tooltipPlacement, title: validation.message });

                return false;
            }
        },

        _validateNotEmpty: function(field, validation) {
            return this._processValidationResult( field, validation, !_.isEmpty(field.val()) );
        },

        _validateMaxLength: function(field, validation) {
            return this._processValidationResult( field, validation, field.val().length <= validation.maxLength );
        }

    });

});