import React, { Component } from 'react'
import Form from '../components/Form'
import Transition from 'react-transition-group/Transition';

class SearchForm extends Component{
    state = {
        query: '',
        in: false,
    }

    componentWillMount = () => {
        this.setState({ in: true });
    }

    // componentDidUpdate() {
    //     this.props = this.state.query;
    //     console.log(this.props);
    // }
    handleChange = (event) => {
       this.setState({query: event.target.value});
      
    }

     
    render(){
        return(
            <Transition in={this.state.in} timeout={5000}>
                <Form handleSubmit={this.props.handleSubmit} query={this.state.query} handleChange={this.handleChange}/>
            </Transition>
            )
    }
}

export default SearchForm;