'use strict';

class Movie {
  constructor(item) {
    this.title = item.original_title,
    this.overview = item.overview,
    this.average_votes = item.vote_count,
    this.image_ur = item.image_ur,
    this.popularity = item.popularity,
    this.released_on = item.release_date;
  }
}
module.exports=Movie;
