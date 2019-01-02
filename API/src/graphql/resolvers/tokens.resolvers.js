const { isAuthenticatedAsAdmin } = require('./authorization.resolvers');
const tokenValidationEmailServices = require('../services/tokenValidationEmail.services');
const connectionTokenServices = require('../services/connectionToken.services');
const personsServices = require('../services/persons.services');

const producerResolvers = {
  Query: {
    emailValidationTokens: async(parent, args, context) => {
      await isAuthenticatedAsAdmin(context.id, context.isAdmin);
      return tokenValidationEmailServices.getTokenValidationEmails();
    }
  },

  Mutation: {
    validateAnEmailToken: (parent, args, context) => personsServices.validateEmailUserByToken(args.emailValidationToken),

    askNewEmailToken: (parent, args, context) => tokenValidationEmailServices.addTokenValidationEmail(args.idPerson),

    login: (parent, args, context) => connectionTokenServices.login(args.email, args.password),

    signUpAsUser: (parent, args, context) => connectionTokenServices.signUpAsUser(args.newUser),

    signUpAsProducer: (parent, args, context) => connectionTokenServices.signUpAsProducer(args.newProducer),
  },

  ConnectionToken: {
    token: (parent, args, context) => parent
}
};
module.exports = producerResolvers;
