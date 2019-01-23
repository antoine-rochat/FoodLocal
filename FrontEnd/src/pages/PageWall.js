import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import Loading from '../components/Loading';
import ErrorLoading from '../components/ErrorLoading';
import NewPost from '../components/mur/NewPost';
import MurNotifications from '../components/mur/MurNotifications';
import { AuthContext } from '../components/providers/AuthProvider';

const styles = ({
  root: {
    width: 900,
    margin: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    minHeight: 'calc(100vh -64px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
});

// Retourne toutes les notifications d'une personne
const GET_POSTS = gql`
query($personId: ID!, $after: String) {
  notificationsOfPerson(personId: $personId, first:10, after: $after) {
    pageInfo{
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
        id
        notification {
          type
          date
         
          producer {
            id
            image
            salespoint {
              name
              address {
                number
                street
                city
                postalCode
                state
                country
                longitude
                latitude
              }
            }
          }
        }
      }
    }
  }
}
`;

// Permet de poster un nouveau post
const POST_A_NEW_POST = gql`
  mutation($post : PostInputAdd!) {
  addPostOfProducer(post: $post) {
    id
  }
}
`;

// Classe de base pour le Mur
class PageWall extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>

        <AuthContext>
          {({ userId, userStatus }) => (
            <>

              {/* Affiche la possibilité d'ajouter un nouveau post que si on est un producteur */}
              {userStatus === 'producers' && (
              <Mutation mutation={POST_A_NEW_POST}>
                {addPostOfProducer => (
                  <NewPost maxLenght={500} addPostOfProducer={addPostOfProducer} userId={userId} />
                )}
              </Mutation>
              )}

              <Query
                query={GET_POSTS}
                variables={{ personId: userId }}
              >
                {({
                  data, loading, error, fetchMore
                }) => {
                  if (error) return <ErrorLoading />;
                  if (loading) return <Loading />;
                  const { notificationsOfPerson } = data;
                  console.log(data)
                  return (
                    <MurNotifications
                      loading={loading}
                      entries={notificationsOfPerson}
                      onLoadMore={() => fetchMore({
                        variables: {
                          personId: { userId },
                          cursor: notificationsOfPerson.pageInfo.endCursor
                        },
                        updateQuery: (prevResult, { fetchMoreResult }) => {
                          const newEdges = fetchMoreResult.notificationsOfPerson.edges;
                          const { pageInfo } = fetchMoreResult.notificationsOfPerson;
                          return newEdges.length
                            ? {
                              notificationsOfPerson: {
                                __typename: prevResult.notificationsOfPerson.__typename,
                                edges: [...prevResult.notificationsOfPerson.edges, ...newEdges],
                                pageInfo
                              }
                            }
                            : prevResult;
                        }
                      })
                      }
                    />
                  );
                }}
              </Query>
            </>
          )}
        </AuthContext>
      </div>
    );
  }
}

PageWall.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(PageWall);
