export class Weather{

    async getWeather(city){
        const cleanedCity=city.trim();

        if(!cleanedCity) throw new Error('City is empty'); //if city is empty throw an error
        

        const encodedCity=encodeURI(cleanedCity);

        const geoResp= await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodedCity}&count=10&language=en&format=json`);

        //if the response object is not ok throw an error
        if(!geoResp.ok) throw new Error('Result not ok');

        //parse the body using json method
        const geoData=await geoResp.json();

        if(!geoData.results || geoData.results.length===0) throw new Error('Result not found');

        const {name,latitude,longitude}=geoData.results[0];

        const weatherRes=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=temperature_2m,precipitation,wind_speed_10m`);

        if(!weatherRes.ok) throw new Error('Response is not ok!');

        const weatherData=await weatherRes.json();

        if(!weatherData.current) throw new Error('No data available');

        const {temperature_2m:temperature,wind_speed_10m:wind,precipitation:rain}=weatherData.current;

        return[ {
            city:name,
            temperature:temperature,
            wind:wind,
            rain:rain
        }];

    }
}