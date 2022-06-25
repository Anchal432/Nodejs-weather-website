const request = require("postman-request");

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW5jaGFsNDMyIiwiYSI6ImNsNHJ4c2x1czA1b24zY3FxaXVxc2xuaTkifQ.VGTGMxEMeupJx-sHplh7GQ';

    request({url: url, json:true}, (error, response) => {
        // console.log("hey" ,response.body.features[0].center[0])
        if(error){
            callback('Unable to connect to location services', undefined);
        }else if(response.body.features.length ===0){
            callback('Unable to find location. try another search', undefined);
        }else{
            callback(undefined,{
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
        
        // console.log('longitude ' , data.latitude, data.longitude);
    })
}

module.exports = geocode;