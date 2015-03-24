define([
    'marionette', 'text!tpl/contact/contact.content.html'
], function(Marionette, contactTemplate) {

    return Marionette.ItemView.extend({

        template: _.template(contactTemplate)

    });

});