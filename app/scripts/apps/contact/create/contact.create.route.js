define([
    'underscore', 'backbone', 'baseRoute',
    'apps/contact/contact.layout', 'apps/contact/create/contact.createForm.view', 'spinner',
    'apps/contact/entities/contact.model'
], function(_, Backbone, BaseRoute, ContactLayout, ContactCreateView, Spinner, ContactModel) {

    return BaseRoute.extend({

        getLayoutChannelName: function() {
            return 'contactLayout';
        },

        initializeLayout: function () {
            this.layout = new ContactLayout();
        },

        execute: function() {
            Backbone.Wreqr.radio.commands.execute( 'navbarChannel', 'menu:select', 'contactMenu' );
            this.layoutChannel.commands.execute( 'content:render', new ContactCreateView({ model: new ContactModel() }));
        }

    });

});