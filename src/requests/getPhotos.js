import axios from 'axios'

export const getPictures = (page, query) => {
    let hasErrors = false;

    String.prototype.hashCode = function() {
      var hash = 0, i, chr;
      if (this.length === 0) return hash;
      for (i = 0; i < this.length; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
      }
      return hash;
    };
    
    function getUnsplash(){
      console.log(`https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&page=${page}&query=${query}&per_page=10`)
      return axios.get(`https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&page=${page}&query=${query}&per_page=10`)
      .then(response => {
        const unsplash = response.data.results
        const newPhotos = unsplash.map((obj, indx) => {
          let hsh = {}
          hsh.src = obj.urls.small
          hsh.width = obj.width
          hsh.height = obj.height
          hsh.key = hsh.src.hashCode();
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
    
    function getPexels(){
      return axios.get(`https://api.pexels.com/v1/search?query=${query}+query&per_page=10&page=${page}`, {'headers': {'Authorization': process.env.REACT_APP_PEXELS_API_KEY}})
      .then(resp => {
        const pexels = resp.data.photos
        // this.setState(() => { return { pexels: pexels }})
        const newPhotos = pexels.map((obj, indx) => {
          let hshh = {};
          hshh.src = obj.src.medium;
          hshh.width = obj.width;
          hshh.height = obj.height;
          hshh.key = hshh.src.hashCode();
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
          hshh.key = hshh.src.hashCode();
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