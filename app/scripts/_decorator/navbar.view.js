define([
    'marionette', 'underscore', 'backbone',
    'text!tpl/decorator/navbar.html'
],function(Marionette, _, Backbone, navbarTemplate){

    return Marionette.ItemView.extend({

        template: _.template(navbarTemplate),

        ui: {
            'menuItems': '.menuItem'
        },

        initialize: function() {
            this._initializeRadio();
            this._setRadioHandlers();
        },

        _initializeRadio: function() {
            this.navbarChannel = Backbone.Wreqr.radio.channel('navbarChannel');
        },

        _setRadioHandlers: function() {
            this.navbarChannel.commands.setHandler('menu:select', function(menuId) {

                this.ui.menuItems.removeClass('active');
                this.$('#' + menuId).addClass('active');

            }, this);
        }
    });
});