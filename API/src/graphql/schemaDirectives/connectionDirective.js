const { defaultFieldResolver } = require('graphql');
const { connectionArgs, connectionFromArray } = require('graphql-relay');
const { SchemaDirectiveVisitor } = require('apollo-server-express');

class ConnectionDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    // get original resolver
    const { resolve = defaultFieldResolver } = field;

    // add connections arguments
    field.args.push({ name: 'after', type: connectionArgs.after.type });
    field.args.push({ name: 'before', type: connectionArgs.before.type });
    field.args.push({ name: 'first', type: connectionArgs.first.type });
    field.args.push({ name: 'last', type: connectionArgs.last.type });

    // wrap resolver
    field.resolve = async function(...args) {
      const results = await resolve.apply(this, args);

      if (args[1] == null || (args[1].first == null && args[1].last == null)) {
        args[1].first = 5;
      }

      return connectionFromArray(results, args[1]);
    };
  }
}

module.exports = ConnectionDirective;
