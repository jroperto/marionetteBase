define([
    'backbone', 'globalConfig'
], function(Backbone, globalConfig) {

    return Backbone.Collection.extend({

        url: globalConfig.apiURL + '/contact'

    });
});