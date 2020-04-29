const request = require('request')

const geocode = (address,callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic3VsYXZyZWdtaSIsImEiOiJjazh6ZTZqMjgxaGVpM3BvN3N2aXN0eGl5In0.iTiEkDU8DFFQggPFXK9GvQ&limit=1'

    request({url, json :true},(error,{body}) => {
        //request({url: url, json :true},(error,response) => {     url is typed only once due to short handing and response is destructured to body as body is only used from response
        if(error){
            callback('Unable to connect to location services', undefined)
        } else if(body.features.length===0){
            callback('Unable to find location', undefined)
        } else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })

}

module.exports = geocode
