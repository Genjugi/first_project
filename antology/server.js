const express = require('express');
const app = express();
const {getST} = require("./Interface");
const {saveST} = require("./Interface");
const {getSD} = require("./Interface");
const {saveSD} = require("./Interface");
const {getHome} = require("./Interface");



app.set('view engine', 'html')
    .use(express.urlencoded())
    .use(express.json())
    .route('/')
    .get(getHome)

app
    .set('view engine', 'html')
    .use(express.urlencoded())
    .use(express.json())
    .route('/studentstable')
    .get(getST)
    .post(saveST)

app
    .set('view engine', 'html')
    .use(express.urlencoded())
    .use(express.json())
    .route('/studentsdata')
    .get(getSD)
    .post(saveSD)







app.listen(4444, function(){   // порт 4444 можно указать любой свободный
    console.log('Api start')
})
