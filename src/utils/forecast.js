const request = require('request')

const forecast = (long,lat,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=811b7d6545066677383404ead52e7bf0&query='+lat+','+long+'&units=m'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to reach location services',undefined)
        }
        else if(response.body.error){
            callback('incorrect latitude and longitude provided',undefined)
        }
        else{
            callback(undefined,{
                location:response.body.location.name,
                currtemp:response.body.current.temperature,
                pressure:response.body.current.pressure,
                humidity:response.body.current.humidity
            })
            
        }
    })
}


module.exports = forecast