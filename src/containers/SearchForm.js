import React, { Component } from "react";
import Form from "../components/Form";
import { connect } from "react-redux";


class SearchForm extends Component {
  state = {
    currentQuery: ''
  }

  handleChange = (event) => {
    let currentQuery = event.target.value.split(' ').join('+');
    this.setState({currentQuery: currentQuery})
    // this.props.setQuery(event.target.value)
    // this.setState({ typing: event.target.value });
  };

  render() {
    return (
      <div>
        <Form
          handleSubmit={this.props.handleSubmit}
          handleChange={this.handleChange}
          value={this.state.currentQuery}
        />
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     query: state.setQuery.query
//   }
// };

//  const mapDispatchToProps = (dispatch) => {
//   return {
//     setQuery: (text) => dispatch({
//       type: 'UPDATE_QUERY',
//       query: text
//     })
//   }
// };


export default connect()(SearchForm);
