define([
    'marionette',
    'apps/contact/list/contact.list.route', 'apps/contact/create/contact.create.route'
], function(Marionette, ContactListRoute, ContactCreateRoute) {

    return Marionette.Object.extend({

        // Define the router to be used for this page/app
        Router: Backbone.Blazer.Router.extend({

            // Define all the URL mappings for this page/app
            routes: {
                'contact': new ContactListRoute(),
                'contact/create': new ContactCreateRoute()
            }
        }),


        initialize: function() {
            new this.Router();
        }

    });

});