const request = require("request");

const forecast = (latitude, longitude, callback)=>{
    url = `https://api.darksky.net/forecast/57ba053f843279b83feaed2e327f9dac/${latitude},${longitude}?units=si`;
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to the server!');
        }
        else if(body.error){
            callback('Err');
        }
        else{
            const temperature = body.currently.temperature;
            const precipProbability = body.currently.precipProbability*100;
            const summary = body.daily.data[0].summary;
            callback(undefined, {
                temperature,
                precipProbability,
                summary
            });
        }
        
    });
}

module.exports = forecast;