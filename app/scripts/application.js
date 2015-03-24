define([
    'marionette', 'underscore', 'backbone',
    '_decorator/main.layout',
    'apps/home/home.app',
    'apps/contact/contact.app'
], function(Marionette, _, Backbone, MainLayout, HomeApp, ContactApp) {

    var VpaFutbolApp = Marionette.Application.extend({

        SUB_APPS: [
            HomeApp,
            ContactApp
        ],

        initialize: function() {
            this._initializeRadio();
            this._setRadioHandlers();
        },

        _initializeRadio: function() {
            this.appChannel = Backbone.Wreqr.radio.channel('app');
            this.navigateChannel = Backbone.Wreqr.radio.channel('navigate');
        },

        _setRadioHandlers: function() {
            this._setNavigateChannelHandlers();
        },

        _setNavigateChannelHandlers: function() {
            this.navigateChannel.commands.setHandler('navigate', function(url) {
                this._navigate(url);
            }, this);

            this.navigateChannel.commands.setHandler('navigate:trigger', function(url) {
                this._navigate(url, { trigger: true });
            }, this);


            this.navigateChannel.reqres.setHandler('currentRoute', function() {
                return this._getCurrentRoute();
            }, this);

        },

        onStart: function() {
            this._displayMainLayout();
            this._initializeSubApps();
            this._initializeBackboneHistory();
        },

        _displayMainLayout: function() {
            var mainLayoutView = new MainLayout();
            mainLayoutView.render();
        },

        _initializeSubApps: function() {
            _.each(this.SUB_APPS, function(SubApp) {
                new SubApp();
            });
        },

        _initializeBackboneHistory: function() {
            if (Backbone.history || Backbone.History.started) {
                Backbone.history.start();
            }
        },

        /**
         * Utility function to change page route. If { tigger: true } is passed as option
         * it will change the URL and trigger the route.
         * @param route
         * @param options
         */
        _navigate: function (route, options) {
            Backbone.history.navigate(route, options || {});
        },

        /**
         * Gets current Backbone route.
         * @returns {Backbone.History.fragment|*}
         */
        _getCurrentRoute: function () {
            return Backbone.history.fragment;
        }
    });

    var app = new VpaFutbolApp();

    return app;

});