const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

console.log(__dirname);
console.log(__filename);

const app = express();

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');  
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views' , viewPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Anchal'
    });               
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide search term',
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/about', (req , res) => {
    res.render('about', {
        name: 'Anchal',
        title: 'About me'
    });
})


app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address , (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error,  forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            })
        })
    })
    // res.send({
    //     forecast: 'It is raining', 
    //     location: 'India',
    //     address: req.query.address,
    // })
})


app.get('/help', (req , res) => {
    res.render('help', {
        helpText : 'this is some helpful text',
        name: 'Anchal',
        title: 'Help'
    });
})

app.get('/help/*' , (req, res) => {
    res.render('404' , {
        errorText: 'help article not found',
        title: '404',
        name: 'Anchal'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        errorText: 'page not found',
        title: '404',
        name: 'Anchal'
    });
})


//here '*' means everythings match

//render func arguments : first argument is the name of the to render and 2nd is object which contains the value you want your view to be able to access
// app.get('/home', (req, res) => {
//     res.send([{
//         name: 'andrew',
//         age: 27
//         },
//     ]);
// })

// app.get('/about', (req, res) => {
//     res.send('About section!');
// })

//app.com
//app.com/help

app.listen(3000, () => {
    console.log('server is up on port 3000'); 
});

