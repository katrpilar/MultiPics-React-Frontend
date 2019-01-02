import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core'

class SearchForm extends Component{
    state = {
        query: '',
    }

     
    render(){
        return(
            <form onSubmit={this.handleSubmit} >
                <TextField
                    id="standard-search"
                    label="Search field"
                    type="search"
                    margin="normal"
                    onChange={(e) => this.state.query = e.target.value}
                />
                <Button color="secondary" href="#" size="small" variant="outlined" type="submit" onClick={(e) => this.props.handleSubmit(e, this.state.query)} style={{verticalAlign: 'bottom'}}>Go</Button>
            </form>
        )
    }
}

export default SearchForm;