const { isAuthenticatedAsProducerAndIsYourself } = require('./authorization.resolvers');
const salespointsServices = require('../services/salespoints.services');
const producersServices = require('../services/producers.services');

const salespointsResolvers = {
  Query: {
    salespoints: (parent, args, context) => salespointsServices.getSalespoints(),

    salespoint: (parent, args, context) => salespointsServices.getSalespointById(args.salespointId)
  },

  Mutation: {
    addSalespointToProducer: async(parent, args, context) => {
      await isAuthenticatedAsProducerAndIsYourself(context.id, args.producerId, context.kind);
      return producersServices.addSalespointToProducer(args.producerId, args.salespoint);
    },

    updateSalespoint: async(parent, args, context) => {
      await isAuthenticatedAsProducerAndIsYourself(context.id, args.producerId, context.kind);
      return salespointsServices.updateSalespoint(args.producerId, args.salespoint);
    },

    deleteSalespointToProducer: async(parent, args, context) => {
      await isAuthenticatedAsProducerAndIsYourself(context.id, args.producerId, context.kind);
      return producersServices.removeSalespointToProducer(args.producerId);
    }
  }
};
module.exports = salespointsResolvers;
