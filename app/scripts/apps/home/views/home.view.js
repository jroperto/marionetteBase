define([
    'marionette', 'text!tpl/home/home.content.html'
], function(Marionette, homeTemplate) {

    return Marionette.ItemView.extend({

        template: _.template(homeTemplate)

    });

});