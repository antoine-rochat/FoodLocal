const { graphql } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');
const snapshot = require('snap-shot-it');
const { resolvers, schema: typeDefs, connectionDirective } = require('../../../src/graphql/graphqlConfig');
const { populateDB, getTabProducers, getTabUsers } = require('../../populateDatabase');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    connection: connectionDirective
  }
});

let tabProducers;
let tabUsers;

const clearAndPopulateDB = async() => {
  // ------------------------------------------------------------- on ajoute le contenu de départ -------------------------------------------------------------
  await populateDB();

  tabProducers = await getTabProducers();
  tabUsers = await getTabUsers();
};

describe('Testing graphql request persons', () => {
  describe('QUERY persons', () => {
    beforeEach(() => clearAndPopulateDB());

    // ----------------------checkIfEmailIsAvailable(email: String!)-------------------------------------- //
    describe('Testing checkIfEmailIsAvailable(email: String!)', () => {
      const { query } = {
        query: `query($email: String!) {
                  checkIfEmailIsAvailable(email:$email)
                }`
      };

      it('should return true because email is available', async() => {
        const result = await graphql(schema, query, null, {}, { email: 'newMail@mail.com' });
        expect(result.data.checkIfEmailIsAvailable).to.be.true;
      });

      it('should return false because email is already used', async() => {
        const result = await graphql(schema, query, null, {}, { email: tabProducers[0].email });
        expect(result.data.checkIfEmailIsAvailable).to.be.false;
      });
    });
  });

  describe('MUTATION persons', () => {
    beforeEach(() => clearAndPopulateDB());

    // ----------------------addFollowerToProducer(producerId: ID!, followerId: ID!)-------------------------------------- //
    describe('Testing addFollowerToProducer(producerId: ID!, followerId: ID!)', () => {
      beforeEach(() => clearAndPopulateDB());

      const { mutation } = {
        mutation: `
          mutation($producerId: ID!, $followerId: ID!) {
            addFollowerToProducer(producerId: $producerId, followerId: $followerId) {
              firstname
              lastname
              email
              image
              followingProducers {
                pageInfo{
                  hasNextPage
                  hasPreviousPage
                  startCursor
                  endCursor
                }
                edges{
                  cursor
                  node{
                    firstname
                    lastname
                    email
                  }
                }
                totalCount
              }
              emailValidated
              isAdmin
              __typename
            }
          }`
      };

      const { queryGetProducerById } = {
        queryGetProducerById: `
          query($producerId: ID!) {
            producer(producerId: $producerId) {
              firstname
              lastname
              email
              image
              followingProducers {
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                  startCursor
                  endCursor
                }
                edges {
                  cursor
                  node {
                    firstname
                    lastname
                    email
                  }
                }
                totalCount
              }
              emailValidated
              isAdmin
              followers {
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                  startCursor
                  endCursor
                }
                edges {
                  cursor
                  node {
                    firstname
                    lastname
                    email
                  }
                }
                totalCount
              }
              phoneNumber
              description
              website
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
                schedule {
                  monday {
                    openingHour
                    closingHour
                  }
                  tuesday {
                    openingHour
                    closingHour
                  }
                  wednesday {
                    openingHour
                    closingHour
                  }
                  thursday {
                    openingHour
                    closingHour
                  }
                  friday {
                    openingHour
                    closingHour
                  }
                  saturday {
                    openingHour
                    closingHour
                  }
                  sunday {
                    openingHour
                    closingHour
                  }
                }
              }
              isValidated
              products {
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                  startCursor
                  endCursor
                }
                edges {
                  node {
                    id
                    description
                    productType {
                      id
                      name
                      image
                    }
                  }
                }
              }
              rating {
                nbRatings
                grade
              }
            }
          }`
      };

      it('should add a new follower to a producer', async() => {
        const variables = { producerId: tabProducers[2].id, followerId: tabProducers[3].id };
        let result = await graphql(schema, mutation, null, null, variables);

        expect(result.data.addFollowerToProducer.followingProducers.totalCount).to.be.equal(1);
        snapshot(result);

        // on check que le follower ait aussi été ajouté dans le producteur
        result = await graphql(schema, queryGetProducerById, null, null, { producerId: tabProducers[2].id });
        expect(result.data.producer.followers.totalCount).to.be.equal(1);
      });

      it('should not add twice the same follower to the same producer', async() => {
        const variables = { producerId: tabProducers[2].id, followerId: tabProducers[3].id };
        let result = await graphql(schema, mutation, null, null, variables);

        expect(result.data.addFollowerToProducer.followingProducers.totalCount).to.be.equal(1);
        snapshot(result);

        // on check que le follower ait aussi été ajouté dans le producteur
        result = await graphql(schema, queryGetProducerById, null, null, { producerId: tabProducers[2].id });
        expect(result.data.producer.followers.totalCount).to.be.equal(1);

        result = await graphql(schema, mutation, null, null, variables);
        // le nombre de producteurs suivis doit toujours être de 1
        expect(result.data.addFollowerToProducer.followingProducers.totalCount).to.be.equal(1);
        snapshot(result);

        // le nombre de followers du producteur doit toujours être de 1
        result = await graphql(schema, queryGetProducerById, null, null, { producerId: tabProducers[2].id });
        expect(result.data.producer.followers.totalCount).to.be.equal(1);
      });

      it('should fail adding a new follower to a producer because invalid producerId received (too short)', async() => {
        const variables = { producerId: 'abcdef', followerId: tabUsers[0].id };
        const result = await graphql(schema, mutation, null, null, variables);

        expect(result.errors).to.be.not.null;
        snapshot(result);
      });

      it('should fail adding a new follower to a producer because invalid producerId received (too long)', async() => {
        const variables = { producerId: 'abcdefabcdefabcdefabcdefabcdef', followerId: tabUsers[0].id };
        const result = await graphql(schema, mutation, null, null, variables);

        expect(result.errors).to.be.not.null;
        snapshot(result);
      });

      it('should fail adding a new follower to a producer because unknown producerId received', async() => {
        const variables = { producerId: 'abcdefabcdefabcdefabcdef', followerId: tabUsers[0].id };
        const result = await graphql(schema, mutation, null, null, variables);

        expect(result.errors).to.be.not.null;
        expect(result.errors[0].message).to.contains('There is no producer with this id in database!');
        snapshot(result);
      });

      it('should fail adding a new follower to a producer because invalid followerId received (too short)', async() => {
        const variables = { producerId: tabProducers[0].id, followerId: 'abcdef' };
        const result = await graphql(schema, mutation, null, null, variables);

        expect(result.errors).to.be.not.null;
        snapshot(result);
      });

      it('should fail adding a new follower to a producer because invalid followerId received (too long)', async() => {
        const variables = { producerId: tabProducers[0].id, followerId: 'abcdefabcdefabcdefabcdefabcdef' };
        const result = await graphql(schema, mutation, null, null, variables);

        expect(result.errors).to.be.not.null;
        snapshot(result);
      });

      it('should fail adding a new follower to a producer because unknown followerId received', async() => {
        const variables = { producerId: tabProducers[0].id, followerId: 'abcdefabcdefabcdefabcdef' };
        const result = await graphql(schema, mutation, null, null, variables);

        expect(result.errors).to.be.not.null;
        expect(result.errors[0].message).to.contains('There is no person with this id in database!');
        snapshot(result);
      });
    });

    // ----------------------removeFollowerToProducer(producerId: ID!, followerId: ID!)-------------------------------------- //
    describe('Testing removeFollowerToProducer(producerId: ID!, followerId: ID!)', () => {
      beforeEach(() => clearAndPopulateDB());

      const { mutation } = {
        mutation: `
          mutation($producerId: ID!, $followerId: ID!) {
            removeFollowerToProducer(producerId: $producerId, followerId: $followerId) {
              firstname
              lastname
              email
              image
              followingProducers {
                pageInfo{
                  hasNextPage
                  hasPreviousPage
                  startCursor
                  endCursor
                }
                edges{
                  cursor
                  node{
                    firstname
                    lastname
                    email
                  }
                }
                totalCount
              }
              emailValidated
              isAdmin
              __typename
            }
          }`
      };

      const { queryGetProducerById } = {
        queryGetProducerById: `
query($producerId: ID!) {
  producer(producerId: $producerId) {
    firstname
    lastname
    email
    image
    followingProducers {
      pageInfo{
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges{
        cursor
        node{
          firstname
          lastname
          email
        }
      }
      totalCount
    }
    emailValidated
    isAdmin
    followers {
      pageInfo{
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges{
        cursor
        node{
          firstname
          lastname
          email
        }
      }
      totalCount
    }
    phoneNumber
    description
    website
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
      schedule {
        monday {
          openingHour
          closingHour
        }
        tuesday {
          openingHour
          closingHour
        }
        wednesday {
          openingHour
          closingHour
        }
        thursday {
          openingHour
          closingHour
        }
        friday {
          openingHour
          closingHour
        }
        saturday {
          openingHour
          closingHour
        }
        sunday {
          openingHour
          closingHour
        }
      }
    }
    isValidated
    products {
      edges {
        node {
          description
          productType {
            name
            image
            category {
              name
              image
            }
            producers {
              edges {
                node {
                  firstname
                  lastname
                  email
                }
              }
            }
          }
        }
      }
    }
    rating {
      nbRatings
      grade
    }
  }
}`
      };

      it('should remove a follower from a producer', async() => {
        // on enlève un follower au producteur
        let variables = { producerId: tabProducers[0].id, followerId: tabUsers[0].id };
        let result = await graphql(schema, mutation, null, null, variables);

        expect(result.data.removeFollowerToProducer.followingProducers.totalCount).to.be.equal(0);

        // on check que le follower ait aussi été enlevé dans le producteur
        result = await graphql(schema, queryGetProducerById, null, null, { producerId: tabProducers[0].id });
        expect(result.data.producer.followers.totalCount).to.be.equal(2);

        // on enlève un autre follower au producteur
        variables = { producerId: tabProducers[0].id, followerId: tabUsers[1].id };
        result = await graphql(schema, mutation, null, null, variables);
        expect(result.data.removeFollowerToProducer.followingProducers.totalCount).to.be.equal(0);

        // on check que le follower ait aussi été enlevé dans le producteur
        result = await graphql(schema, queryGetProducerById, null, null, { producerId: tabProducers[0].id });
        expect(result.data.producer.followers.totalCount).to.be.equal(1);

        // on enlève le dernier follower du producteur
        variables = { producerId: tabProducers[0].id, followerId: tabProducers[1].id };
        result = await graphql(schema, mutation, null, null, variables);
        expect(result.data.removeFollowerToProducer.followingProducers.totalCount).to.be.equal(1);

        // on check que le follower ait aussi été enlevé dans le producteur
        result = await graphql(schema, queryGetProducerById, null, null, { producerId: tabProducers[0].id });
        expect(result.data.producer.followers.totalCount).to.be.equal(0);

        snapshot(result);
      });

      it('should fail removing a follower from a producer because invalid producerId received (too short)', async() => {
        const variables = { producerId: 'abcdef', followerId: tabUsers[0].id };
        const result = await graphql(schema, mutation, null, null, variables);

        expect(result.errors).to.be.not.null;
        snapshot(result);
      });

      it('should fail removing a follower from a producer because invalid producerId received (too long)', async() => {
        const variables = { producerId: 'abcdefabcdefabcdefabcdefabcdef', followerId: tabUsers[0].id };
        const result = await graphql(schema, mutation, null, null, variables);

        expect(result.errors).to.be.not.null;
        snapshot(result);
      });

      it('should fail removing a follower from a producer because unknown producerId received', async() => {
        const variables = { producerId: 'abcdefabcdefabcdefabcdef', followerId: tabUsers[0].id };
        const result = await graphql(schema, mutation, null, null, variables);

        expect(result.errors).to.be.not.null;
        expect(result.errors[0].message).to.contains('There is no producer with this id in database!');
        snapshot(result);
      });

      it('should fail removing a new follower to a producer because invalid followerId received (too short)', async() => {
        const variables = { producerId: tabProducers[0].id, followerId: 'abcdef' };
        const result = await graphql(schema, mutation, null, null, variables);

        expect(result.errors).to.be.not.null;
        snapshot(result);
      });

      it('should fail removing a new follower to a producer because invalid followerId received (too long)', async() => {
        const variables = { producerId: tabProducers[0].id, followerId: 'abcdefabcdefabcdefabcdefabcdef' };
        const result = await graphql(schema, mutation, null, null, variables);

        expect(result.errors).to.be.not.null;
        snapshot(result);
      });

      it('should fail removing a new follower to a producer because unknown followerId received', async() => {
        const variables = { producerId: tabProducers[0].id, followerId: 'abcdefabcdefabcdefabcdef' };
        const result = await graphql(schema, mutation, null, null, variables);

        expect(result.errors).to.be.not.null;
        expect(result.errors[0].message).to.contains('There is no person with this id in database!');
        snapshot(result);
      });
    });

    // ----------------------changePassword(newPassword: String!, oldPassword: String!, personId: ID!)-------------------------------------- //
    describe('Testing changePassword(newPassword: String!, oldPassword: String!, personId: ID!)', () => {
      let context;
      beforeEach(async() => {
        await clearAndPopulateDB();
        context = { id: tabProducers[0].id, email: tabProducers[0].email, isAdmin: tabProducers[0].isAdmin, kind: tabProducers[0].kind };
      });

      const { mutation } = {
        mutation: `
        mutation($newPwd: String!, $oldPwd: String!, $personId: ID!) {
          changePassword(newPassword: $newPwd, oldPassword: $oldPwd, personId:$personId)
        }`
      };

      it('should change the password of the producer', async() => {
        let variables = {
          newPwd: 'abcd1234',
          oldPwd: '1234abcd',
          personId: tabProducers[0].id
        };
        let result = await graphql(schema, mutation, null, context, variables);

        expect(result.data.changePassword).to.be.true;
        snapshot(result);

        // on change le password pour revenir au password de départ
        variables = {
          oldPwd: 'abcd1234',
          newPwd: '1234abcd',
          personId: tabProducers[0].id
        };
        result = await graphql(schema, mutation, null, context, variables);
        expect(result.data.changePassword).to.be.true;
        snapshot(result);
      });

      it('should not change the password of the user because user is not logged in', async() => {
        const variables = {
          newPwd: 'abcd1234',
          oldPwd: '1234abcd',
          // on tente de modifier un autre membre que nous! -> Doit lever une erreur
          personId: tabUsers[0].id
        };
        const result = await graphql(schema, mutation, null, {}, variables);

        expect(result.errors).to.be.not.null;
        expect(result.errors[0].message).to.contains('Sorry, you need to be authenticated to do that.');
        snapshot(result);
      });


      it('should not change the password of the user because user try to modify another member', async() => {
        context = { id: tabUsers[0].id, email: tabUsers[0].email, isAdmin: tabUsers[0].isAdmin, kind: tabUsers[0].kind };
        const variables = {
          newPwd: 'abcd1234',
          oldPwd: '1234abcd',
          // on tente de modifier un autre membre que nous! -> Doit lever une erreur
          personId: tabProducers[0].id
        };
        const result = await graphql(schema, mutation, null, context, variables);

        expect(result.errors).to.be.not.null;
        expect(result.errors[0].message).to.contains('You can\'t modify information of another user than yourself!');
        snapshot(result);
      });

      it('should not change the password of the person because wrong old password', async() => {
        const variables = {
          newPwd: 'abcd1234',
          oldPwd: 'wrongOldPassword',
          personId: tabProducers[0].id
        };
        const result = await graphql(schema, mutation, null, context, variables);

        expect(result.errors).to.be.not.null;
        expect(result.errors[0].message).to.contains('The received oldPassword is not correct!');
        snapshot(result);
      });

      it('should not change the password of the person because empty old password', async() => {
        const variables = {
          newPwd: 'abcd1234',
          oldPwd: '',
          personId: tabProducers[0].id
        };
        const result = await graphql(schema, mutation, null, context, variables);

        expect(result.errors).to.be.not.null;
        expect(result.errors[0].message).to.contains('The received oldPassword is not correct!');
        snapshot(result);
      });

      it('should not change the password of the person because empty new password', async() => {
        const variables = {
          newPwd: '',
          oldPwd: '1234abcd',
          personId: tabProducers[0].id
        };
        const result = await graphql(schema, mutation, null, context, variables);

        expect(result.errors).to.be.not.null;
        expect(result.errors[0].message).to.contains('New password must be at least 6 characters long.');
        snapshot(result);
      });

      it('should not change the password of the person because new password is too short', async() => {
        const variables = {
          newPwd: '12ab',
          oldPwd: '1234abcd',
          personId: tabProducers[0].id
        };
        const result = await graphql(schema, mutation, null, context, variables);

        expect(result.errors).to.be.not.null;
        expect(result.errors[0].message).to.contains('New password must be at least 6 characters long.');
        snapshot(result);
      });

      it('should not change the password of the person because empty new password is too long', async() => {
        const variables = {
          newPwd: '12345123451234512345abcdeabcdea',
          oldPwd: '1234abcd',
          personId: tabProducers[0].id
        };
        const result = await graphql(schema, mutation, null, context, variables);

        expect(result.errors).to.be.not.null;
        expect(result.errors[0].message).to.contains('New password must be less than 30 characters long.');
        snapshot(result);
      });

      it('should not change the password of the person because new password must contain at least one number', async() => {
        const variables = {
          newPwd: 'abcdefgh',
          oldPwd: '1234abcd',
          personId: tabProducers[0].id
        };
        const result = await graphql(schema, mutation, null, context, variables);

        expect(result.errors).to.be.not.null;
        expect(result.errors[0].message).to.contains('New password must contain at least 1 number.');
        snapshot(result);
      });

      it('should not change the password of the person because new password must contain at least one letter', async() => {
        const variables = {
          newPwd: '1234561234',
          oldPwd: '1234abcd',
          personId: tabProducers[0].id
        };
        const result = await graphql(schema, mutation, null, context, variables);

        expect(result.errors).to.be.not.null;
        expect(result.errors[0].message).to.contains('New password must contain at least 1 letter.');
        snapshot(result);
      });
    });
  });
});
