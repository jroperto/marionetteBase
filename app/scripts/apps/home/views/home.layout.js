define([
    'underscore', 'marionette', 'text!tpl/home/home.layout.html'
], function(_, Marionette, homeLayoutTemplate) {

    return Marionette.LayoutView.extend({

        template: _.template(homeLayoutTemplate),

        regions: {
            containerRegion:    '#container-region'
        }
    });

});