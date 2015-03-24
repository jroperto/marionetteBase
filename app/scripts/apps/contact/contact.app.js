define([
    'marionette', 'apps/contact/contact.route'
], function(Marionette, ContactRoute ) {

    return Marionette.Object.extend({

        // Define the router to be used for this page/app
        Router: Backbone.Blazer.Router.extend({

            // Define all the URL mappings for this page/app
            routes: {
                'contact': new ContactRoute()
            }
        }),


        initialize: function() {
            new this.Router();
        }

    });

});