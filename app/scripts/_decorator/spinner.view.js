define([
    'marionette', 'underscore', 'text!tpl/decorator/spinner.html'
], function(Marionette, _, spinnerTemplate) {

    return Marionette.ItemView.extend({

        template: _.template(spinnerTemplate)

    });

});