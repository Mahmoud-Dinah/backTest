"use strict";

const axios = require("axios");
const { request } = require("express");
const ArtModel = require("../models/art.models");
const artOneModel = require ("../models/art.mongoose.model");


const getArtApiData = (req, res) => {
  const url = `https://api.artic.edu/api/v1/artworks?limit=10`;
  axios
    .get(url)
    .then((data) => {
      const responsData = data.data.data.map((art) => {
        return new ArtModel(art);
      });
      res.send(responsData);
    })
    .catch((error) => {
      res.send(error);
    });
};

const creatFav = async (req, res) => {

  const {title,thumbnail ,artist_name ,description} = req.body;



const slug = title.toLowerCase().split(' ').join('-');

artOneModel.find({ slug:slug}, (error, data) =>{
if (data.length > 0){
  res.send('data already exist')
}else{
  
  const newArtOne = new artOneModel({
    title:title,
    slug:slug,
    thumbnail: thumbnail,
    artist_name: artist_name,
    description: description
  });
  newArtOne.save();
  res.send(newArtOne);

}

});


}


const getFav = async (req, res) => {
artOneModel.find({}, (error, data) =>{
  res.send(data)
});
}

const deleteFav = async (req, res) => {
const slug = req.params.slug;

artOneModel.remove({slug:slug}, (error, data) => {
  if (error){
    res.send(error);
  }else{
    artOneModel.find({}, (error, data)=> {
      res.send(data);
    });
  }
});

};


const updateFav = async (req, res) => {

const {description} = req.body;
const slug = req.params.slug;

artOneModel.find({slug:slug}, (error, data) => {
if (error){
  res.send(error)
}else{
  data[0].description = description;

  data[0].save();
  res.send(data);
}
});

};




module.exports = {
   getArtApiData, 
  creatFav, 
  getFav , 
  deleteFav,
   updateFav };
