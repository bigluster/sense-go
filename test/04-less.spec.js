'use strict';

// core dependencies
var path = require( 'path' );

// local dependencies
var senseGo = require( './../lib/' );
var chai = require( 'chai' );
var chaiFiles = require('chai-files');
chai.use( chaiFiles );
var file = chaiFiles.file;
var expect = chai.expect;
var testUtils = require( './lib/test-utils' );

describe( 'less tasks (with custom configuration)', function () {

	var tmpDir = path.join( __dirname, './.tmp' );

	beforeEach( function ( done ) {
		testUtils.delDir( tmpDir, done );
	} );
	afterEach( function ( done ) {
		testUtils.delDir( tmpDir, done );
	} );

	it( 'should run lessEach', function ( done ) {

		var config = {
			lessEach: {
				src: path.join( __dirname, './fixtures/lessEach/**/*.less' ),
				dest: tmpDir
			}
		};


		senseGo.init( config, function ( err ) {
			expect( err ).to.be.undefined;
			expect( senseGo.gulp._registry._tasks ).not.to.be.null;
			expect( senseGo.gulp._registry._tasks ).to.have.property( 'less:each' );

			senseGo.gulp.series( 'less:each' )( function () {
				expect( file( path.join( __dirname, './.tmp/root.css' ) ) ).to.exist;
				expect( file( path.join( __dirname, './.tmp/variables.css' ) ) ).to.exist;
				expect( file( path.join( __dirname, './.tmp/whatever.css' ) ) ).to.exist;
				done();
			} );
		} );
	} );

	it( 'should run lessReduce tasks', function ( done ) {
		var config = {
			lessReduce: {
				src: path.join( __dirname, './fixtures/lessReduce/root.less'),
				dest: tmpDir
			}
		};

		senseGo.init( config, function ( err ) {
			expect( err ).to.be.undefined;
			expect( senseGo.gulp._registry._tasks ).not.to.be.null;
			expect( senseGo.gulp._registry._tasks ).to.have.property( 'less:reduce' );

			senseGo.gulp.series( 'less:reduce' )( function () {
				expect( file( path.join( __dirname, './.tmp/root.css' ) ) ).to.exist;
				done();
			} );
		} );
	} )

} );
