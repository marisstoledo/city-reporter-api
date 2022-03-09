'use strict';

//require in out libraries
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const weather = require('./data/weather.json');
// const { response } = require('express');

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
    
    try{
    const weatherData = await axios.get(url);
    console.log(weatherData.data.data);

    
         const weatherArray = weatherData.data.data.map(day => new Forecast(day));

        response.status(200).send(weatherArray);

    }catch(error) {
        console.log(error);
        response.status(500).send('city not found')
    }
})

app.get('/movies', async (request, response) => {
let searchQuery = request.query.searchQuery;
console.log("city we searched for: ", searchQuery);

const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.b8e8821a3d5d2362f6ee2319a3e9de8}&language=en-US&page=1&query=${searchQuery}`
console.log('url: ', url);

try{
    const movieData = await axios.get(url);
    console.log(movieData.data.results);
    const movieArray = movieData.data.data.map(movie => new Movie(movie));
    
        response.status(200).send(movieArray);

    }catch(error) {
        console.log(error);
        response.status(500).send('movie not found')
    }

})

function Movie(movie){
    this.title = movie.title,
    this.overview =  movie.overview,
    this.average_voters = movie.vote_average,
    this.total_votes = movie.vote_count,
    this.image_url =  'https://image.tmdb.org/t/p/w500' + movie.poster_path,
    this.popularity = movie.popularity,
    this. released_on = movie.release_date
}

function Forecast(day) {
    this.day = day.valid_date
    this.description = day.weather.description
}

app.use('*', (request, response) => response.status(404).send('that endpoint does not exists'));

app.listen(PORT, () => console.log(`listening on port ${PORT}`));



