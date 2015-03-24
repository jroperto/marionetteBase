define([
    'baseRoute', 'underscore',
    'apps/home/views/home.layout', 'apps/home/views/home.view'
], function(BaseRoute, _, HomeLayout, HomeView) {

    return BaseRoute.extend({

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