const forecast = ( location ) => {
    fetch( 'http://localhost:3000/weather?address=' + location ).then( response => {
        response.json().then( ( { error, location, forecast } = {} ) => {
            if( error ) {
                // console.log( error );
                messageOne.textContent = error;
            } else {
                // console.log( 'location: ', location );
                // console.log( 'forecast: ', forecast );
                messageOne.textContent = location;
                messageTwo.textContent = forecast;
            }

        } )
    } );
}

const weatherForm = document.querySelector( 'form' );
const search = document.querySelector( 'input' );
const messageOne = document.querySelector( '#message-1' );
const messageTwo = document.querySelector( '#message-2' );
weatherForm.addEventListener( 'submit', ( event ) => {
    event.preventDefault();
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    const location = search.value;
    forecast( location );
} );