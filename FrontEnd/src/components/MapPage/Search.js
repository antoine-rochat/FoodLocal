import React from 'react';

import red from '@material-ui/core/colors/red';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemProducer from './ListItemProducer';

const styles = theme => ({

  card: {
    maxWidth: '400px',
    maxHeight: '300px',

  },
  avatar: {
    backgroundColor: red[500],
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  subheader: {
    width: '100%',
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  list: {
    backgroundColor: 'transparent',
  },
  listItem: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingTop: 0,
  },
});

class Search extends React.Component {

  render() {
    const { classes, data, handleHover, resetHover } = this.props;
    return (
      <div className={classes.list}>

        <List key="list" className={classes.list}>

          {data.producers.map(tile => (

            <ListItem className={classes.listItem} key={tile.id}>

              <ListItemProducer key={tile.id} salepoint={tile} producer={tile} handleHover={handleHover} resetHover={resetHover}/>

            </ListItem>
          ))
          }

        </List>
      </div>
    );
  }
}



export default withStyles(styles)(Search);