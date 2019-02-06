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
// import { setQuery, setPhotos } from './actions/actionIndex'


let result;

class App extends Component {
  state = {
    page: 0,

  }

  handleSubmit = (event, query = this.props.query) => {
    event.preventDefault();
    query = query.split(' ').join('+');
    let pictureCount = this.props.pics.length + 1;

    if( query !== ""){
      if( this.props.query === query){
        let next = this.state.page + 1;
        this.setState({page: next});
        result = getPictures(pictureCount, next, query, this.props.pics);
        // debugger;
        this.props.setPhotos(result);
      } else {
        this.setState({page: 1});
        this.props.setQuery(query);
        result = getPictures(pictureCount, 1, query, this.props.pics);
        // debugger;
        this.props.setPhotos(result);
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
               <SearchResults pics={this.props.pics}/> 
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
    query: state.setQuery.query,
    pics: state.setPhotos.pics
  }
};

 const mapDispatchToProps = (dispatch) => {
  return {
    setQuery: (text) => dispatch({
      type: 'UPDATE_QUERY',
      query: text
    }),
    setPhotos: (imgs) => dispatch({
      type: 'SET_PHOTOS',
      pics: imgs
    })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
