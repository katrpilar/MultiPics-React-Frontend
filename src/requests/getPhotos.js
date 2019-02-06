import axios from 'axios'

let q = '';

export const getPictures = (ind, page, query, photos) => {
    let initialIndex = ind;
    //A counter for the 'keys' of each image object to allow the state to tie 'metadata' to each image

    let q = !!(query) ? query : q;

    let hasErrors = false;
    
    function getUnsplash(page, q, photos){
      let initialIndex = photos.length
      console.log(`https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&page=${page}&query=${q}&per_page=10`)
      return axios.get(`https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&page=${page}&query=${q}&per_page=10`)
      .then(response => {
        const unsplash = response.data.results
        unsplash.map((obj, indx) => {
          initialIndex++
          let hsh = {}
          hsh.src = obj.urls.small
          hsh.width = obj.width
          hsh.height = obj.height
          // hsh.key = initialIndex.toString()
          hsh.metadata = {download: obj.links.download, brand: 'Unsplash', link: 'https://unsplash.com/', photographer: obj.user.name, profile: obj.user.portfolio_url};
          photos.push(hsh);        
        })
        console.log("SUCCESS - Unsplash Api GET Request");
        return photos;
      })
      .catch(function (errors) {
        console.log('FAIL - Unsplash Api GET Request')
        console.log(errors)
        hasErrors = true;
        return "Fetch Error";
      });
    }
    
    function getPexels(page, q, photos){
      let initialIndex = photos.length

      return axios.get(`https://api.pexels.com/v1/search?query=${q}+query&per_page=10&page=${page}`, {'headers': {'Authorization': process.env.REACT_APP_PEXELS_API_KEY}})
      .then(resp => {
        const pexels = resp.data.photos
        // this.setState(() => { return { pexels: pexels }})
        pexels.map((obj, indx) => {
          initialIndex++;
          let hshh = {};
          hshh.src = obj.src.medium;
          hshh.width = obj.width;
          hshh.height = obj.height;
          // hshh.key = initialIndex;
          hshh.id = initialIndex.toString();
          hshh.metadata = {download: obj.src.original, brand: 'Pexels', link: 'https://www.pexels.com/', photographer: obj.photographer, profile: obj.photographer_url};
          photos.push(hshh);
        })
        console.log("SUCCESS - Pexels Api GET Request");
        return photos;
      })
      .catch(function (errors) {
        console.log('FAIL - Pexels Api GET Request');
        console.log(errors);
        hasErrors = true;
        return "Fetch Error";
      });
    }
    
    function getPixabay(page, q, photos){
      let initialIndex = photos.length
      return axios.get(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${q}&per_page=10&page=${page}`)
      .then(resp => {
        console.log(resp)
        const pixabay = resp.data.hits
        pixabay.map((obj, indx) => {
          initialIndex++
          let hshh = {}
          hshh.src = obj.webformatURL;
          hshh.width = obj.webformatWidth;
          hshh.height = obj.webformatHeight;
          // hshh.key = initialIndex.toString();
          hshh.metadata = {download: obj.largeImageURL, brand: 'Pixabay', link: 'https://www.pixabay.com/', photographer: obj.user, profile: `https://pixabay.com/users/${obj.user}-${obj.user_id}/`};
          photos.push(hshh);
        })
        console.log("SUCCESS - Pixabay Api GET Request")
        return photos;
      })
      .catch(function (error) {
        console.log('FAIL - Pixabay Api GET Request')
        console.log(error)
        hasErrors = true;
        return "Fetch Error";
      });
    }

    // return (!hasErrors ? photos : "Fetch Error");

    return axios.all([getUnsplash(page, q, photos), getPexels(page, q, photos), getPixabay(page, q, photos)])
    .then(axios.spread(function (pix, pixx, pixxx) {
      // Both requests are now complete
      pix.map(x => x['key'] = pix.indexOf(x))
      return pix;
    }
    
    ));   
  }

  export default getPictures;