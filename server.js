'use strict'

const express = require ('express');
const cors = require ('cors');
const axios = require('axios');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const {getArtApiData,creatFav, 
    getFav , 
    deleteFav,
     updateFav} = require ('./controller/art.controller');



mongoose.connect('mongodb://localhost:27017/art' , { 
    
useNewUrlParser: true, useUnifiedTopology: true });



app.get("/", (req, res)=> {
    res.send('proof of life')
});

app.get("/art", getArtApiData);

app.post("/art/fav", creatFav);
app.get("/art/fav", getFav);
app.delete("/art/fav/:slug", deleteFav);
app.put("/art/fav/:slug", updateFav);


app.listen(PORT, ()=> {
    console.log(`alserver run on ${PORT}`);
});



