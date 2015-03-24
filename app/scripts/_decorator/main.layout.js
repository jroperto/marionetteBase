define([
    'marionette', 'underscore', 'backbone',
    'text!tpl/decorator/main.layout.html',
    '_decorator/navbar.view',
    '_decorator/footer.view'
], function(Marionette, _, Backbone, mainLayoutTemplate, Navbar, Footer) {

    return Marionette.LayoutView.extend({

        el: '#mainLayout',

        template: _.template(mainLayoutTemplate),

        regions: {
            headerRegion:           '#header-region',
            mainContainerRegion:    '#mainContainer-region',
            footerRegion:           '#footer-region'
        },

        initialize: function() {
            var mainLayoutChannel = Backbone.Wreqr.radio.channel('mainLayout');
            mainLayoutChannel.commands.setHandler('content:render', function(contentView) {
                this.mainContainerRegion.show(contentView);
            }, this);
        },

        onRender: function() {
            this.headerRegion.show(new Navbar());
            this.footerRegion.show(new Footer());
        }
    });

});