import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import TableIssues from './TableIssues';
import Loading from '../Loading';
import ErrorLoading from '../ErrorLoading';

const query = gql`
{
  producersWaitingForValidation{
    id
    salespoint{
      name
    }
  }
}
`;

const styles = {
  root: {
    padding: 20,
  },
};

class Admin extends Component {
  constructor(props) {
    super(props);
    document.title = 'Administrateur';
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h3">
          {'Administrateur'}
        </Typography>
        <Query query={query}>
          {({ data, loading, error }) => {
            if (error) return <ErrorLoading />;
            if (loading) return <Loading />;
            const { producersWaitingForValidation } = data;
            return (
              <TableIssues datas={producersWaitingForValidation} />
            );
          }}
        </Query>
      </div>
    );
  }
}

export default withStyles(styles)(Admin);
