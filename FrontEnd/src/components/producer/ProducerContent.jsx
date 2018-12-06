import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    height: '100%',
    widht: 1000,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
};

function fillaray(){
  var array=[];
  for(let i = 0; i < 60; i++){
    array[i] = <div>{i} <br/></div>;
  }
  return array;
}

class ProducerContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      array: fillaray(),
    };
  }
  


  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    

    return (
      <div className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Informations" />
          <Tab label="Produits" />
          <Tab label="Fil d'actualités" />
        </Tabs>
        {value === 0 && this.state.array}
        {value === 1 && 'Produits'}
        {value === 2 && 'Fil d\'actualité'}
      </div>
    );
  }
}

ProducerContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProducerContent);