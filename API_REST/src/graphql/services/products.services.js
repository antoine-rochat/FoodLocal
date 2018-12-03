const { Products } = require('../models/products.modelgql');

const ProductTypeServices = require('./productType.services');

/**
 * Retourne "limit" produits de la base de données, fitlrés
 * selon les tags "tags" reçus à partir de la page "page". Sans
 * paramètres, retourne tous les produits de la base de
 * données.
 *
 * @param {Array} tags, Tags à utiliser pour filtrer les résultats.
 * @param {Integer} limit, Nombre maximum de produits à retourner.
 * @param {Integer} page, Numéro de la page à retourner. Permet par exemple de récupérer la "page"ème page de "limit" produits. Par exemple, si
 *   "limit" vaut 20 et "page" vaut 3, on récupère la 3ème page de 20 produits, soit les produits 41 à 60.
 */
function getProducts({ tags = undefined, limit = 50, page = 0 } = {}) {
  let skip;
  if (page !== 0) {
    skip = page * limit;
  }

  return Products.find({ tags })
    .sort({ _id: 1 })
    .skip(+skip)
    .limit(+limit)
    .exec();
}

function getAllProductsInReceivedIdList(listOfIdToGet) {
  return Products.find({ _id: { $in: listOfIdToGet } });
}

/**
 * Ajoute un nouveau produit dans la base de données.
 * Attention, doublons autorisés!
 *
 * @param {Integer} product, Les informations du produit à ajouter.
 */
async function addProduct(product) {
  const newProduct = {
    description: product.description,
    productType: product.productType.id
  };

  return new Products(newProduct).save();
}

async function addAllProductsInArray(productsArray) {
  const promises = [];
  productsArray.map(product => promises.push(addProduct(product)));
  const resolvedPromises = await Promise.all(promises);
  return resolvedPromises.map(res => res.id);
}

/**
 * Retourne le produit correspondant à l'id reçu.
 *
 * @param {Integer} id, L'id du produit à récupérer.
 */
function getProductById({ id }) {
  return Products.findById(id)
    .exec();
}

/**
 * Met à jour le produit possédant l'id reçu avec les données
 * reçues. Remplace toutes les données du produit dans la base
 * de données par celles reçues!
 * Ne modifie pas les informations du productType (car elles ne peuvent pas être modifiées par un producteur!)
 *
 * @param product, Les informations du produit à mettre à jour.
 */
async function updateProduct(product) {
  const updatedProduct = {
    ...product,
    productType: product.productType.id
  };

  return Products.findByIdAndUpdate(product.id, updatedProduct, { new: true }); // retourne l'objet modifié
  // return Products.updateOne(product); // retourne un OK mais pas l'objet modifié
}

/**
 * Supprime le produit correspondant à l'id reçu. Ne supprime pas le type du produit ni sa catégorie.
 *
 * @param product, Les informations du produit à supprimer.
 */
function deleteProduct(product) {
  return Products.findByIdAndRemove(product.id);
}

module.exports = {
  getProducts,
  getAllProductsInReceivedIdList,
  addAllProductsInArray,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct
};
