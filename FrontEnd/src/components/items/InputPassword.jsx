import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { withStyles } from '@material-ui/core';


const styles = theme => ({
  form: {
    //width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
});

class InputPassword extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showPassword: false,
    };
  }

  handleClick = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { classes, label, required, onChange, id, value } = this.props;
    const { showPassword } = this.state;
    return (
      <React.Fragment>
        <FormControl margin="normal" required={required} fullWidth>
          <InputLabel htmlFor="password">{label}</InputLabel>
          <Input
            onChange={onChange(id)}
            value={value}
            name="password"
            type={showPassword ? 'text' : 'password'}
            id={id}
            autoComplete="current-password"
            fullWidth
            endAdornment={(
              <InputAdornment position="end">
                <IconButton
                  readOnly
                  tabIndex="-1"
                  aria-label="Toggle password visibility"
                  onClick={this.handleClick}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )}
          />
        </FormControl>
        
      </React.Fragment>
    );
  }


}

InputPassword.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  label: PropTypes.string,
  required: PropTypes.bool,
  id: PropTypes.string,
  value: PropTypes.string,
  fullWidth: PropTypes.bool,
};

InputPassword.defaultProps = {
  label: '',
  required: false,
  id: 'password',
  value: '',
  fullWidth: false,
};

export default withStyles(styles)(InputPassword);