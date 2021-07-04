'use strict'

class ArtModel {
    constructor(data){
        this.title = data.title;
        this.thumbnail = (data.thumbnail || {}).lqip;
        this.artist_name  = data.artist_title;
        this.description = data.credit_line;
    }
}
module.exports = ArtModel;
