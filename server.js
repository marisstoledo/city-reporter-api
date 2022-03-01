'use strict';

//require in out libraries
require('dotenv').config();
const express = require('express');
const cors = require('cors');
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

app.get('/weather', (request, reponse) =>{
    let lat = request.query.lat;
    let lat = request.query.lon;
    let searchQuery = request.query.searchQuery;
    
    const city = weather.find(cityObj => cityObj.city_name.toLowerCase() === searchQuery, toLOwerCase());

    try{
        const weatherArray = city.data.map(day => new Forecast(day));

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


app.listen(PORT, () => console.log(`listening on port ${PORT}`));


