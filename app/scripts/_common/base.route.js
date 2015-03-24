define([
    'marionette', 'underscore', 'backbone'
], function(Marionette, _, Backbone) {

    return Backbone.Blazer.Route.extend({

        initialize: function() {
            this._initializeRadio();
            this._setRadioHandlers();
        },

        _initializeRadio: function() {
            this.layoutChannel = Backbone.Wreqr.radio.channel(this.getLayoutChannelName());
        },

        _setRadioHandlers: function() {
            this.layoutChannel.commands.setHandler('content:render', function(contentView) {

                this._renderLayoutIfNeeded();
                this.layout.containerRegion.show(contentView);

            }, this);
        },

        _renderLayoutIfNeeded: function() {
            if (_.isUndefined(this.layout) || this.layout.isDestroyed) {
                this.initializeLayout();
                Backbone.Wreqr.radio.commands.execute( 'mainLayout', 'content:render', this.layout );
            }
        },

        getLayoutChannelName: function() {
            throw 'Child controllers must implement this method.';
        },

        initializeLayout: function() {
            throw 'Child controllers must implement this method.';
        }


    });

});