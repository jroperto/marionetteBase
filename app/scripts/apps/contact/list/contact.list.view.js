define([
    'marionette',
    'text!tpl/contact/list/contact.list.html', 'text!tpl/contact/list/contact.row.html'
], function(Marionette, contactListTemplate, contactRowTemplate) {

    var ContactRowView = Marionette.ItemView.extend({

        template: _.template(contactRowTemplate)
    });

    return Marionette.CompositeView.extend({

        childView: ContactRowView,
        childViewContainer: '#contacts-container',

        template: _.template(contactListTemplate)

    });

});