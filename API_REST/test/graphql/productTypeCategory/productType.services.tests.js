require('../../chai-config');
const mongoose = require('mongoose');

const productTypeService = require('../../../src/graphql/services/productType.services');
const { ProductType: ProductTypeModel, ProductTypeCategory: ProductTypeCategoryModel } = require('../../../src/graphql/models/products.modelgql');

let category = {
  name: 'Fruits',
  image: 'ceci est une image de fruits encodée en base64!'
};

let pomme = {
  name: 'Pomme',
  image: 'ceci est une image de pomme encodée en base64!'
};
let poire = {
  name: 'Poire',
  image: 'ceci est une image de poire encodée en base64!'
};
let raisin = {
  name: 'Raisin',
  image: 'ceci est une image de raisin encodée en base64!'
};
let courgette = {
  name: 'Courgette',
  image: 'ceci est une image de courgette encodée en base64!'
};

describe('tests productType services', () => {
  beforeEach(async() => {
    // on supprime tout le contenu de la DB
    await ProductTypeModel.deleteMany();
    // on ajoute le contenu de départ
    category = await ProductTypeCategoryModel.create(category);
    pomme = {
      name: pomme.name,
      image: pomme.image,
      category: category.id
    };
    pomme = await ProductTypeModel.create(pomme);

    poire = {
      name: poire.name,
      image: poire.image,
      category: category.id
    };
    poire = await ProductTypeModel.create(poire);

    raisin = {
      name: raisin.name,
      image: raisin.image,
      category: category.id
    };
    raisin = await ProductTypeModel.create(raisin);

    courgette = {
      name: courgette.name,
      image: courgette.image,
      category: category.id
    };
    courgette = await ProductTypeModel.create(courgette);
  });

  it('should get all productType', async() => {
    const allProductType = await productTypeService.getProductTypes();

    allProductType.should.be.an('array');
    allProductType.length.should.be.equal(4);

    allProductType.map((productType) => {
      productType.should.be.not.null;
      productType.id.should.be.not.null;
      productType.name.should.be.not.null;
      productType.image.should.be.not.null;
      productType.category.should.be.not.null;
      productType.category.id.should.be.not.null;
    });
  });

  describe('tests getProductTypeById', () => {
    it('should get one productType', async() => {
      let productTypeGotInDB = await productTypeService.getProductTypeById(pomme);

      productTypeGotInDB.should.be.an('object');
      productTypeGotInDB.should.be.not.null;
      productTypeGotInDB._id.should.be.not.null;

      productTypeGotInDB.name.should.be.equal(pomme.name);
      productTypeGotInDB.image.should.be.equal(pomme.image);
      productTypeGotInDB.category.id.should.be.eql(new mongoose.Types.ObjectId(category.id).id);
      productTypeGotInDB = await productTypeService.getProductTypeById(raisin);

      productTypeGotInDB.should.be.an('object');
      productTypeGotInDB.should.be.not.null;
      productTypeGotInDB._id.should.be.not.null;
      productTypeGotInDB.name.should.be.equal(raisin.name);

      productTypeGotInDB.image.should.be.equal(raisin.image);
      productTypeGotInDB.category.id.should.be.eql(new mongoose.Types.ObjectId(category.id).id);
    });

    it('should fail getting one productType because no id received', async() => {
      const productTypeGotInDB = await productTypeService.getProductTypeById({ id: '' });
      productTypeGotInDB.message.should.be.equal('Received productType.id is invalid!');
    });
  });

  it('should add a new productType', async() => {
    const addedProductTypeCategory = await productTypeService.addProductType(pomme);

    addedProductTypeCategory.should.be.an('object');
    addedProductTypeCategory.should.be.not.null;
    addedProductTypeCategory._id.should.be.not.null;

    addedProductTypeCategory.name.should.be.equal(pomme.name);
    addedProductTypeCategory.image.should.be.equal(pomme.image);
  });

  describe('tests updateProductType', () => {
    it('should update a productType', async() => {
      let addedProductType = await productTypeService.addProductType(pomme);
      addedProductType = {
        id: addedProductType.id,
        name: poire.name,
        image: poire.image,
        category: { id: category.id }
      };
      const updatedProductTypeCategory = await productTypeService.updateProductType(addedProductType);

      updatedProductTypeCategory.should.be.an('object');
      updatedProductTypeCategory.should.be.not.null;
      updatedProductTypeCategory.id.should.be.not.null;
      updatedProductTypeCategory.name.should.be.equal(poire.name);
      updatedProductTypeCategory.image.should.be.equal(poire.image);
    });

    it('should fail updating a productType because no id received', async() => {
      const addedProductTypeCategory = {
        id: '',
        ...poire
      };
      const updatedProductTypeCategory = await productTypeService.updateProductType(addedProductTypeCategory);

      updatedProductTypeCategory.message.should.be.equal('Received productType.id is invalid!');
    });

    it('should fail updating a productType because invalid id received', async() => {
      const addedProductTypeCategory = {
        id: '5c04561e7209e21e582750', // id trop court (<24 caractères)
        ...poire
      };
      const updatedProductTypeCategory = await productTypeService.updateProductType(addedProductTypeCategory);

      updatedProductTypeCategory.message.should.be.equal('Received productType.id is invalid!');
    });

    it('should fail updating a productType because invalid id received', async() => {
      const addedProductTypeCategory = {
        id: '5c04561e7209e21e582750a35c04561e7209e21e582750a35c04561e7209e21e582750a3', // id trop long (> 24 caractères)
        ...poire
      };
      const updatedProductTypeCategory = await productTypeService.updateProductType(addedProductTypeCategory);

      updatedProductTypeCategory.message.should.be.equal('Received productType.id is invalid!');
    });
  });

  it('should delete a productType', async() => {
    const addedProductTypeCategory = await productTypeService.addProductType(pomme);

    addedProductTypeCategory.should.be.an('object');
    addedProductTypeCategory.should.be.not.null;
    addedProductTypeCategory._id.should.be.not.null;

    addedProductTypeCategory.name.should.be.equal(pomme.name);
    addedProductTypeCategory.image.should.be.equal(pomme.image);

    let deleteProductTypeCategory = await productTypeService.deleteProductType(addedProductTypeCategory);

    deleteProductTypeCategory.should.be.not.null;

    deleteProductTypeCategory = await productTypeService.getProductTypeById(deleteProductTypeCategory);
    it.should.be.null = deleteProductTypeCategory; // Fixme: Ca marche de faire ça ??
  });
});
