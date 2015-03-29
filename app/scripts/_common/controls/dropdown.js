define(['jquery', 'marionette', 'underscore'], function($, Marionette, _) {

    /**
     *
     * ItemView for rendering select drop down menus
     *
     * usage:
     *      var select = new FormSelect({
     *           id: **select ID**,
     *           name: '**ID Attribute**',
     *           collection: **backbone collection**,
     *           display: '**display attribute**',
     *           firstItemBlank: (**true or false**)
     *         });
     *
     * $(element).html(select.render().el);
     */
    return Marionette.ItemView.extend({
        tagName: 'select',
        firstItemBlank: false,
        selected: '',
        value: 'id',
        display: '',
        name: '',
        defaultValue: '',
        id: _.uniqueId(),

        initialize: function(options) {
            if (_.isUndefined(options.display)) {
                throw 'Display must be defined as an option.';
            }

            if (_.isUndefined(options.name)) {
                throw 'Name must be defined as an option.';
            }

            this.display = options.display;
            this.name = options.name;
            this.defaultValue = options.defaultValue;

            if (!_.isUndefined(options.value)) {
                this.value = options.value;
            }

            if (!_.isUndefined(options.id)) {
                this.id = options.id;
            }

            if (!_.isUndefined(options.selected)) {
                this.selected = options.selected;
            }

            if(!_.isUndefined(options.firstItemBlank)) {
                this.firstItemBlank = options.firstItemBlank;
            }
        },

        collectionEvents: {
            'sync' : '_refreshOptions'
        },

        attributes: function() {
            return {
                name: this.name
            };
        },

        _refreshOptions: function() {
            this._unbindUIElements();
            this.render();
        },

        _renderTemplate: function() {

            var html = '';

            var optionTemplate =
                _.template('<option value="<%= ' + this.value + ' %>"<% if(selected) { %> selected<% } %>><%= ' + this.display + ' %></option>');

            if(this.firstItemBlank) {
                html += $('<option />').html();
            }

            //if (!_.isUndefined(this.defaultValue)){
            //    //we should change this
            //    html =+ '<option value=0>' + this.defaultValue[0] + '</option>';
            //}

            _.each(this.collection.models, function( item ){
                var selected = false;

                if(this.selected !== '') {
                    if(item.attributes[this.value] == this.selected) {
                        selected = true;
                    }
                }
                html += optionTemplate(_.extend({ selected: selected }, item.attributes));
            }, this);

            this.attachElContent(html);
            return this;
        }
    });
});