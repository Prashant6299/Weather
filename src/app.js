const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, "../templates/views")
const partials = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partials);

app.use(express.static(publicDirPath));

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        owner: 'Prashant'
    });
});

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        owner: 'Prashant'
    })
});

app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'Help',
        message: 'I need help.',
        owner:'Prashant'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide a location'
        });
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({error});
        }

        forecast(latitude, longitude, (err, forecastData)=>{
            if(error){
                return res.send({error: err})
            } 

            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            })
        })
        
    })
   
});

app.get('/help/*', (req, res)=>{
    res.render('404', {
        message: 'Help Article Not Found',
        title: '404',
        owner: 'Prashant'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        message: 'Page Not Found',
        title: '404',
        owner: 'Prashant'
    })
})
app.listen(3000, ()=>{
    console.log('Server has started on port 3000');
});