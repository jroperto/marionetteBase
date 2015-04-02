define([
    'underscore', 'marionette', '_common/behaviors/formValidator.behavior',
    'text!tpl/contact/form/contact.createForm.html', 'formSerializer'
], function(_, Marionette, FormValidator, fieldFormTemplate) {


    return Marionette.ItemView.extend({

        template: _.template(fieldFormTemplate),

        ui: {
            'form':  '#contactForm',
            'contactDescription': '#contactDescription',
            'contactCity': '#contactCity',
            'contactAddress': '#contactAddress',
            'contactPhone': '#contactPhone',
            'submitButton': '#createButton'
        },

        behaviors: {
            FormValidator: {
                behaviorClass: FormValidator,
                fields: [
                    {
                        fieldSelector: '#contactDescription',
                        validations: [
                            {
                                type: 'NOT_EMPTY',
                                message: 'Description cannot be empty.'
                            },
                            {
                                type: 'MAX_LENGTH',
                                maxLength: 100,
                                message: 'Description should not exceed 100 characters.'
                            }
                        ]
                    },
                    {
                        fieldSelector: '#contactCity',
                        validations: [
                            {
                                type: 'NOT_EMPTY',
                                message: 'City cannot be empty.'
                            },
                            {
                                type: 'MAX_LENGTH',
                                maxLength: 30,
                                message: 'City should not exceed 30 characters.'
                            }
                        ]
                    },
                    {
                        fieldSelector: '#contactAddress',
                        validations: [
                            {
                                type: 'NOT_EMPTY',
                                message: 'Address cannot be empty.'
                            },
                            {
                                type: 'MAX_LENGTH',
                                maxLength: 100,
                                message: 'Address should not exceed 100 characters.'
                            }
                        ]
                    }
                ]

            }
        },



        onFormValidated: function(isFormValid) {

            if (!isFormValid) {
                return;
            }

            //this.model.save();
        }

    });

});