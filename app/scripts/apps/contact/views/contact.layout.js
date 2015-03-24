define([
    'marionette', 'text!tpl/contact/contact.layout.html'
], function(Marionette, contactLayoutTemplate) {

    return Marionette.LayoutView.extend({

        template: _.template(contactLayoutTemplate),

        regions: {
            containerRegion:    '#container-region'
        }
    });

});