define([
    'baseController', 'underscore',
    'apps/home/views/home.layout', 'apps/home/views/home.view'
], function(BaseController, _, HomeLayout, HomeView) {

    return BaseController.extend({

        getLayoutChannelName: function() {
            return 'homeLayout';
        },

        initializeLayout: function () {
            this.layout = new HomeLayout()
        },

        execute: function(routeData) {
            Backbone.Wreqr.radio.commands.execute( 'navbarChannel', 'menu:select', 'homeMenu' );
            this.layoutChannel.commands.execute( 'content:render', new HomeView() );
        }

    });

});