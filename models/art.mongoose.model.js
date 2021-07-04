"use strict";

const mongoose = require("mongoose");
// now creat a schema for the model

const artOneSchema = mongoose.Schema({
  title: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },

  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },

  thumbnail: String,
  artist_name: String,
  description: String,
});

const artOneModel = mongoose.model('art_model', artOneSchema)

module.exports = artOneModel;