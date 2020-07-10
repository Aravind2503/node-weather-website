const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Aravind'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Aravind'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        msg:'this is some helpful text :)',
        title:'Help page',
        name:'Aravind'
    })
})

app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        return(res.send({
            error:'Address is mandatory'
        }))
    }

    geocode(req.query.address,(error,geoData)=>{
        if(error){
            return(res.send({
                error
            }))
        }

        forecast(geoData.longitude,geoData.latitude,(error,foreCast)=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                foreCast,
                address:req.query.address,
                
            })
        })
    })
    

    // res.send({
    //     location:'Bangalore',
    //     forecast:'cool with a chance of rain',
    //     address:req.query.address
    // })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Aravind',
        errorMessage:'help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Aravind',
        errorMessage:'Page not found'
    })
})


app.listen(3000,() =>{
    console.log('server is up on port 3000')
})