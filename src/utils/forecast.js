const request = require( 'request' );

const forecast = ( lat, long, lang, callback ) => {
    const url = 'https://api.darksky.net/forecast/400a8e3fdb5ccf66538f6b3c3a69c2f2/' + lat + ',' + long + '?lang=' + lang;
    request( { url, json: true }, ( error, { body } = {} ) => {
        if( error ) {
            callback( 'Unable to connect to service', undefined );
        } else if( body.error ){
            callback( body.error, undefined );
        } else {
            callback( undefined, `${body.currently.summary} It is currently ${body.currently. temperature} degress out. There is a ${body.currently.precipProbability}% chance of rain.\n ` +
            `The wind speed today is ${body.currently.windSpeed} and pressure is ${body.currently.pressure}` );
        }
    } )
}

module.exports = forecast;

