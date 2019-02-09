import React, { Component } from "react";
import { MuiThemeProvider,
  Button, AppBar,
  Toolbar, Typography,
  Grid } from '@material-ui/core';
import { connect } from "react-redux";
import {theme} from '../styles/theme'

class About extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12} style={{ marginTop: "50px" }}>
            <h1 style={{ color: "black" }}>TESTING</h1>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default About;
