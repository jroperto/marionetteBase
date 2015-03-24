(function() {
	'use strict';

	var root = this;

	root.define([
		'models/test'
		],
		function( Test ) {

			describe('Test Model', function () {

				it('should be an instance of Test Model', function () {
					var test = new Test();
					expect( test ).to.be.an.instanceof( Test );
				});

				it('should have more test written', function(){
					expect( true ).to.be.ok(true);
				});
			});

		});

}).call( this );