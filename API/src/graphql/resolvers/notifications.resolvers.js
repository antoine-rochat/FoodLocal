const { withFilter } = require('graphql-subscriptions');
const { isAuthenticatedAndIsYourself } = require('./authorization.resolvers');
const notificationsServices = require('../services/notifications.services');
const personNotificationsServices = require('../services/personNotifications.services');
const personsServices = require('../services/persons.services');
const producersServices = require('../services/producers.services');
const pubSub = require('../utils/pubSub');

const notificationsResolvers = {
  Query: {
    notificationsOfPerson: async(parent, args, context) => {
      await isAuthenticatedAndIsYourself(context.id, args.personId);
      return personNotificationsServices.getAllNotificationsOfPerson(args.personId);
    }
  },

  Mutation: {
    setNotificationAsSeen: async(parent, args, context) => {
      await isAuthenticatedAndIsYourself(context.id, args.personId);
      return personNotificationsServices.setPersonNotificationAsSeen(args.personNotificationId);
    }
  },

  Subscription: {
    newNotificationReceived: {
      subscribe: withFilter(
        () => pubSub.asyncIterator('NEW_NOTIFICATION'),
        (payload, variables, context) => payload.notification.personId === context.id
      )
    }
  },

  PersonNotification: {
    person: (parent, args, context) => personsServices.getPersonById(parent.person),

    notification: (parent, args, context) => notificationsServices.getNotificationById(parent.notification)
  },

  Notification: {
    producer: (parent, args, context) => producersServices.getProducerById(parent.producer)
  },

  PersonNotificationConnection: {
    totalCount: (parent, args, context) => personNotificationsServices.countNbNotificationsOfPerson()
  }
};

module.exports = notificationsResolvers;