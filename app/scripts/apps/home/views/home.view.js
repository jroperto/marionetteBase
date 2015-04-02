define([
    'underscore', 'marionette', 'text!tpl/home/home.content.html'
], function(_, Marionette, homeTemplate) {

    return Marionette.ItemView.extend({

        template: _.template(homeTemplate)

    });

});