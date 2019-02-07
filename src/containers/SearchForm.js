import React, { Component } from "react";
import Form from "../components/Form";
import { connect } from "react-redux";

class SearchForm extends Component {
  state = {
    typing: ""
  };

  handleChange = event => {
    query = query.split(' ').join('+');
    this.props.setQuery(event.target.value)
    // this.setState({ typing: event.target.value });
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

const mapStateToProps = (state) => {
  return {
    query: state.setQuery.query
  }
};

 const mapDispatchToProps = (dispatch) => {
  return {
    setQuery: (text) => dispatch({
      type: 'UPDATE_QUERY',
      query: text
    })
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
