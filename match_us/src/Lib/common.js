export const proxyurl = 'https://cors-anywhere.herokuapp.com/'
export const fDefault = 'https://bit.ly/3qF0nSa'

//Movies Links
export const tmdbKey = 'a6f34e87c9902a29316fd7cff8f50328'
export const poster = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2'
export const baseURL = `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbKey}&language=en-US&page=`
export const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${tmdbKey}&language=en-US`
export const detailUrl = 'https://api.themoviedb.org/3/movie/'


//Google Links 
export const GKey = 'AIzaSyAn3WW4SI3RHmQ7I_6HFcrUTdNalXkoJ4A'
export const GImages = `https://maps.googleapis.com/maps/api/place/photo?key=${GKey}&maxwidth=400&photoreference=`
export const geoURL = `https://maps.googleapis.com/maps/api/geocode/json?key=${GKey}&address=`
export const fDetails = `https://maps.googleapis.com/maps/api/place/details/json?key=${GKey}&place_id=`


//Food Links
export const fURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${GKey}&type=food`
export const noPlaces = { img: 'https://bit.ly/3mtHLRI', name: 'No More Restaurants', vicinity: 'Try adjusting location or keywords for more...', f_id: 'n' }
export const tPlace = ''

//activity Links

export const aURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${GKey}&rankby=distance`