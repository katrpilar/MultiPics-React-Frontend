import React, { Component } from 'react'
import Form from '../components/Form'
import Transition from 'react-transition-group/Transition';
import { connect } from 'react-redux';
import { simpleAction } from '../actions/simpleAction'


class SearchForm extends Component{
    state = {
        // query: '',
        testing: '',
    }

    // componentWillMount = () => {
    //     this.setState({ in: true });
    // }

    // componentDidUpdate() {
    //     this.props = this.state.query;
    //     console.log(this.props);
    // }
    handleChange = (event) => {
        // debugger;
        this.props.simpleAction(event.target.value);

    //    this.setState({query: event.target.value});
    //    this.props.handleChange(event.target.value);      
    }

    // simpleAction = (event) => {
    //     this.props.simpleAction();
    //    }

     
    render(){
        return(
            <div>
                <Form handleSubmit={this.props.handleSubmit} handleChange={this.handleChange}/>
                <pre>
                    <h6>Props:</h6>
                {
                  JSON.stringify(this.props)
                }
                <br></br>
                <h6>State:</h6>
                {
                  JSON.stringify(this.state)
                }
                </pre>
                </div>
            )
    }
}

const mapStateToProps = state => ({
    ...state
   });
  
const mapDispatchToProps = dispatch => ({
    simpleAction: () => dispatch(simpleAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);