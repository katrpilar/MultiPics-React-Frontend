import axios from 'axios'

export const getPictures = (page, query) => {
    let hasErrors = false;
    
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
          hsh.metadata = {download: obj.links.download, brand: 'Unsplash', link: 'https://unsplash.com/', photographer: obj.user.name, profile: obj.user.portfolio_url};
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
          hshh.metadata = {download: obj.src.original, brand: 'Pexels', link: 'https://www.pexels.com/', photographer: obj.photographer, profile: obj.photographer_url};
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
          hshh.metadata = {download: obj.largeImageURL, brand: 'Pixabay', link: 'https://www.pixabay.com/', photographer: obj.user, profile: `https://pixabay.com/users/${obj.user}-${obj.user_id}/`};
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
    .then(axios.spread(function (pix) {
      // Both requests are now complete
      const pixWithKeys = pix.map(p => ({
        ...p,
        key: pix.indexOf(p)
      }));
      
      return pixWithKeys;
    }
    
    ));   
  }

  export default getPictures;