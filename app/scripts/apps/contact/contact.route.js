define([
    'baseController', 'underscore',
    'apps/contact/views/contact.layout', 'apps/contact/views/contact.view'
], function(BaseController, _, ContactLayout, ContactView) {

    return BaseController.extend({

        getLayoutChannelName: function() {
            return 'contactLayout';
        },

        initializeLayout: function () {
            this.layout = new ContactLayout()
        },

        execute: function(routeData) {
            Backbone.Wreqr.radio.commands.execute( 'navbarChannel', 'menu:select', 'contactMenu' );
            this.layoutChannel.commands.execute( 'content:render', new ContactView() );
        }

    });

});