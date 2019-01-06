import axios from 'axios'
import React, { Fragment, Component } from "react"
import { render } from 'react-dom'
import { MuiThemeProvider, 
        createMuiTheme,
        Button, AppBar,
        Toolbar, Typography,
        Grid, Card, CardContent,
        CardActions, CardHeader,
        CardActionArea, CardMedia,
        IconButton, Input, InputBase,
        TextField, Grow, Menu, MenuItem, Paper } from '@material-ui/core';
import styled from 'styled-components'
// import MenuIcon from '@material-ui/icons/Menu'
// import Hidden from '@material-ui/core/Hidden'
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search'
import TopNav from './common/TopNav'
// import { withStyles } from '@material-ui/core/styles';
import Gallery from 'react-photo-gallery'
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from "react-sortable-hoc";
import Photo from "./Photo";
import SearchForm from './containers/SearchForm'
import Results from './containers/Results'
import { getPictures } from './requests/getPhotos'


const theme = createMuiTheme({
    root: {
      flexGrow: 1,
    },
    palette: {
      primary: {
        light: 'rgb(229, 216, 255)',
        main: '#1b004d',
        dark: '#210067',
        contrastText: '#FFFFFF',
      },
      secondary: {
        light: 'rgb(255, 236, 139)',
        main: '#fc0',
        dark: 'rgb(234, 188, 0)',
        contrastText: '#052D6C',
      },
      text: {
        primary: "#212121",
        secondary: "#616161",
        disabled: "#BDBDBD",
      },
      background: {
        default: '#210067'
      }
    },
    // secondary: '#fc0',
    // typography:{
    //   useNextVariants: true,
    //   fontFamily: `Noto Sans, "Helvetica", "Arial"`,
    //   headline:{
    //     fontFamily: "Noto Sans",
    //   },
    //   body1:{
    //     fontFamily: `Noto Sans, "Helvetica", "Arial"`
    //   },
    //   body2:{
    //     fontFamily: "Noto Sans"
    //   },
    //   h1: {
    //     fontFamily: "Noto Serif",
    //     fontSize: '4em'
    //   },
    //   h2: {
    //     fontFamily: "Noto Serif",
    //   },
    //   h3: {
    //     fontFamily: "Noto Serif",
    //   },
    //   h4: {
    //     fontFamily: "Noto Serif",
    //     fontSize: "1.84rem",
    //   },
    //   h5: {
    //     fontFamily: "Noto Serif",
    //   },
    //   h6: {
    //     fontFamily: "Noto Sans",
    //   },
    //   button: {
    //     fontWeight: 600,
    //   },
    // }
  });

  const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: ${theme.palette.secondary.main};
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
`
const SortablePhoto = SortableElement(Photo);
const SortableGallery = SortableContainer(({ photos}) => {
  return <Gallery photos={photos} columns={5} direction="row" ImageComponent={SortablePhoto} />;
});

// let q = '';
let result;

class App extends Component {
  state = {
    pics: [],
    page: 0,
  }

  handleSubmit = (event, query) => {
    if(this.state.page === 0){
      let next = this.state.page + 1
      this.setState({ page: next})
      result = getPictures(1, next, query, this.state.pics);
      this.setState(result);
    }else{
      let indx = this.state.pics.length + 1
      let next = this.state.page + 1
      this.setState({ page: next});
      result = getPictures(indx, next, query, this.state.pics);
      this.setState(result);
    }
    event.preventDefault();
  } 

  // getPictures = (ind, page, query) => {
  //   let initialIndex = ind;
  //   let photos = this.state.pics;
  //    // alert('A name was submitted: ' + this.state.query);
  //   //setting temporary photos array to manipulate before adding to component state
  //   q = !!(query) ? query : q;
  //   //A counter for the 'keys' of each image object to allow the state to tie 'metadata' to each image
  //   //TBD used to persist data to the Rails API backend database
  //   console.log(`https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&page=${page}&query=${q}`)
  //   //UNSPLASH API GET REQUEST
  //   axios.get(`https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&page=${page}&query=${q}`)
  //   .then(response => {
  //     const unsplash = response.data.results
  //     // let unsplashMetadata
  //     this.setState(() => { return { unsplash: unsplash }})
  //     unsplash.map((obj, indx) => {
  //       initialIndex++
  //       let hsh = new Object()
  //       hsh.src = obj.urls.thumb
  //       hsh.width = obj.width
  //       hsh.height = obj.height
  //       hsh.key = initialIndex.toString()
  //       hsh.metadata = {download: obj.links.download, brand: 'Unsplash', link: 'https://unsplash.com/', photographer: obj.user.name, profile: obj.user.portfolio_url};

  //       //Set Unsplash image's state metadata
  //       // let newMeta = this.state.metadata
  //       // newMeta[initialIndex] = {download: obj.links.download, brand: 'Unsplash', link: 'https://unsplash.com/', photographer: obj.user.name, profile: obj.user.portfolio_url};
  //       // this.setState(() => {return {metadata: newMeta}})
  //       photos.push(hsh)        
  //     })
  //     console.log("SUCCESS - Unsplash Api GET Request")
  //   })
  //   .catch(function (errors) {
  //     console.log('FAIL - Unsplash Api GET Request')
  //     console.log(errors)
  //   });

  //   // ///////////////////////////////////////////////////////
  //   // //PEXELS API GET REQUEST
  //   axios.get(`https://api.pexels.com/v1/search?query=${q}+query&per_page=10&page=${page}`, {'headers': {'Authorization': process.env.REACT_APP_PEXELS_API_KEY}})
  //     .then(resp => {
  //       const pexels = resp.data.photos
  //       // this.setState(() => { return { pexels: pexels }})
  //       pexels.map((obj, indx) => {
  //         initialIndex++
  //         let hshh = new Object()
  //         hshh.src = obj.src.tiny
  //         hshh.width = obj.width
  //         hshh.height = obj.height
  //         hshh.key = initialIndex
  //         hshh.id = initialIndex.toString()
  //         hshh.metadata = {download: obj.src.original, brand: 'Pexels', link: 'https://www.pexels.com/', photographer: obj.photographer, profile: obj.photographer_url};
  //         //Set Pexels image's state metadata
  //         // let newMeta = this.state.metadata
  //         // newMeta[initialIndex] = {download: obj.src.original, brand: 'Pexels', link: 'https://www.pexels.com/', photographer: obj.photographer, profile: obj.photographer_url};
  //         // this.setState(() => {return {metadata: newMeta}})
  //         photos.push(hshh)
  //       })
  //       console.log("SUCCESS - Pexels Api GET Request")
  //     })
  //     .catch(function (error) {
  //       console.log('FAIL - Pexels Api GET Request')
  //       console.log(error)
  //     });

  //   //   ///////////////////////////////////////////////////////
  //   //   //PIXABAY API GET REQUEST
  //     axios.get(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${q}&per_page=10&page=${page}`)
  //     .then(resp => {
  //       console.log(resp)
  //       const pixabay = resp.data.hits
  //       // this.setState(() => { return { pixabay: pixabay }})
  //       pixabay.map((obj, indx) => {
  //         initialIndex++
  //         let hshh = new Object()
  //         hshh.src = obj.webformatURL
  //         hshh.width = obj.webformatWidth - 300
  //         hshh.height = obj.webformatHeight - 200
  //         hshh.key = initialIndex.toString()
  //         hshh.metadata = {download: obj.largeImageURL, brand: 'Pixabay', link: 'https://www.pixabay.com/', photographer: obj.user, profile: `https://pixabay.com/users/${obj.user}-${obj.user_id}/`};
  //         //Set Pixabay image's state metadata
  //         // let newMeta = this.state.metadata
  //         // // let idAsStr = initialIndex.toString();
  //         // newMeta[initialIndex] = {download: obj.largeImageURL, brand: 'Pixabay', link: 'https://www.pixabay.com/', photographer: obj.user, profile: `https://pixabay.com/users/${obj.user}-${obj.user_id}/`};
  //         // this.setState(() => {return {metadata: newMeta}})
  //         photos.push(hshh)
  //       })
  //       console.log("SUCCESS - Pixabay Api GET Request")
  //     })
  //     .catch(function (error) {
  //       console.log('FAIL - Pixabay Api GET Request')
  //       console.log(error)
  //     });
    
  //   //setting State for all available photos
  //   //to be rendered by react-photo-gallery
  //   // photos.forEach(p => {
  //   //   p.metadata ={}
  //   // })
  //   this.setState({ pics: photos});
  //   console.log(this.state.metadata);
  // }

  // handleMore = (event) => {
  //   this.setState({ page: this.state.page + 1})
  //   console.log("So you want to show more eh?")
  // }

///////////////////////////////////////////////////////
   onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      pics: arrayMove(this.state.pics, oldIndex, newIndex)
    });
  };
///////////////////////////////////////////////////////

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Grid container direction="column" alignItems="center" >
            <Grid item xs={12} >
              <TopNav />
              <Results />
            </Grid>
            <Grid item xs={12}  style={{marginTop: '50px'}}>
              <Grid container direction="row" alignItems="center">
                <Grid item>
                  <SearchForm page={this.state.page} index={this.state.pics.length} getPics={getPictures} handleSubmit={this.handleSubmit}/>
                </Grid>
              </Grid>
            
            </Grid>
            <Grid item >
            <SortableGallery
              axis={"xy"}
              photos={this.state.pics}
              onSortEnd={this.onSortEnd}
            />
            <Grid item>
            {this.state.page === 0 ? null : <Button color="secondary" href="#" size="small" variant="contained" style={{width: 'fit-conent'}} onClick={this.handleSubmit}>Show More</Button>}
            </Grid>
              {/* <Gallery photos={this.state.pics} /> */}
              {/* <Grid container direction="row">
                {this.state.unsplash.map((obj, indx) => 
                  <Grid item xs={10} md={8} lg={3} xl={1} alignContent="flex-start" key={indx}>
                    <div style={{width:'auto',height:'100%',position: 'realative'}}>
                      <img src={obj.links.download} style={{width: '100%', height: '100%'}}></img>
                      <div style={{position: 'relative'}}>
                      <Typography variant="subtitle1" align="left" style={{top: '-270px', position: 'relative'}}>
                        <a href="https://unsplash.com/" style={{color: theme.palette.primary.contrastText, textDecoration: 'none'}}>Unsplash - </a>
                        <a href={obj.user.portfolio_url} style={{color: theme.palette.primary.contrastText, textDecoration: 'none'}}>{obj.user.name}</a>
                        <Button color="secondary" href={obj.links.download} size="small" variant="flat" style={{width: 'fit-conent'}}>Download</Button>
                      </Typography>
                     
                      </div>
                    </div>
                    </Grid>)}
              </Grid> */}
            </Grid>
        </Grid>
      </ MuiThemeProvider>
      
    );
  }
}

export default App;
