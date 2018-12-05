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
    await ProductTypeCategoryModel.deleteMany();

    // on ajoute le contenu de départ
    category = await ProductTypeCategoryModel.create(category);
    pomme = {
      name: pomme.name,
      image: pomme.image,
      category: category.id
    };
    const addedPomme = await ProductTypeModel.create(pomme);
    pomme.id = addedPomme.id;
    pomme.category = { id: category.id };


    poire = {
      name: poire.name,
      image: poire.image,
      category: category.id
    };
    const addedPoire = await ProductTypeModel.create(poire);
    poire.id = addedPoire.id;
    poire.category = { id: category.id };

    raisin = {
      name: raisin.name,
      image: raisin.image,
      category: category.id
    };
    const addedRaisin = await ProductTypeModel.create(raisin);
    raisin.id = addedRaisin.id;
    raisin.category = { id: category.id };

    courgette = {
      name: courgette.name,
      image: courgette.image,
      category: category.id
    };
    const addedCourgette = await ProductTypeModel.create(courgette);
    courgette.id = addedCourgette.id;
    courgette.category = { id: category.id };
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
    const addedProductType = await productTypeService.addProductType(pomme);

    addedProductType.should.be.an('object');
    addedProductType.should.be.not.null;
    addedProductType._id.should.be.not.null;

    addedProductType.name.should.be.equal(pomme.name);
    addedProductType.image.should.be.equal(pomme.image);
  });

  describe('tests updateProductType', () => {
    it('should update a productType', async() => {
      let addedProductType = await productTypeService.addProductType(pomme);
      addedProductType = {
        id: addedProductType.id,
        name: poire.name,
        image: poire.image,
        category: { id: category.id },
        producers: []
      };
      const updatedProductType = await productTypeService.updateProductType(addedProductType);

      updatedProductType.should.be.an('object');
      updatedProductType.should.be.not.null;
      updatedProductType.id.should.be.not.null;
      updatedProductType.name.should.be.equal(poire.name);
      updatedProductType.image.should.be.equal(poire.image);
    });

    it('should fail updating a productType because no id received', async() => {
      const addedProductType = {
        ...poire,
        id: ''
      };
      const updatedProductType = await productTypeService.updateProductType(addedProductType);

      updatedProductType.message.should.be.equal('Received productType.id is invalid!');
    });

    it('should fail updating a productType because invalid id received', async() => {
      const addedProductType = {
        ...poire,
        id: '5c04561e7209e21e582750' // id trop court (<24 caractères)
      };
      const updatedProductType = await productTypeService.updateProductType(addedProductType);

      updatedProductType.message.should.be.equal('Received productType.id is invalid!');
    });

    it('should fail updating a productType because invalid id received', async() => {
      const addedProductType = {
        ...poire,
        id: '5c04561e7209e21e582750a35c04561e7209e21e582750a35c04561e7209e21e582750a3' // id trop long (> 24 caractères)
      };
      const updatedProductType = await productTypeService.updateProductType(addedProductType);

      updatedProductType.message.should.be.equal('Received productType.id is invalid!');
    });
  });

  it('should delete a productType', async() => {
    const addedProductType = await productTypeService.addProductType(pomme);

    addedProductType.should.be.an('object');
    addedProductType.should.be.not.null;
    addedProductType._id.should.be.not.null;

    addedProductType.name.should.be.equal(pomme.name);
    addedProductType.image.should.be.equal(pomme.image);

    let deleteProductType = await productTypeService.deleteProductType(addedProductType);

    deleteProductType.should.be.not.null;

    deleteProductType = await productTypeService.getProductTypeById(deleteProductType);
    it.should.be.null = deleteProductType; // Fixme: Ca marche de faire ça ??
  });
});
