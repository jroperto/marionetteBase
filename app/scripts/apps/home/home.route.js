define([
    'underscore', 'backbone', 'baseRoute',
    'apps/home/views/home.layout', 'apps/home/views/home.view'
], function(_, Backbone, BaseRoute, HomeLayout, HomeView) {

    return BaseRoute.extend({

        getLayoutChannelName: function() {
            return 'homeLayout';
        },

        initializeLayout: function () {
            this.layout = new HomeLayout();
        },

        execute: function() {
            Backbone.Wreqr.radio.commands.execute( 'navbarChannel', 'menu:select', 'homeMenu' );
            this.layoutChannel.commands.execute( 'content:render', new HomeView() );
        }

    });

});