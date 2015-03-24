define([
    'marionette', 'apps/home/home.route'
], function(Marionette, HomeRoute ) {

    return Marionette.Object.extend({

        // Define the router to be used for this page/app
        Router: Backbone.Blazer.Router.extend({

            // Define all the URL mappings for this page/app
            routes: {
                '': new HomeRoute()
            }
        }),


        initialize: function() {
            new this.Router();
        }

    });

});