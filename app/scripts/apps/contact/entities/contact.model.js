define([
    'backbone', 'globalConfig'
], function(Backbone, globalConfig) {

    return Backbone.Model.extend({

        urlRoot: globalConfig.apiURL + '/contact'

    });
});