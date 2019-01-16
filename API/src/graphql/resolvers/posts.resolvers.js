const { isAuthenticatedAsProducerAndIsYourself } = require('./authorization.resolvers');
const postsServices = require('../services/posts.services');
const producersServices = require('../services/producers.services');

const postsResolvers = {
  Query: {
    postsOfProducer: (parent, args, context) => postsServices.getAllPostsOfProducer(args.producerId, args)
  },

  Mutation: {
    addPostOfProducer: async(parent, args, context) => {
      await isAuthenticatedAsProducerAndIsYourself(context.id, args.post.producerId, context.kind);
      return postsServices.addPostOfProducer(args.post);
    },

    deletePostOfProducer: async(parent, args, context) => {
      await isAuthenticatedAsProducerAndIsYourself(context.id, args.producerId, context.kind);
      return postsServices.deletePostOfProducer(args.postId);
    }
  },

  Post: {
    producer: (parent, args, context) => producersServices.getProducerById(parent.producerId),
  },

  PostConnection: {
    totalCount: (parent, args, context) => {
      const producerId = parent.edges[0] != null ? parent.edges[0].node.producerId : null;
      return postsServices.countNbPostsOfProducerInDB(producerId);
    }
  }
};

module.exports = postsResolvers;
