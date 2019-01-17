import React, { Fragment, Component } from "react"
import { MuiThemeProvider,
        Button,
        Grid } from '@material-ui/core';
import TopNav from './common/TopNav'
// import { withStyles } from '@material-ui/core/styles';
import Gallery from 'react-photo-gallery'
import { SortableContainer,
  SortableElement,
  arrayMove
} from "react-sortable-hoc";
import Photo from "./Photo";
import SearchForm from './containers/SearchForm'
import Results from './containers/Results'
import { getPictures } from './requests/getPhotos'
import { theme } from './styles/theme'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { CSSTransition } from "react-transition-group";


// const hideElm = (e) => {

// };

const SortablePhoto = SortableElement(Photo);
// const pressThreshold = 100;
const SortableGallery = SortableContainer(({ photos, hidden }) => {
  return <Gallery photos={photos} direction="row" ImageComponent={SortablePhoto} hideStatus={hidden} />;
});

// let q = '';
let result;

class ResultGallery extends Component {
  state = {
    pics: [],
    page: 0,
    query: '',
  }

  // componentDidUpdate = () => {
     
  // }

  handleSubmit = (event, query) => {
    query ? this.setState({query: query.split(' ').join('+')}) : query = this.state.query;
    // query ? query = query.split(' ').join('+') : query = this.state.query;
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

///////////////////////////////////////////////////////
   onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      pics: arrayMove(this.state.pics, oldIndex, newIndex)
    });
  };
///////////////////////////////////////////////////////
  onMove = ({node, index, collection}, event) =>{
    // event.target.style.border = "solid"
    // debugger;
    node.firstElementChild.style.border = 'solid';
    // console.log(node);
    // console.log(event);

    // console.log(event.target.style);
    // .push({border: 'solid'});
  }

  // onStop = ({oldIndex, newIndex, collection}, e) => {
  //   debugger;
  // }

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
              <Results />
            </Grid>
            <Grid item xs={12}  style={{marginTop: '50px'}}>
              <Grid container direction="row" alignItems="center">
                <Grid item>
                  <SearchForm page={this.state.page} index={this.state.pics.length} getPics={getPictures} handleSubmit={this.handleSubmit} q={''}/>
                  <Button onClick={this.handleClear}>Clear </Button>
                </Grid>
              </Grid>
            
            </Grid>
            <Grid item >
              <SortableGallery
                axis={"xy"}
                photos={this.state.pics}
                onSortEnd={this.onSortEnd}
                pressDelay={100}
                // onSortStart={this.onMove}
                hidden={false}
                key="gallery"
              />
            <Grid item>
            {this.state.page === 0 ? null : <Button color="secondary" href="#" size="small" variant="contained" style={{width: 'fit-conent'}} onClick={this.handleSubmit}>Show More</Button>}
            </Grid>
            </Grid>
        </Grid>
      </ MuiThemeProvider>
      
    );
  }
}

export default ResultGallery;
