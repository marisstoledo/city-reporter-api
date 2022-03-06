'use strict';

//require in out libraries
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const weather = require('./data/weather.json');
const { response } = require('express');

//App to use...
const app = express();
app.use(cors());

// set the port variable
const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
    response.send('testing testing...is this thing on??')
});

app.get('/weather', async (request, response) =>{
    let lat = request.query.lat;
    let lon = request.query.lon;
    let searchQuery = request.query.searchQuery;

    console.log("lat, lon", lat, lon);

    
    // const city = weather.find(cityObj => cityObj.city_name.toLowerCase() === searchQuery.toLowerCase());
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&days=7&lat=${lat}&lon=${lon}`

    console.log(url);
    
    const weatherData = await axios.get(url);
    console.log(weatherData.data.data);

    try{
         const weatherArray = weatherData.data.data.map(day => new Forecast(day));

        response.status(200).send(weatherArray);

    }catch(error) {
        console.log(error);
        response.status(500).send('city not found')
    }
})

function Forecast(day) {
    this.day = day.vaild_date
    this.description = day.weather.description
}

app.use('*', (request, response) => response.status(404).send('that endpoint does not exists'));

app.listen(PORT, () => console.log(`listening on port ${PORT}`));



