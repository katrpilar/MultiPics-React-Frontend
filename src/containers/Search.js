import React, { Fragment, Component } from "react";
import {
  MuiThemeProvider,
  Button,
  Grid,
  Typography,
  Tooltip,
  Fab
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseOutlined from "@material-ui/icons/CloseOutlined";
import SearchForm from "./SearchForm";
import { getPictures } from "../requests/getPhotos";
import { theme } from "../styles/theme";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SearchResults from "./SearchResults";
import { Route } from "react-router-dom";
import * as actionCreators from "../actions/actionIndex";
import Fade from "@material-ui/core/Fade";
import Zoom from "@material-ui/core/Zoom";
// import { SET_QUERY, SET_PHOTOS, ADD_MORE_PHOTOS, REMOVE_PHOTO } from './actions/actionTypes';

class Search extends Component {
  state = {
    page: 0
  };

  fetchPhotos = (nextPage, q) => {
    return getPictures(nextPage, q).then(pics => {
      if (pics == "Fetch Error") {
        console.log("Action didn't dispatch");
      } else {
        this.props.addPhotos(pics);
      }
    });
  };

  handleSubmit = (event, q) => {
    event.preventDefault();
    const { oldQuery } = this.props;

    const incrementPage = () => {
      let next = this.state.page + 1;
      this.setState({ page: next });
      return next;
    };

    if (q === oldQuery) {
      let next = incrementPage();
      this.fetchPhotos(next, q);
    } else {
      this.setState({ page: 0 });
      this.props.setQuery(q);
      let next = incrementPage();
      this.fetchPhotos(next, q);
    }
  };

  handleAddMorePhotos = (event, q) => {
    event.preventDefault();

    const incrementPage = () => {
      let next = this.state.page + 1;
      this.setState({ page: next });
      return next;
    };
    let next = incrementPage();
    this.fetchPhotos(next, q);
  };

  handleClear = e => {
    e.preventDefault();
    this.props.setQuery("");
    this.props.setPhotos([]);
    this.setState({ page: 0 });
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12} style={{ marginTop: "50px" }}>
            <SearchForm handleSubmit={this.handleSubmit.bind(this)} />
          </Grid>
          {this.props.pics.length > 0 ? (
            <div>
              <Grid item>
                <SearchResults pixs={this.props.pics} />
              </Grid>
              <Tooltip TransitionComponent={Zoom} title="RESET" placement="top">
                <Fab
                  color="primary"
                  aria-label="Add"
                  onClick={e => {
                    if (
                      window.confirm(
                        "Are you sure you wish to clear all search results?"
                      )
                    )
                      this.handleClear(e);
                  }}
                  style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    zIndex: 10000,
                    backgroundColor: "#d50000"
                  }}
                >
                  <CloseOutlined />
                </Fab>
              </Tooltip>
              <Tooltip
                TransitionComponent={Zoom}
                title="LOAD MORE"
                placement="top"
              >
                <Fab
                  color="primary"
                  aria-label="Add"
                  onClick={e => this.handleAddMorePhotos(e, this.props.query)}
                  style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "80px",
                    zIndex: 10000,
                    backgroundColor: theme.palette.primary.main
                  }}
                >
                  <AddIcon />
                </Fab>
              </Tooltip>
            </div>
          ) : null}
        </Grid>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    pics: state.setPhotos.pics,
    query: state.setQuery.query
  };
};

const mapDispatchToProps = dispatch => {
  // let test = bindActionCreators(actionCreators, dispatch);
  // debugger;
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
