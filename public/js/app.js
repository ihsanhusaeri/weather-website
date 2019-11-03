const forecast = ( location ) => {
    fetch( '/weather?address=' + location ).then( response => {
        response.json().then( ( { error, location, latitude, longitude, forecast } = {} ) => {
            if( error ) {
                messageLocation.textContent = error;
            } else {
                messageLocation.textContent = 'Detail Location: ' + location;
                messageLatitude.textContent = 'Latitude: ' + latitude;
                messageLongitude.textContent = 'Longitude: ' + longitude;
                messageSummary.textContent = 'Summary: ' + forecast;
            }

        } )
    } );
}

const weatherForm = document.querySelector( 'form' );
const search = document.querySelector( 'input' );
const messageLocation = document.querySelector( '#message-location' );
const messageLatitude = document.querySelector( '#message-latitude' );
const messageLongitude = document.querySelector( '#message-longitude' );
const messageSummary = document.querySelector( '#message-summary' );
weatherForm.addEventListener( 'submit', ( event ) => {
    event.preventDefault();
    messageLocation.textContent = 'Loading...';
    messageLatitude.textContent = '';
    messageLongitude.textContent = '';
    messageSummary.textContent = '';
    const location = search.value;
    forecast( location );
} );