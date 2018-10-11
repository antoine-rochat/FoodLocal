const httpStatus = require('http-status');
const salespointsModel = require('../models/salespoints');


/**
 * Retourne tous les points de vente de la base de données.
 */
function getSalesPoints(req, res, next) {
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
  //   status: httpStatus.INTERNAL_SERVER_ERROR, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  /**
   * @param {Object} req
   * @param {Array} req .tags Tags à utiliser pour filtrer les résultats.
   * @param {Integer} req .limit Nombre maximum de points de vente à retourner.
   * @param {Integer} req .page Numéro de la page à retourner. Permet par exemple de récupérer la 3ème page de 20 points de ventes, soit les points de vente 41 à 60.
   */
  const requestOptions = {
                      };

                       return salespointsModel.getSalesPoints(requestOptions )
                      .then((result) => {
                          res.status(result.status || httpStatus.OK).send(result.data);
                          })
                       .catch(err =>
                                res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                                                                                    status: httpStatus.INTERNAL_SERVER_ERROR,
                                                                                    title: 'Server error',
                                                                                    error: err.message
                                                                                  }));

}


/**
 * Crée un nouveau point de vente dans la base de données. 
 * Doublons autorisés!
 */
function addSalesPoints(req, res, next) {
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
  //   status: httpStatus.INTERNAL_SERVER_ERROR, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  /**
   * @param {Object} req
   */
  const requestOptions = {
                      };

                       return salespointsModel.addSalesPoints(requestOptions )
                      .then((result) => {
                          res.status(result.status || httpStatus.OK).send(result.data);
                          })
                       .catch(err =>
                                res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                                                                                    status: httpStatus.INTERNAL_SERVER_ERROR,
                                                                                    title: 'Server error',
                                                                                    error: err.message
                                                                                  }));

}


/**
 * Retourne le point de vente correspondant à l'id reçu.
 */
function getSalesPointById(req, res, next) {
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
  //   status: httpStatus.INTERNAL_SERVER_ERROR, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  /**
   * @param {Object} req
   * @param {Integer} req .id L&#x27;id du point de vente à récupérer.
   */
  const requestOptions = {
                      };

                       return salespointsModel.getSalesPointById(requestOptions )
                      .then((result) => {
                          res.status(result.status || httpStatus.OK).send(result.data);
                          })
                       .catch(err =>
                                res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                                                                                    status: httpStatus.INTERNAL_SERVER_ERROR,
                                                                                    title: 'Server error',
                                                                                    error: err.message
                                                                                  }));

}


/**
 * Met à jour le point de vente possédant l'id reçu avec les 
 * données reçues.
 */
function updateSalesPoint(req, res, next) {
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
  //   status: httpStatus.INTERNAL_SERVER_ERROR, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  /**
   * @param {Object} req
   * @param {Integer} req .id l&#x27;id du point de vente à mettre à jour.
   */
  const requestOptions = {
                      };

                       return salespointsModel.updateSalesPoint(requestOptions )
                      .then((result) => {
                          res.status(result.status || httpStatus.OK).send(result.data);
                          })
                       .catch(err =>
                                res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                                                                                    status: httpStatus.INTERNAL_SERVER_ERROR,
                                                                                    title: 'Server error',
                                                                                    error: err.message
                                                                                  }));

}


/**
 * Supprime le point de vente correspondant à l'id reçu.
 */
function deleteSalesPoint(req, res, next) {
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
  //   status: httpStatus.INTERNAL_SERVER_ERROR, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  /**
   * @param {Object} req
   * @param {Integer} req .id L&#x27;id du point de vente à supprimer.
   */
  const requestOptions = {
                      };

                       return salespointsModel.deleteSalesPoint(requestOptions )
                      .then((result) => {
                          res.status(result.status || httpStatus.OK).send(result.data);
                          })
                       .catch(err =>
                                res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                                                                                    status: httpStatus.INTERNAL_SERVER_ERROR,
                                                                                    title: 'Server error',
                                                                                    error: err.message
                                                                                  }));

}


  module.exports = {
  getSalesPoints,
  addSalesPoints,
  getSalesPointById,
  updateSalesPoint,
  deleteSalesPoint,
        };
