class Weather{

    async getWeather(city){

        if(!city) throw new Error('City is empty'); //if city is empty throw an error
        

        const encodedCity=encodeURI(city);

        const geoResp= await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodedCity}&count=10&language=en&format=json`)

    }
}