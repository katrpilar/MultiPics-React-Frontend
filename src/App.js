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
const SortableGallery = SortableContainer(({ photos }) => {
  return <Gallery photos={photos} columns={5} ImageComponent={SortablePhoto} />;
});

class App extends Component {
  state = {
    unsplash: [],
    pexels: [],
    query: '',
    pics: [],
    pixabay: [],
    metadata: {},    
  }


  componentDidMount() {
    //get Unsplash Results
    let photos = []
    let initialIndex = 0;
    axios.get(`https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&page=1&query=office`)
    .then(response => {
      const unsplash = response.data.results
      // let unsplashMetadata
      this.setState(() => { return { unsplash: unsplash }})
      this.state.unsplash.map((obj, indx) => {
        initialIndex++
        let hsh = new Object()
        //Use below for fullsize image
        // hsh.src = obj.links.download
        hsh.src = obj.urls.thumb
        hsh.width = obj.width
        hsh.height = obj.height
        hsh.key = initialIndex
        // hsh.download = obj.links.download
        
        //setting additional photo information as state object tied to:
        //the fullsize image download url, the brand source name, the brand link,
        //the photographer name, and photographer profile url
        let newMeta = this.state.metadata
        newMeta[initialIndex] = {download: obj.links.download, brand: 'Unsplash', link: 'https://unsplash.com/', photographer: obj.user.name, profile: obj.user.portfolio_url};
        this.setState(() => {return {metadata: newMeta}})
        photos.push(hsh)
        // console.log(photos)
        // console.log(this.state.pics)
        
      })
      console.log("send Unsplash Api Request")
    })
    .catch(function (errors) {
      console.log(errors)
    });


    axios.get(`https://api.pexels.com/v1/search?query=office+query&per_page=10&page=1`, {'headers': {'Authorization': process.env.REACT_APP_PEXELS_API_KEY}})
      .then(resp => {
        const pexels = resp.data.photos
        this.setState(() => { return { pexels: pexels }})
        // let next = {...this.state, pexels: pexels}
        // this.setState(next)
        // console.log(pexels)
        this.state.pexels.map((obj, indx) => {
          initialIndex++
          let hshh = new Object()
          hshh.src = obj.src.tiny
          //Use below for fullsize image
          // hshh.src = obj.src.original
          hshh.width = obj.width
          hshh.height = obj.height
          hshh.key = initialIndex

          let newMeta = this.state.metadata
          newMeta[initialIndex] = {download: obj.src.original, brand: 'Pexels', link: 'https://www.pexels.com/', photographer: obj.photographer, profile: obj.photographer_url};
          this.setState(() => {return {metadata: newMeta}})
          photos.push(hshh)
        })
        console.log("sent Pexels Api Request")
      })
      .catch(function (error) {
        console.log(error)
      });

      axios.get(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=office&per_page=10&page=1`)
      .then(resp => {
        console.log(resp)
        const pixabay = resp.data.hits
        this.setState(() => { return { pixabay: pixabay }})
        // let next = {...this.state, pixabay: pixabay}
        // this.setState(next)
        // console.log(pixabay)
        this.state.pixabay.map((obj, indx) => {
          initialIndex++
          let hshh = new Object()
          hshh.src = obj.previewURL
          //Use below for fullsize image
          // hshh.src = obj.largeImageURL
          hshh.width = obj.previewWidth
          hshh.height = obj.previewHeight
          hshh.key = initialIndex

          let newMeta = this.state.metadata
          newMeta[initialIndex] = {download: obj.largeImageURL, brand: 'Pixabay', link: 'https://www.pixabay.com/', photographer: obj.user, profile: `https://pixabay.com/users/${obj.user}-${obj.user_id}/`};
          this.setState(() => {return {metadata: newMeta}})
          photos.push(hshh)
        })
        console.log("sent pixabay Api Request")
      })
      .catch(function (error) {
        console.log(error)
      });
    this.setState(() => {return { pics: photos}});

   } //end of componentDidMount()

   onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      pics: arrayMove(this.state.pics, oldIndex, newIndex)
    });
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Grid container direction="row" spacing={40}>
            <Grid item xs={12} >
              <TopNav />
            </Grid>
            <Grid item >
            <SortableGallery
              axis={"xy"}
              photos={this.state.pics}
              onSortEnd={this.onSortEnd}
            />
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
