import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core'
import Form from '../components/Form'

class SearchForm extends Component{
    state = {
        query: '',
    }

    handleChange = (event) => {
       this.setState({query: event.target.value});
    }

     
    render(){
        return(
            <Form handleSubmit={this.props.handleSubmit} query={this.state.query} handleChange={this.handleChange}/>
        )
    }
}

export default SearchForm;