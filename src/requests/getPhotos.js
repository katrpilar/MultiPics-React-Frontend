import axios from 'axios'

let q = '';

export const getPictures = (ind, page, query, photos) => {
    let initialIndex = ind;
    // let photos = this.state.pics;
     // alert('A name was submitted: ' + this.state.query);
    //setting temporary photos array to manipulate before adding to component state
    let q = !!(query) ? query : q;

    let hasErrors = false;
    
    //A counter for the 'keys' of each image object to allow the state to tie 'metadata' to each image
    //TBD used to persist data to the Rails API backend database
    console.log(`https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&page=${page}&query=${q}&per_page=10`)
    //UNSPLASH API GET REQUEST
    axios.get(`https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&page=${page}&query=${q}&per_page=10`)
    .then(response => {
      const unsplash = response.data.results
      // let unsplashMetadata
    //   this.setState(() => { return { unsplash: unsplash }})
      unsplash.map((obj, indx) => {
        initialIndex++
        let hsh = {}
        hsh.src = obj.urls.small
        hsh.width = obj.width
        hsh.height = obj.height
        hsh.key = initialIndex.toString()
        hsh.metadata = {download: obj.links.download, brand: 'Unsplash', link: 'https://unsplash.com/', photographer: obj.user.name, profile: obj.user.portfolio_url};

        //Set Unsplash image's state metadata
        // let newMeta = this.state.metadata
        // newMeta[initialIndex] = {download: obj.links.download, brand: 'Unsplash', link: 'https://unsplash.com/', photographer: obj.user.name, profile: obj.user.portfolio_url};
        // this.setState(() => {return {metadata: newMeta}})
        return photos.push(hsh);        
      })
      console.log("SUCCESS - Unsplash Api GET Request")
    })
    .catch(function (errors) {
      console.log('FAIL - Unsplash Api GET Request')
      console.log(errors)
      hasErrors = true;
      return "Fetch Error";
    });

    // ///////////////////////////////////////////////////////
    // //PEXELS API GET REQUEST
    axios.get(`https://api.pexels.com/v1/search?query=${q}+query&per_page=10&page=${page}`, {'headers': {'Authorization': process.env.REACT_APP_PEXELS_API_KEY}})
      .then(resp => {
        const pexels = resp.data.photos
        // this.setState(() => { return { pexels: pexels }})
        pexels.map((obj, indx) => {
          initialIndex++;
          let hshh = {};
          hshh.src = obj.src.medium;
          hshh.width = obj.width;
          hshh.height = obj.height;
          hshh.key = initialIndex;
          hshh.id = initialIndex.toString();
          hshh.metadata = {download: obj.src.original, brand: 'Pexels', link: 'https://www.pexels.com/', photographer: obj.photographer, profile: obj.photographer_url};
          //Set Pexels image's state metadata
          // let newMeta = this.state.metadata
          // newMeta[initialIndex] = {download: obj.src.original, brand: 'Pexels', link: 'https://www.pexels.com/', photographer: obj.photographer, profile: obj.photographer_url};
          // this.setState(() => {return {metadata: newMeta}})
          return photos.push(hshh);
        })
        console.log("SUCCESS - Pexels Api GET Request");
      })
      .catch(function (errors) {
        console.log('FAIL - Pexels Api GET Request');
        console.log(errors);
        hasErrors = true;
        return "Fetch Error";
      });

    //   ///////////////////////////////////////////////////////
    //   //PIXABAY API GET REQUEST
      axios.get(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${q}&per_page=10&page=${page}`)
      .then(resp => {
        console.log(resp)
        const pixabay = resp.data.hits
        // this.setState(() => { return { pixabay: pixabay }})
        pixabay.map((obj, indx) => {
          initialIndex++
          let hshh = {}
          hshh.src = obj.webformatURL;
          hshh.width = obj.webformatWidth;
          hshh.height = obj.webformatHeight;
          hshh.key = initialIndex.toString();
          hshh.metadata = {download: obj.largeImageURL, brand: 'Pixabay', link: 'https://www.pixabay.com/', photographer: obj.user, profile: `https://pixabay.com/users/${obj.user}-${obj.user_id}/`};
          //Set Pixabay image's state metadata
          // let newMeta = this.state.metadata
          // // let idAsStr = initialIndex.toString();
          // newMeta[initialIndex] = {download: obj.largeImageURL, brand: 'Pixabay', link: 'https://www.pixabay.com/', photographer: obj.user, profile: `https://pixabay.com/users/${obj.user}-${obj.user_id}/`};
          // this.setState(() => {return {metadata: newMeta}})
          return photos.push(hshh);
        })
        console.log("SUCCESS - Pixabay Api GET Request")
      })
      .catch(function (error) {
        console.log('FAIL - Pixabay Api GET Request')
        console.log(error)
        hasErrors = true;
        return "Fetch Error";
      });
    
    //setting State for all available photos
    //to be rendered by react-photo-gallery
    // photos.forEach(p => {
    //   p.metadata ={}
    // })

    return (!hasErrors ? photos : "Fetch Error");
    // this.setState({ pics: photos});
    // console.log(this.state.metadata);

    
  }

  export default getPictures;