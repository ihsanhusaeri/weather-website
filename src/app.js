const path = require( 'path' );
const express = require( 'express' );
const app = express();
const hbs = require( 'hbs' );
const geocode = require( './utils/geocode.js' );
const forecast = require( './utils/forecast.js' );
const publicDirectoryPath = path.join( __dirname, '../public' );
const viewsPath = path.join( __dirname, '../templates/views' );
const partialsPath = path.join( __dirname, '../templates/partials' );

app.set( 'view engine', 'hbs' );
app.set( 'views', viewsPath );
hbs.registerPartials( partialsPath );

app.use( express.static( publicDirectoryPath ) );

app.get( '', ( req, res ) => {
    res.render( 'index', {
        title: 'Weather',
        name: 'IcanHucaeli'
    } );
} );

app.get( '/about', ( req, res ) => {
    res.render( 'about', {  
        title: 'About Me',
        name: 'IcanHucaeli'
    } );
} );

app.get( '/products', ( req, res ) => {
    if( !req.query.search ) {
        return res.send( {
            error: 'You must provide a search term'
        } );
    }
    res.send( {
        products: []
    } )
} );

app.get( '/help', ( req, res ) => {
    res.render( 'help', {
        title: 'Help',
        name: 'IcanHucaeli'
     } );
} );

app.get( '/weather', ( req, res ) => {
    if( !req.query.address ) {
        return res.send( {
            error: 'You must provided the address'
        } );
    }
    geocode( req.query.address, ( err, { latitude, longitude, location } = {} ) => {
        if( err ) {
            return res.send( {
                status: false,
                error: err
            } );
        }
        forecast( latitude, longitude, 'en', ( err, forecastData ) => {
            if( err ) {
                return res.send( {
                    status: false,
                    error: err
                } )
            }
            res.send( {
                status: true,
                address: req.query.address,
                location,
                forecast: forecastData
            } )
        } );
    } );
    
} ); 

app.get( '/help/*', ( req, res ) => {
    // res.send( 'Help article not found!' );
    res.render( '404', {
        title: '404',
        errorMessage: 'Help article not found!',
        name: 'IcanHucaeli'
    } );
} );

app.get( '*', ( req, res ) => {
    res.render( '404', {
        title: '404',
        errorMessage: 'Page not found!',
        name: 'IcanHucaeli'
    } );
} );

app.listen( 3000, () => {
    console.log( 'Server is up on port 3000' );
} );
