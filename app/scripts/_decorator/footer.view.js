define([
    'marionette', 'underscore',
    'text!tpl/decorator/footer.html'
],function(Marionette, _, footerTemplate){

    return Marionette.ItemView.extend({

        template: _.template(footerTemplate)

    });
});