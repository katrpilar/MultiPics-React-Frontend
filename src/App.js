import React, { Fragment, Component } from "react"
import { MuiThemeProvider,
        Button,
        Grid } from '@material-ui/core';
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
  
  componentDidMount = () =>{
    // this.props.setPhotos([]);
    console.log(this.props)
    // this.props.setPhotos([{
    //   src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
    //   width: 4,
    //   height: 3,
    //   metadata: {
    //     link: "https://www.pixabay.com/", brand: "Pixabay", photographer: "pixel2013", profile: "https://pixabay.com/users/pixel2013-2364555/", download: "https://pixabay.com/get/ea36b90f2df0093ed1584d05fb...", download_count: 12
    //   }
    // },
    // {
    //   src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
    //   width: 1,
    //   height: 1,
    //   metadata: {
    //     link: "https://www.pixabay.com/", brand: "Pixabay", photographer: "pixel2013", profile: "https://pixabay.com/users/pixel2013-2364555/", download: "https://pixabay.com/get/ea36b90f2df0093ed1584d05fb...", download_count: 12
    //   }
    // }]);
  }

  handleSubmit = (event, query) => {
    // debugger;
    if( query ){
      query = query.split(' ').join('+');
      this.props.setQuery(query);
      if(query !== this.props.query){
        this.setState({page: 0})
      }
    } else {
      query = this.props.query;
    }
    
    console.log(query)
    if(this.state.page === 0){
      let next = this.state.page + 1
      this.setState({ page: next})
      result = getPictures(1, next, query, this.props.pics);
      // this.setState(result);
      console.log(result)
      this.props.setPhotos(result);
    }else{
      if(query !== this.props.query){
        this.setState({page: 0})
      }
      let indx = this.props.pics.length + 1
      let next = this.state.page + 1
      this.setState({ page: next});
      result = getPictures(indx, next, query, this.props.pics);
      // this.setState(result);
      this.props.setPhotos(result);
    }
    event.preventDefault();
  }


  handleClear = (e) => {
    this.setState({
      pics: [],
      page: 0,
      query: '',
    });
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
                  <SearchForm handleSubmit={this.handleSubmit}/>
                  <Button onClick={this.handleClear}>Clear </Button>
                </Grid>
              </Grid>
            </Grid>
            
            <Grid item >
              {this.props.pics ? <SearchResults pics={this.props.pics}/> : null}
            </Grid>
            <Grid item>
            {this.state.page === 0 ? null : <Button color="secondary" href="#" size="small" variant="contained" style={{width: 'fit-conent'}} onClick={this.handleSubmit}>Show More</Button>}
            </Grid>
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
