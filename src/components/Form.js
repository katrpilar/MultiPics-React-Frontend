import { TextField, Button } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux';


class Form extends Component{
    render(){
        return(
            <form onSubmit={(e) => this.props.handleSubmit(e)} >
                <TextField
                    id="standard-search"
                    label="Search field"
                    type="search"
                    margin="normal"
                    onChange={(e) => this.props.handleChange(e)}
                />
                <Button color="secondary" href="#" size="small" variant="outlined" type="submit" onClick={(e) => this.props.handleSubmit(e, this.props.query)} style={{verticalAlign: 'bottom'}}>Search</Button>
            </form>
        )
    }
} 

export default connect()(Form);