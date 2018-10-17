const mongoose = require('mongoose');
require('../models/products.model');

const Products = mongoose.model('products');

/**
 * Retourne "limit" produits de la base de données, fitlrés
 * selon les tags "tags" reçus à partir de la page "page". Sans
 * paramètres, retourne tous les produits de la base de
 * données.
 *
 * @param {Array} tags, Tags à utiliser pour filtrer les résultats. Séparer plusieurs tags à l'aide de ",".
 * @param {Integer} limit, Nombre maximum de produits à retourner.
 * @param {Integer} page, Numéro de la page à retourner. Permet par exemple de récupérer la "page"ème page de "limit" produits. Par exemple, si
 *   "limit" vaut 20 et "page" vaut 3, on récupère la 3ème page de 20 produits, soit les produits 41 à 60.
 */
function getProducts ({ tags = undefined, limit = 50, page = 0 } = {}) {
  const skip = page * limit;
  return Products.find({ tags }).sort({ id: -1 }).skip(+skip).limit(+limit)
    .exec();
}

/**
 * Ajoute un nouveau produit dans la base de données.
 * Attention, doublons autorisés!
 *
 * @param {Integer} bodyContent, Les informations du produit à ajouter.
 */
function addProduct (bodyContent) {
  return new Products(bodyContent).save();
}

/**
 * Retourne le produit correspondant à l'id reçu.
 *
 * @param {Integer} id, L'id du produit à récupérer.
 */
function getProductById ({ id }) {
  return Products.findById(id).exec();
}

/**
 * Met à jour le produit possédant l'id reçu avec les données
 * reçues. Remplace toutes les données du produit dans la base
 * de données par celles reçues!
 *
 * @param {Integer} productInfos, Les informations du produit à mettre à jour.
 */
function updateProduct (productInfos) {
  // return Products.findOneAndUpdate(productInfos); // retourne l'objet modifié
   return Products.updateOne(productInfos); // retourne un OK mais pas l'objet modifié
}

/**
 * Supprime le produit correspondant à l'id reçu.
 */
function deleteProduct ({ id }) {
  return Products.findByIdAndRemove(id);
}

module.exports = {
  getProducts,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct
};
