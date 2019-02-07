import React, { Fragment, Component } from "react"
import { MuiThemeProvider,
        Button,
        Grid,
        Typography } from '@material-ui/core';
import TopNav from './common/TopNav'
// import { withStyles } from '@material-ui/core/styles';
import SearchForm from './containers/SearchForm'
import { getPictures } from './requests/getPhotos'
import { theme } from './styles/theme'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
// import { CSSTransition } from "react-transition-group";
import { connect } from 'react-redux';
import SearchResults from './containers/SearchResults';
import Search from './containers/Search'
import { Route } from 'react-router-dom'
// import { fetchPhotos } from './actions/actionIndex'
// import { setQuery, setPhotos } from './actions/actionIndex'


let result;

class App extends Component {
  state = {
    page: 0,
  }

  fetchPhotos = (nextPage, pix) => {
    return getPictures(nextPage, this.props.query, pix).then(
    pics => {
        pics == "Fetch Error" ? console.log("Action didn't dispatch") : this.props.setPhotos(pics)
      }
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let pictureCount = this.props.pics.length + 1;
    let pics = this.props.pics;

    if( this.props.query ){
      if( this.props.query === query){
        let next = this.state.page + 1;
        this.setState({page: next});
        const newPhotos = this.fetchPhotos(next, query, pics);
        dispatch({
          type: 'ADD_MORE_PHOTOS',
          pics: newPhotos,
        });
      } else {
        this.setState({page: 1});
        this.props.setQuery(query);
        return this.fetchPhotos(1, query, []);
      }
    }    
  }

  handleClear = (e) => {
    e.preventDefault();
    this.props.setQuery('');
    this.props.setPhotos([]);
    this.setState({page: 0});
  }; 

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Grid container direction="column" alignItems="center" >
            <Grid item xs={12} >
              <TopNav />
              {/* <Route exact path="/search" component={Search} /> */}
            </Grid>
            <Grid item xs={12}  style={{marginTop: '50px'}}>
              <Grid container direction="row" alignItems="center">
                <Grid item>
                  <SearchForm handleSubmit={this.handleSubmit.bind(this)}/>
                  <Button onClick={this.handleClear}>Clear </Button>
                </Grid>
              </Grid>
            </Grid>
            {this.props.pics.length > 0 ?
            <Grid item >
               <SearchResults pixs={this.props.pics}/> 
            </Grid>
            : null}
            {this.props.pics.length > 0 ?
              <Grid item >
                <Typography variant="h4" gutterBottom={false} style={{color: theme.palette.primary.main}}>            
                  Would you like to view more photos from this search?
                </Typography>
                <Button color="secondary" href="#" size="large" variant="contained" onClick={this.handleSubmit.bind(this)} style={{textAlign: 'center'}}>Show More</Button>
              </Grid>
            : null}
        </Grid>

      </ MuiThemeProvider>      
    );
  }
  
}

const mapStateToProps = (state) => {
  return {
    pics: state.setPhotos.pics,
    query: state.setQuery.query
  }
};

 const mapDispatchToProps = (dispatch) => {
  return {
    setPhotos: (imgs) => dispatch({
      type: 'SET_PHOTOS',
      pics: imgs
    }),
    setPreviousQuery: (text) => dispatch({
      type: 'SET_PREVIOUS_QUERY',
      query: text
    })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
