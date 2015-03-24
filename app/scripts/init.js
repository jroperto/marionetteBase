require.config({

    baseUrl: '/scripts',

    /* starting point for application */
    deps: ['marionette', 'bootstrap', 'blazer', 'main'],


    shim: {
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    },

    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        blazer:     '../bower_components/backbone.blazer/dist/backbone.blazer',

        /* alias all marionette libs */
        'marionette': '../bower_components/backbone.marionette/lib/backbone.marionette',

        /* alias the bootstrap js lib */
        bootstrap: '_vendor/bootstrap',

        globalConfig: '_global/globalConfig',

        /* Alias text.js for template loading and shortcut the templates dir to tpl */
        text: '../bower_components/requirejs-text/text',
        tpl: '../templates',


        /* Aliases for common scripts */
        baseController: '_common/base.controller',
        spinner:        '_decorator/spinner.view'

    }
});
