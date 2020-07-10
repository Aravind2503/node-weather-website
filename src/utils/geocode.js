const request = require('request')

const geocode = (place,callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=pk.eyJ1IjoicGVuZ2lvb28iLCJhIjoiY2tjYno2ZGd2MTFhdTJybGtvMXI0Nnl2cCJ9.PUYuzOqKYz75HugxrtwNPg`
    debugger
    request({url:url , json:true},(error,response)=>{
        if(error){
            callback('unable to connect to location services',undefined)
        }
        else if(response.body.features.length === 0){
            callback('unable to find the location. try something else',undefined)
        }
        else{
            callback(undefined,{
                longitude:response.body.features[0].center[0],
                latitude:response.body.features[0].center[1],
                location:response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode