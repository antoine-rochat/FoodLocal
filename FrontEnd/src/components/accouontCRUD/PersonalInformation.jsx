import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import BorderedTextField from '../items/fields/BorderedTextField';
import BoxLeftRight from './BoxLeftRight';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width:'100%',
    height: '100%',
    
    padding: theme.spacing.unit * 2,
    textAlign: 'justify',
    backgroundColor: 'rgba(255, 255, 240, 0.8)',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  centerBox: {
    justifyContent: 'flex-start',
  },
  rightBox: {
    justifyContent: 'flex-start',
  },
  leftBox: {
    justifyContent: 'flex-end',
  },
});

class PersonalInformation extends Component {

  constructor(props) {
    super(props);

    this.state = {
      lastName: '',
      firstName: '',
    };
  }

  handleChange = prop => (event) => {
    console.log(prop);
    this.setState({
      [prop]: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;
    const { lastName, firstName } = this.state;

    return (
      <>
        <BoxLeftRight
          title="Nom"
        >
          <BorderedTextField
              id="personal-information-lastName"
              className={classes.textField}
              onChange={this.handleChange('firstName')}
              defaultValue={firstName}
            />
        </BoxLeftRight>
        <BoxLeftRight
          title="Prénom"
        >
          <BorderedTextField
            id="personal-information-lastName"
            className={classes.textField}
            onChange={this.handleChange('lastName')}
            defaultValue={lastName}
          />
        </BoxLeftRight>

          {/*
          <Grid item xs={12}>
            
          </Grid>
          */}
        
        </>

    );
  }
}

export default withStyles(styles)(PersonalInformation);
