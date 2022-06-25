const request = require("postman-request");

const forecast = ((latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2bee12b6ba885af95b92a116dd5ea6a6&query='+latitude+','+longitude+'&units=f';
    request({url: url, json:true}, (error, {body})=>{
        if(error){
            callback('unable to connect with weather services', undefined);
        }else if(body.error){
            callback('unable to find location', undefined);
        }else{
            // console.log('hello', response.body.current);
            callback(undefined, 'it is currrently '+ body.current.feelslike+ 'f temperature and ' + body.current.precip + '% chances of rain' );
        }
    })
})

module.exports = forecast;