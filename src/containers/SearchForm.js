import React, { Component } from "react";
import Form from "../components/Form";
import { connect } from "react-redux";

class SearchForm extends Component {
  state = {
    typing: ""
  };

  handleChange = event => {
    this.setState({ typing: event.target.value });
  };

  render() {
    return (
      <div>
        <Form
          handleSubmit={this.props.handleSubmit}
          handleChange={this.handleChange}
          query={this.state.typing}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(SearchForm);
