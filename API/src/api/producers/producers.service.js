/**
 * @param {Object} options
 * @param {Array} options.tags Tags à utiliser pour filtrer les résultats.
 * @param {Integer} options.limit Nombre maximum de producteurs à retourner.
 * @param {Integer} options.page Numéro de la page à retourner. Permet par
 *   exemple de récupérer la 3ème page de 20 producteurs, soit les producteurs
 *   41 à 60.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getProducer = async (options) => {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new Error({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  //return res.json(req.user);

  return {
    status: 200,
    data: 'getProducer ok!'
  };
};

/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
module.exports.addProducer = async (options) => {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new Error({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data  : 'addProducer ok!'
  };
};

/**
 * @param {Object} options
 * @param {Integer} options.id L&#x27;id du producteur à récupérer.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getProducerById = async (options) => {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new Error({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data  : 'getProducerById ok!'
  };
};

/**
 * @param {Object} options
 * @param {Integer} options.id l&#x27;id du producteur à mettre à jour.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.updateProducer = async (options) => {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new Error({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data  : 'updateProducer ok!'
  };
};

/**
 * @param {Object} options
 * @param {Integer} options.id L&#x27;id du producteur à supprimer.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.deleteProducer = async (options) => {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new Error({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data  : 'deleteProducer ok!'
  };
};
