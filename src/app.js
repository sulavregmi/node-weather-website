const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utilis/geocode')
const forecast = require('./utilis/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for Express Config
const publicDirectoryPath = (path.join(__dirname, '../public'))
const viewsPath = path.join(__dirname, '../templates/views') //customizing the path of views // Not necessary if we use 'views'(folder name) in palce of 'templates'
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')  //setting up handle bar
app.set('views' ,viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) =>{
    res.render('index',{
        title : 'Weather',
        name : 'Sulav'

    })
})

app.get('/about', (req,res) =>{
    res.render('about',{
        title: 'About Me',
        name: 'Sulav Regmi'
    })
})


// app.get('/help',(req,res)=> {
//     res.send('Help Page')

// })

// app.get('/about',(req,res) =>{
//     res.send ('<h1>About Page</h1>')
// })

app.get('/help', (req,res) =>{
    res.render('help',{
        helpText : 'This is some helpful text.',
        title : 'Help',
        name : 'Regmi, Sulav'
    })
})



app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error:'You should provide address'
        })
    }
    
    geocode(req.query.address,(error,{latitude,longitude,location}={}) =>{
        if(error){
            return res.send({ error}) //short hand
        }

        forecast(latitude,longitude,(error,forecastData) =>{
            if(error){
                 return res.send({error})
            }
            
            res.send({
                forecast: forecastData,
                location,
                address : req.query.address
            })
        })
    }) 


    // res.send({
    //     address: req.query.address,
    //     forecast : "It's 23 degree"
    // })
})



app.get('/products',(req,res) =>{
    if(!req.query.search){
        return res.send({
            error : 'You must provide a search value'
        })
    }
    console.log(req.query.search)
    res.send({
        produts: []
    })
})

app.get('/help/*',(req,res) =>{
    res.render('404',{
        title :'404',
        name : 'Sulav',
        errorMessage : 'Help Article not found'


    }) 
})

app.get('*',(req,res) =>{
    res.render('404',{
        title: '404',
        name : 'Sulav',
        errorMessage : 'Page not found'
    })
})
app.listen(3000,()=>{
    console.log('Server is up on port 3000')

})
