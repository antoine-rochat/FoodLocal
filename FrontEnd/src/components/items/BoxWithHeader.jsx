import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    borderStyle: 'solid',
    borderRadius: 2,
    borderWidth: 1,
    flexGrow: 1,
    backgroundColor: 'rgba(255, 255, 240, 1)',
    marginTop: 10,
  },
  header: {
    padding: theme.spacing.unit * 2,
    borderBottom: 'solid',
    borderBottomWidth: 0.1,
  },
  content: {
    padding: theme.spacing.unit * 2,
  },
});

/**
 * Container de type
 *  **********
 *  * header *
 *  **********
 *  *children*
 *  **********
 */
function BoxWithHeader(props) {
  const { classes, header, children } = props;

  return (
    <Grid className={classes.root} container spacing={16}>
      { header
        ? (
          <Grid item xs={12} className={classes.header}>
            <Typography>{header}</Typography>
          </Grid>
        ) : (
          <></>
        )
      }
      <Grid item xs={12} className={classes.content}>
        {children}
      </Grid>
    </Grid>
  );
}

BoxWithHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  header: PropTypes.string,
};

BoxWithHeader.defaultProps = {
  children: null,
  header: null,
};


export default withStyles(styles)(BoxWithHeader);
