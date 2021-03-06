const mongoose = require('mongoose');

const options = {
  toObject: { virtuals: true }
};

/**
 * Product Schema
 */
const ProductSchema = new mongoose.Schema(
  {
    description: {
      type: mongoose.Schema.Types.String,
      required: false
    },
    productTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'productType',
      required: true
    }
  }, options
);

/**
 * Vérifie l'existence du productTypeId entrés avant chaque save.
 * Lève une erreur s'il n'existe pas dans la base de données et annule l'enregistrement.
 */
ProductSchema.pre('save', async function(next) {
  try {
    const productTypeId = await ProductTypesModel.findById(this.productTypeId);

    if (!productTypeId) {
      throw new Error(`The given productTypeId (${this.productTypeId}) doesn’t exist in the database!`);
    }
    next();
  } catch (err) {
    next(err);
  }
});

/**
 * @typedef Product
 */
module.exports = mongoose.model('products', ProductSchema);
const ProductTypesModel = require('./productTypes.modelgql');
