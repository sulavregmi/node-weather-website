const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+encodeURIComponent(latitude)+'&lon='+encodeURIComponent(longitude)+'&units=metric&appid=23e3c72ac6ae56b914eb918cd9334d7f'

    request({url, json:true}, (error,{body}) => {
        if(error){
            callback('Unable to connect to weather services',undefined)
        } else if(body.error) {
            callback('Unable to find location',undefined)
        }
        else {
            callback(undefined,'It is currently '+body.current.temp  +' degrees out. There is a visibility of '+body.current.visibility+' meter')
        }
    })
}

module.exports = forecast
