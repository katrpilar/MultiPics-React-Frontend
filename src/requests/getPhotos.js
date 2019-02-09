import axios from 'axios'
import { hashCode } from '../helpers/keyHash'

export const getPictures = (page, query) => {
    let hasErrors = false;
    
    function getUnsplash(){
      console.log(`https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&page=${page}&query=${query}&per_page=10`)
      return axios.get(`https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&page=${page}&query=${query}&per_page=10`)
      .then(response => {
        //useful for determining rate limiting
        // response.headers{
        //   x-per-page: "10",
        //   x-ratelimit-limit: "50",
        //   x-ratelimit-remaining: "49",
        //   x-total: "4773"
        // }
        const unsplash = response.data.results
        const newPhotos = unsplash.map((obj, indx) => {
          let hsh = {}
          hsh.src = obj.urls.small
          hsh.width = obj.width
          hsh.height = obj.height
          hsh.key = hashCode(hsh.src);
          hsh.metadata = {download: obj.links.download, brand: 'Unsplash', link: 'https://unsplash.com/', photographer: obj.user.name, profile: obj.user.portfolio_url};
          return hsh;
        });
        console.log("SUCCESS - Unsplash Api GET Request");
        return newPhotos
      })
      .catch(function (errors) {
        console.log('FAIL - Unsplash Api GET Request')
        console.log(errors)
        hasErrors = true;
        return "Fetch Error";
      });
    }
    

    //Sometimes if you search the same search term within a short amount of time Pexels will fail
    function getPexels(){ 
      return axios.get(`https://api.pexels.com/v1/search?query=${query}+query&per_page=10&page=${page}`, {'headers': {'Authorization': process.env.REACT_APP_PEXELS_API_KEY}})
      .then(resp => {
        const pexels = resp.data.photos
        // HTTP response header called "X-Ratelimit-Remaining" 
        // ^^^^ NOT being included in response
        const newPhotos = pexels.map((obj, indx) => {
          let hshh = {};
          hshh.src = obj.src.medium;
          hshh.width = obj.width;
          hshh.height = obj.height;
          hshh.key = hashCode(hshh.src);
          hshh.metadata = {download: obj.src.original, brand: 'Pexels', link: 'https://www.pexels.com/', photographer: obj.photographer, profile: obj.photographer_url};
          return hshh;
        })
        console.log("SUCCESS - Pexels Api GET Request");
        return newPhotos;
      })
      .catch(function (errors) {
        console.log('FAIL - Pexels Api GET Request');
        console.log(errors);
        hasErrors = true;
        return "Fetch Error";
      });
    }
    
    function getPixabay(){
      return axios.get(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${query}&per_page=10&page=${page}`)
      .then(resp => {
        console.log(resp)
        const pixabay = resp.data.hits
        const newPhotos = pixabay.map((obj, indx) => {
          let hshh = {}
          hshh.src = obj.webformatURL;
          hshh.width = obj.webformatWidth;
          hshh.height = obj.webformatHeight;
          hshh.key = hashCode(hshh.src);
          hshh.metadata = {download: obj.largeImageURL, brand: 'Pixabay', link: 'https://www.pixabay.com/', photographer: obj.user, profile: `https://pixabay.com/users/${obj.user}-${obj.user_id}/`};
          return hshh;
        })
        console.log("SUCCESS - Pixabay Api GET Request")
        return newPhotos;
      })
      .catch(function (error) {
        console.log('FAIL - Pixabay Api GET Request')
        console.log(error)
        hasErrors = true;
        return "Fetch Error";
      });
    }

    // return (!hasErrors ? photos : "Fetch Error");

    return axios.all([getUnsplash(), getPexels(), getPixabay()])
    .then(axios.spread(function (unsplash, pexels, pixabay) {
      //Implement a way to return the response objects from each API for collection of rate limit headers

      // Both requests are now complete
      const newPix = [...unsplash, ...pexels, ...pixabay];
      console.log(newPix);
      // debugger;
      // const pixWithKeys = newPix.map((p,indx) => {
        
      //   return {...p, key: indx}
      // });
      
      return newPix;
    }
    
    ));   
  }

  export default getPictures;