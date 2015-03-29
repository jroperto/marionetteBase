define([
    'baseRoute', 'underscore',
    'apps/contact/contact.layout', 'apps/contact/list/contact.list.view', 'spinner',
    'apps/contact/entities/contact.collection'
], function(BaseRoute, _, ContactLayout, ContactCollectionView, Spinner, ContactCollection) {

    return BaseRoute.extend({

        getLayoutChannelName: function() {
            return 'contactLayout';
        },

        initializeLayout: function () {
            this.layout = new ContactLayout();
        },

        prepare: function(routeData) {
            Backbone.Wreqr.radio.commands.execute( 'navbarChannel', 'menu:select', 'contactMenu' );
            this.layoutChannel.commands.execute( 'content:render', new Spinner());

            routeData.contactCollection = new ContactCollection();
            return routeData.contactCollection.fetch();
        },

        execute: function(routeData) {
            this.layoutChannel.commands.execute( 'content:render', new ContactCollectionView({ collection: routeData.contactCollection }));
        }

    });

});