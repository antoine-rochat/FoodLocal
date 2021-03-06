module.exports = {
  getProductTypeCategories,
  getProductTypeCategoryById,
  countNbProductTypeCategoriesInDB,
  addProductTypeCategory,
  updateProductTypeCategory,
  deleteProductTypeCategory
};

const mongoose = require('mongoose');
const ProductTypeCategoriesModel = require('../models/productTypeCategories.modelgql');

/**
 * Retourne "limit" catégories de produits de la base de données, filtrés
 * selon les tags "tags" reçus à partir de la page "page". Sans
 * paramètres, retourne toutes les catégories de produits de la base de
 * données.
 *
 * @param {Array} tags, Tags à utiliser pour filtrer les résultats.
 * @param {Integer} limit, Nombre maximum de catégories de produits à retourner.
 * @param {Integer} page, Numéro de la page à retourner. Permet par exemple de récupérer la "page"ème page de "limit" catégories de produits. Par exemple, si
 *   "limit" vaut 20 et "page" vaut 3, on récupère la 3ème page de 20 catégories de produits, soit les catégories de produits 41 à 60.
 */
function getProductTypeCategories({ tags = undefined } = {}) {
  // FIXME: Il faut ajouter la pagination entre la DB et le serveur !!!
  return ProductTypeCategoriesModel.find(tags)
    .sort({ _id: 1 });
}

/**
 * Retourne la catégorie de produits correspondante à l'id reçu.
 *
 * @param id, un objet contenant l'id de la catégorie de produits à récupérer dans un champ nommé 'id'.
 */
function getProductTypeCategoryById(id) {
  return ProductTypeCategoriesModel.findById(id);
}

function countNbProductTypeCategoriesInDB() {
  return ProductTypeCategoriesModel.countDocuments();
}

/**
 * Ajoute une nouvelle catégorie de produits dans la base de données.
 * Attention, doublons autorisés!
 *
 * @param productTypeCategory, Les informations de la catégorie de produits à ajouter.
 */
function addProductTypeCategory(productTypeCategory) {
  return new ProductTypeCategoriesModel(productTypeCategory).save();
}

/**
 * Met à jour la catégorie de produits possédant l'id reçu avec les données
 * reçues. Remplace toutes les données de la catégorie de produits dans la base
 * de données par celles reçues!
 *
 * @param {Integer} productTypeCategory, Les informations de la catégorie de produits à mettre à jour.
 */
function updateProductTypeCategory(productTypeCategory) {
  return ProductTypeCategoriesModel.findByIdAndUpdate(productTypeCategory.id, productTypeCategory, { new: true, runValidators: true });
  // retourne l'objet modifié
}

/**
 * Supprime la catégorie de produits correspondante à l'id reçu.
 *
 * @param {Integer} id, L'id de la catégorie de produits à supprimer.
 */
function deleteProductTypeCategory(id) {
  return ProductTypeCategoriesModel.findByIdAndRemove(id);
}
