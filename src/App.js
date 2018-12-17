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
  return <Gallery photos={photos} columns={4} ImageComponent={SortablePhoto} />;
});

class App extends Component {
  state = {
    unsplash: [],
    query: '',
    pics: [],
    
  }


  componentDidMount() {
    //get Unsplash Results
    axios.get(`https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&page=1&query=office`)
    .then(response => {
      const unsplash = response.data.results
      this.setState(() => { return { unsplash: unsplash }})
      let photos = []
      let pics = this.state.unsplash.map((obj, indx) => {
        let hsh = new Object()
        hsh.src = obj.links.download
        hsh.width = obj.width
        hsh.height = obj.height
        hsh.key = indx
        photos.push(hsh)
        // console.log(photos)
        // console.log(this.state.pics)
        
      })
      this.setState(() => {return { pics: photos}});
      console.log("send Unsplash Api Request")
    })
    .catch(function (error) {
      console.log(error)
    });
   }

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
