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


let result;

class App extends Component {
  state = {
    pics: [],
    page: 0,
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
              <SearchResults pics={this.state.pics}/>
              
            <Grid item>
            {this.state.page === 0 ? null : <Button color="secondary" href="#" size="small" variant="contained" style={{width: 'fit-conent'}} onClick={this.handleSubmit}>Show More</Button>}
            </Grid>
            </Grid>
        </Grid>
      </ MuiThemeProvider>
      
    );
  }
  
}

const mapStateToProps = state => ({
  query: state.setQuery.query
});

 const mapDispatchToProps = dispatch => ({
  setQuery: (text) => dispatch({
    type: 'UPDATE_QUERY',
    query: text
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
