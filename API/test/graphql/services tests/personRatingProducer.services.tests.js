const producersService = require('../../../src/graphql/services/producers.services');
const personRatingProducerService = require('../../../src/graphql/services/personRatingProducer.services');
const clearDB = require('../clearDB');
const PersonRatingProducerModel = require('../../../src/graphql/models/personRatingProducer.modelgql');

let benoit = {
  firstname: 'Benoît',
  lastname: 'Schöpfli',
  email: 'benoit@paysan.ch',
  password: '1234abcd',
  image: 'Ceci est une image encodée en base64!',
  phoneNumber: '0761435196',
  description: 'Un chouet gaillard!',
  website: 'benoitpaysan.ch'
};

let antoine = {
  firstname: 'Antoine',
  lastname: 'Rochaille',
  email: 'antoine@paysan.ch',
  password: '1234abcd',
  image: 'Ceci est l\'image d\'un tueur encodée en base64!',
  phoneNumber: '0761435196',
  description: 'Un vrai payouz!'
};

let james = {
  firstname: 'James',
  lastname: 'Submith',
  email: 'james@paysan.ch',
  password: '1234abcd',
  image: 'Ceci est une image encodée en base64!',
  phoneNumber: '1234567123',
  description: 'Un vrai touriste!'
};

let ratingAntoine1 = {
  'rating': 1
};
let ratingAntoine2 = {
  'rating': 2
};
let ratingJames3 = {
  'rating': 3
};
let ratingJames4 = {
  'rating': 4
};
let ratingBenoit5 = {
  'rating': 5
};

let tabRatings = [];
let tabRatingsAboutAntoine = [];
let tabRatingsMadeByAntoine = [];

const clearAndPopulateDB = async() => {
  // ---------------------------------------- on supprime tout le contenu de la DB ----------------------------------------
  await clearDB();

  // ------------------------------------------- on ajoute le contenu de départ -------------------------------------------
  // on ajoute 3 producteurs
  benoit = (await producersService.addProducer(benoit)).toObject();
  antoine = (await producersService.addProducer(antoine)).toObject();
  james = (await producersService.addProducer(james)).toObject();

  ratingAntoine1 = {
    producerId: antoine.id,
    personId: benoit.id,
    rating: 1
  };

  ratingAntoine2 = {
    producerId: antoine.id,
    personId: james.id,
    rating: 2
  };

  ratingJames3 = {
    producerId: james.id,
    personId: benoit.id,
    rating: 3
  };

  ratingJames4 = {
    producerId: james.id,
    personId: antoine.id,
    rating: 4
  };

  ratingBenoit5 = {
    producerId: benoit.id,
    personId: antoine.id,
    rating: 5
  };

  // on ajoute les ratings
  ratingAntoine1 = (await personRatingProducerService.addPersonRatingProducer(ratingAntoine1)).toObject();
  ratingAntoine2 = (await personRatingProducerService.addPersonRatingProducer(ratingAntoine2)).toObject();

  ratingJames3 = (await personRatingProducerService.addPersonRatingProducer(ratingJames3)).toObject();
  ratingJames4 = (await personRatingProducerService.addPersonRatingProducer(ratingJames4)).toObject();

  ratingBenoit5 = (await personRatingProducerService.addPersonRatingProducer(ratingBenoit5)).toObject();

  tabRatings = [ratingAntoine1, ratingAntoine2, ratingJames3, ratingJames4, ratingBenoit5];

  tabRatingsAboutAntoine = [ratingAntoine1, ratingAntoine2];
  tabRatingsMadeByAntoine = [ratingJames4, ratingBenoit5];
};

describe('tests personRatingProducer services', () => {
  beforeEach(() => clearAndPopulateDB());

  describe('tests getAllRatingsAboutProducerWithId', () => {
    it('should get all ratings about producer with received id', async() => {
      // on récupère un tableau contenant tous les ratings concernant le producteur avec l'id passé en paramètre
      let allRatingsAboutAntoine = await personRatingProducerService.getAllRatingsAboutProducerWithId(antoine.id);

      // on transforme chaque personRatingProducer du tableau en un objet
      allRatingsAboutAntoine = allRatingsAboutAntoine.map(rating => rating.toObject());
      allRatingsAboutAntoine.should.be.an('array');
      allRatingsAboutAntoine.length.should.be.equal(2);
      // on test le contenu de chaque rating
      const promisesRatings = allRatingsAboutAntoine.map(async(rating, index) => {
        rating.should.be.not.null;
        rating.id.should.be.eql(tabRatingsAboutAntoine[index].id);
        rating.producerId.should.be.eql(tabRatingsAboutAntoine[index].producerId);
        rating.personId.should.be.eql(tabRatingsAboutAntoine[index].personId);
        rating.rating.should.be.equal(tabRatingsAboutAntoine[index].rating);
      });
      await Promise.all(promisesRatings);
    });

    it('should fail getting the rating about received producerId made by received personId because no producerId received', async() => {
      let ratings = await personRatingProducerService.getAllRatingsAboutProducerWithId(null);
      ratings.message.should.be.equal('Received personRatingProducer.producerId is invalid!');

      ratings = await personRatingProducerService.getAllRatingsAboutProducerWithId(undefined);
      ratings.message.should.be.equal('Received personRatingProducer.producerId is invalid!');
    });

    it('should fail getting the rating about received producerId made by received personId because invalid producerId received', async() => {
      const ratings = await personRatingProducerService.getAllRatingsAboutProducerWithId(benoit.id + benoit.id);
      ratings.message.should.be.equal('Received personRatingProducer.producerId is invalid!');
    });

    it('should get no rating about received producerId made by received personId because unknown producerId received', async() => {
      const ratings = await personRatingProducerService.getAllRatingsAboutProducerWithId('abcdefabcdefabcdefabcdef');
      ratings.length.should.be.equal(0);
    });
  });

  describe('tests getRatingAboutProducerIdMadeByPersonId', () => {
    beforeEach(() => clearAndPopulateDB());

    it('should get the rating about received producerId made by received personId', async() => {
      // on récupère le rating concernant le producteur avec l'id passé en 1er paramètre et fait par la personne avec l'id passé en 2ème paramètre
      const rating = await personRatingProducerService.getRatingAboutProducerIdMadeByPersonId(benoit.id, antoine.id);

      // on test le contenu du rating
      rating.should.be.not.null;
      rating.id.should.be.eql(ratingBenoit5.id);
      rating.producerId.should.be.eql(ratingBenoit5.producerId);
      rating.personId.should.be.eql(ratingBenoit5.personId);
      rating.rating.should.be.equal(ratingBenoit5.rating);
    });

    it('should fail getting the rating about received producerId made by received personId because no producerId received', async() => {
      let rating = await personRatingProducerService.getRatingAboutProducerIdMadeByPersonId(null, antoine.id);
      rating.message.should.be.equal('Received personRatingProducer.producerId is invalid!');

      rating = await personRatingProducerService.getRatingAboutProducerIdMadeByPersonId(undefined, antoine.id);
      rating.message.should.be.equal('Received personRatingProducer.producerId is invalid!');
    });

    it('should fail getting the rating about received producerId made by received personId because invalid producerId received', async() => {
      const rating = await personRatingProducerService.getRatingAboutProducerIdMadeByPersonId(benoit.id + benoit.id, antoine.id);
      rating.message.should.be.equal('Received personRatingProducer.producerId is invalid!');
    });

    it('should get no rating about received producerId made by received personId because unknown producerId received', async() => {
      const rating = await personRatingProducerService.getRatingAboutProducerIdMadeByPersonId('abcdefabcdefabcdefabcdef', antoine.id);
      expect(rating).to.be.null;
    });

    it('should fail getting the rating about received producerId made by received personId because no personId received', async() => {
      let rating = await personRatingProducerService.getRatingAboutProducerIdMadeByPersonId(benoit.id, null);
      rating.message.should.be.equal('Received personRatingProducer.personId is invalid!');

      rating = await personRatingProducerService.getRatingAboutProducerIdMadeByPersonId(benoit.id, undefined);
      rating.message.should.be.equal('Received personRatingProducer.personId is invalid!');
    });

    it('should fail getting the rating about received producerId made by received personId because invalid personId received', async() => {
      const rating = await personRatingProducerService.getRatingAboutProducerIdMadeByPersonId(benoit.id, antoine.id + antoine.id);
      rating.message.should.be.equal('Received personRatingProducer.personId is invalid!');
    });

    it('should get no rating about received producerId made by received personId because unknown personId received', async() => {
      const rating = await personRatingProducerService.getRatingAboutProducerIdMadeByPersonId(benoit.id, 'abcdefabcdefabcdefabcdef');
      expect(rating).to.be.null;
    });
  });

  describe('tests getAllRatingsMadeByPersonWithId', () => {
    it('should get all ratings made by person with received id', async() => {
      // on récupère un tableau contenant tous les ratings concernant le producteur avec l'id passé en paramètre
      let allRatingsMadeByAntoine = await personRatingProducerService.getAllRatingsMadeByPersonWithId(antoine.id);

      // on transforme chaque personRatingProducer du tableau en un objet
      allRatingsMadeByAntoine = allRatingsMadeByAntoine.map(rating => rating.toObject());
      allRatingsMadeByAntoine.should.be.an('array');
      allRatingsMadeByAntoine.length.should.be.equal(2);
      // on test le contenu de chaque rating
      const promisesRatings = allRatingsMadeByAntoine.map(async(rating, index) => {
        rating.should.be.not.null;
        rating.id.should.be.eql(tabRatingsMadeByAntoine[index].id);
        rating.producerId.should.be.eql(tabRatingsMadeByAntoine[index].producerId);
        rating.personId.should.be.eql(tabRatingsMadeByAntoine[index].personId);
        rating.rating.should.be.equal(tabRatingsMadeByAntoine[index].rating);
      });
      await Promise.all(promisesRatings);
    });

    it('should fail getting all the rating made by received personId because no personId received', async() => {
      let ratings = await personRatingProducerService.getAllRatingsMadeByPersonWithId(null);
      ratings.message.should.be.equal('Received personRatingProducer.personId is invalid!');

      ratings = await personRatingProducerService.getAllRatingsMadeByPersonWithId(undefined);
      ratings.message.should.be.equal('Received personRatingProducer.personId is invalid!');
    });

    it('should fail getting all the rating made by received personId because invalid personId received', async() => {
      const ratings = await personRatingProducerService.getAllRatingsMadeByPersonWithId(benoit.id + benoit.id);
      ratings.message.should.be.equal('Received personRatingProducer.personId is invalid!');
    });

    it('should return any rating made by received personId because unknown personId received', async() => {
      const ratings = await personRatingProducerService.getAllRatingsMadeByPersonWithId('abcdefabcdefabcdefabcdef');
      ratings.length.should.be.equal(0);
    });
  });

  describe('tests addPersonRatingProducer', () => {
    beforeEach(() => clearAndPopulateDB());

    it('should add a new rating about a producer made by a person', async() => {
      // on crée un nouveau rating qu'on va ajouter au producteur
      const newRating = {
        producerId: benoit.id,
        personId: james.id,
        rating: 3
      };

      // on check les valeurs du rating enregistré dans le producteur avant d'ajouter un nouveau rating
      let benoitProducer = (await producersService.getProducerById(benoit.id)).toObject();
      benoitProducer.rating.rating.should.be.equal(5);
      benoitProducer.rating.nbRatings.should.be.equal(1);

      // on ajoute le nouveau rating
      const addedRating = (await personRatingProducerService.addPersonRatingProducer(newRating)).toObject();
      // on check que les données ajoutées soient bien celles souhaitées
      addedRating.should.be.not.null;
      addedRating.id.should.be.not.null;
      addedRating.producerId.toString().should.be.eql(newRating.producerId);
      addedRating.personId.toString().should.be.eql(newRating.personId);
      addedRating.rating.should.be.equal(newRating.rating);

      // on check les valeurs du rating enregistré dans le producteur après avoir ajouté le nouveau rating
      benoitProducer = (await producersService.getProducerById(benoit.id)).toObject();
      // on check que ces valeurs aient bien été mises à jour
      benoitProducer.rating.rating.should.be.equal(4);
      benoitProducer.rating.nbRatings.should.be.equal(2);
    });

    it('should fail adding a new rating about a producer made by a person because this person already rate this producer', async() => {
      // on check les valeurs du rating enregistré dans le producteur avant d'ajouter un nouveau rating
      let benoitProducer = (await producersService.getProducerById(benoit.id)).toObject();
      benoitProducer.rating.rating.should.be.equal(5);
      benoitProducer.rating.nbRatings.should.be.equal(1);

      // on ajoute le rating ratingBenoit5 alors qu'il a déjà été ajouté -> retournera une erreur
      const addedRating = await personRatingProducerService.addPersonRatingProducer(ratingBenoit5);
      // on check que les données ajoutées soient bien celles souhaitées
      addedRating.should.be.not.null;
      addedRating.message.should.be.equal('This person has already rated this producer! You can\'t rate twice the same producer.');

      // on check que les valeurs du rating enregistré dans le producteur n'ont pas été modifiées pusique le rating n'a pas été ajouté
      benoitProducer = (await producersService.getProducerById(benoit.id)).toObject();
      benoitProducer.rating.rating.should.be.equal(5);
      benoitProducer.rating.nbRatings.should.be.equal(1);
    });

    it('should fail adding a new rating about a producer made by a person because received unknown producerId', async() => {
      // on met un producerId valide mais non présent dans la DB
      ratingBenoit5.producerId = 'abcdefabcdefabcdefabcdef';

      // on check les valeurs du rating enregistré dans le producteur avant d'ajouter un nouveau rating
      let benoitProducer = (await producersService.getProducerById(benoit.id)).toObject();
      benoitProducer.rating.rating.should.be.equal(5);
      benoitProducer.rating.nbRatings.should.be.equal(1);

      // on ajoute le rating ratingBenoit5 avec un producerId inconnu -> retournera une erreur
      const addedRating = await personRatingProducerService.addPersonRatingProducer(ratingBenoit5);
      // on check que les données ajoutées soient bien celles souhaitées
      addedRating.should.be.not.null;
      addedRating.message.should.be.equal('There is no producer with this id in database!');

      // on check que les valeurs du rating enregistré dans le producteur n'ont pas été modifiées pusique le rating n'a pas été ajouté
      benoitProducer = (await producersService.getProducerById(benoit.id)).toObject();
      benoitProducer.rating.rating.should.be.equal(5);
      benoitProducer.rating.nbRatings.should.be.equal(1);
    });

    it('should fail adding a new rating about a producer made by a person because received unknown personId', async() => {
      // on met un producerId valide mais non présent dans la DB
      ratingBenoit5.personId = 'abcdefabcdefabcdefabcdef';

      // on check les valeurs du rating enregistré dans le producteur avant d'ajouter un nouveau rating
      let benoitProducer = (await producersService.getProducerById(benoit.id)).toObject();
      benoitProducer.rating.rating.should.be.equal(5);
      benoitProducer.rating.nbRatings.should.be.equal(1);

      // on ajoute le rating ratingBenoit5 avec un personId inconnu -> retournera une erreur
      const addedRating = await personRatingProducerService.addPersonRatingProducer(ratingBenoit5);
      // on check que les données ajoutées soient bien celles souhaitées
      addedRating.should.be.not.null;
      addedRating.message.should.be.equal('There is no person with this id in database!');

      // on check que les valeurs du rating enregistré dans le producteur n'ont pas été modifiées pusique le rating n'a pas été ajouté
      benoitProducer = (await producersService.getProducerById(benoit.id)).toObject();
      benoitProducer.rating.rating.should.be.equal(5);
      benoitProducer.rating.nbRatings.should.be.equal(1);
    });

    it('should fail adding a new rating about a producer made by a person because rating < 1', async() => {
      // on met un producerId valide mais non présent dans la DB
      const newRating = {
        producerId: benoit.id,
        personId: james.id,
        rating: 0
      };

      // on check les valeurs du rating enregistré dans le producteur avant d'ajouter un nouveau rating
      let benoitProducer = (await producersService.getProducerById(benoit.id)).toObject();
      benoitProducer.rating.rating.should.be.equal(5);
      benoitProducer.rating.nbRatings.should.be.equal(1);

      // on ajoute le rating ratingBenoit5 avec un personId inconnu -> retournera une erreur
      try {
        // FIXME: PAUL: j'arive pas à faire marcher le expect().to.throw()...
        const addedRating = await personRatingProducerService.addPersonRatingProducer(newRating);
      } catch (error) {
        error.name.should.be.equal('ValidationError');
        error.message.should.be.equal('personRatingProducer validation failed: rating: Path `rating` (0) is less than minimum allowed value (1).');
      }

      // on check que les valeurs du rating enregistré dans le producteur n'ont pas été modifiées pusique le rating n'a pas été ajouté
      benoitProducer = (await producersService.getProducerById(benoit.id)).toObject();
      benoitProducer.rating.rating.should.be.equal(5);
      benoitProducer.rating.nbRatings.should.be.equal(1);
    });

    it('should fail adding a new rating about a producer made by a person because rating > 5', async() => {
      // on met un producerId valide mais non présent dans la DB
      const newRating = {
        producerId: benoit.id,
        personId: james.id,
        rating: 6
      };

      // on check les valeurs du rating enregistré dans le producteur avant d'ajouter un nouveau rating
      let benoitProducer = (await producersService.getProducerById(benoit.id)).toObject();
      benoitProducer.rating.rating.should.be.equal(5);
      benoitProducer.rating.nbRatings.should.be.equal(1);

      // on ajoute le rating ratingBenoit5 avec un personId inconnu -> retournera une erreur
      try {
        // FIXME: PAUL: j'arive pas à faire marcher le expect().to.throw()...
        const addedRating = await personRatingProducerService.addPersonRatingProducer(newRating);
      } catch (error) {
        error.name.should.be.equal('ValidationError');
        error.message.should.be.equal('personRatingProducer validation failed: rating: Path `rating` (6) is more than maximum allowed value (5).');
      }

      // on check que les valeurs du rating enregistré dans le producteur n'ont pas été modifiées pusique le rating n'a pas été ajouté
      benoitProducer = (await producersService.getProducerById(benoit.id)).toObject();
      benoitProducer.rating.rating.should.be.equal(5);
      benoitProducer.rating.nbRatings.should.be.equal(1);
    });


    it('should fail adding a new rating about a producer made by a person because rating is not an integer', async() => {
      // on met un producerId valide mais non présent dans la DB
      const newRating = {
        producerId: benoit.id,
        personId: james.id,
        rating: 3.5
      };

      // on check les valeurs du rating enregistré dans le producteur avant d'ajouter un nouveau rating
      let benoitProducer = (await producersService.getProducerById(benoit.id)).toObject();
      benoitProducer.rating.rating.should.be.equal(5);
      benoitProducer.rating.nbRatings.should.be.equal(1);

      // on ajoute le rating ratingBenoit5 avec un personId inconnu -> retournera une erreur
      try {
        // FIXME: PAUL: j'arive pas à faire marcher le expect().to.throw()...
        const addedRating = await personRatingProducerService.addPersonRatingProducer(newRating);
      } catch (error) {
        error.name.should.be.equal('ValidationError');
        error.message.should.be.equal('personRatingProducer validation failed: rating: 3.5 is not an integer value');
      }

      // on check que les valeurs du rating enregistré dans le producteur n'ont pas été modifiées pusique le rating n'a pas été ajouté
      benoitProducer = (await producersService.getProducerById(benoit.id)).toObject();
      benoitProducer.rating.rating.should.be.equal(5);
      benoitProducer.rating.nbRatings.should.be.equal(1);
    });
  });

  describe('tests updateProducerRating', () => {
    beforeEach(() => clearAndPopulateDB());

    it('should update a personProducerRating', async() => {
      ratingAntoine1.rating = 4;
      const rating = (await personRatingProducerService.updatePersonRatingProducer(ratingAntoine1)).toObject();
      rating.should.be.not.null;
      rating.id.should.be.eql(ratingAntoine1.id);
      rating.producerId.should.be.eql(ratingAntoine1.producerId);
      rating.personId.should.be.eql(ratingAntoine1.personId);
      rating.rating.should.be.equal(ratingAntoine1.rating);

      // on check que les valeurs du rating enregistré dans le producteur n'ont pas été modifiées pusique le rating n'a pas été ajouté
      const AntoineProducer = (await producersService.getProducerById(antoine.id)).toObject();
      AntoineProducer.rating.rating.should.be.equal(3);
      AntoineProducer.rating.nbRatings.should.be.equal(2);
    });

    it('should fail updating a rating because new rating < 1', async() => {
      // on met un producerId valide mais non présent dans la DB
      const newRating = {
        producerId: benoit.id,
        personId: james.id,
        rating: 0
      };

      // on check les valeurs du rating enregistré dans le producteur avant d'ajouter un nouveau rating
      let benoitProducer = (await producersService.getProducerById(benoit.id)).toObject();
      benoitProducer.rating.rating.should.be.equal(5);
      benoitProducer.rating.nbRatings.should.be.equal(1);

      // on ajoute le rating ratingBenoit5 avec un personId inconnu -> retournera une erreur
      try {
        // FIXME: PAUL: j'arive pas à faire marcher le expect().to.throw()...
        const addedRating = await personRatingProducerService.updatePersonRatingProducer(newRating);
      } catch (error) {
        error.name.should.be.equal('ValidationError');
        error.message.should.be.equal('personRatingProducer validation failed: rating: Path `rating` (0) is less than minimum allowed value (1).');
      }

      // on check que les valeurs du rating enregistré dans le producteur n'ont pas été modifiées pusique le rating n'a pas été ajouté
      benoitProducer = (await producersService.getProducerById(benoit.id)).toObject();
      benoitProducer.rating.rating.should.be.equal(5);
      benoitProducer.rating.nbRatings.should.be.equal(1);
    });

    it('should fail updating a rating because rating > 5', async() => {
      // on met un producerId valide mais non présent dans la DB
      const newRating = {
        producerId: benoit.id,
        personId: james.id,
        rating: 6
      };

      // on check les valeurs du rating enregistré dans le producteur avant d'ajouter un nouveau rating
      let benoitProducer = (await producersService.getProducerById(benoit.id)).toObject();
      benoitProducer.rating.rating.should.be.equal(5);
      benoitProducer.rating.nbRatings.should.be.equal(1);

      // on ajoute le rating ratingBenoit5 avec un personId inconnu -> retournera une erreur
      try {
        // FIXME: PAUL: j'arive pas à faire marcher le expect().to.throw()...
        const addedRating = await personRatingProducerService.updatePersonRatingProducer(newRating);
      } catch (error) {
        error.name.should.be.equal('ValidationError');
        error.message.should.be.equal('personRatingProducer validation failed: rating: Path `rating` (6) is more than maximum allowed value (5).');
      }

      // on check que les valeurs du rating enregistré dans le producteur n'ont pas été modifiées pusique le rating n'a pas été ajouté
      benoitProducer = (await producersService.getProducerById(benoit.id)).toObject();
      benoitProducer.rating.rating.should.be.equal(5);
      benoitProducer.rating.nbRatings.should.be.equal(1);
    });

    it('should fail updating a rating because rating is not an integer', async() => {
      // on met un producerId valide mais non présent dans la DB
      const newRating = {
        producerId: benoit.id,
        personId: james.id,
        rating: 3.5
      };

      // on check les valeurs du rating enregistré dans le producteur avant d'ajouter un nouveau rating
      let benoitProducer = (await producersService.getProducerById(benoit.id)).toObject();
      benoitProducer.rating.rating.should.be.equal(5);
      benoitProducer.rating.nbRatings.should.be.equal(1);

      // on ajoute le rating ratingBenoit5 avec un personId inconnu -> retournera une erreur
      try {
        // FIXME: PAUL: j'arive pas à faire marcher le expect().to.throw()...
        const addedRating = await personRatingProducerService.updatePersonRatingProducer(newRating);
      } catch (error) {
        error.name.should.be.equal('ValidationError');
        error.message.should.be.equal('personRatingProducer validation failed: rating: 3.5 is not an integer value');
      }

      // on check que les valeurs du rating enregistré dans le producteur n'ont pas été modifiées pusique le rating n'a pas été ajouté
      benoitProducer = (await producersService.getProducerById(benoit.id)).toObject();
      benoitProducer.rating.rating.should.be.equal(5);
      benoitProducer.rating.nbRatings.should.be.equal(1);
    });
  });

  describe('tests deleteSalesPoint', () => {
    beforeEach(() => clearAndPopulateDB());

    it('should delete a personRatingProducer', async() => {
      // on check les valeurs du rating enregistré dans le producteur avant de supprimer un rating
      let antoineProducer = (await producersService.getProducerById(antoine.id)).toObject();
      antoineProducer.rating.rating.should.be.equal(1.5);
      antoineProducer.rating.nbRatings.should.be.equal(2);

      // on supprime un rating
      let deletedRating = (await personRatingProducerService.deletePersonRatingProducer(ratingAntoine1.id)).toObject();
      // on test le contenu du rating supprimé
      deletedRating.should.be.not.null;
      deletedRating.id.should.be.eql(ratingAntoine1.id);
      deletedRating.producerId.should.be.eql(ratingAntoine1.producerId);
      deletedRating.personId.should.be.eql(ratingAntoine1.personId);
      deletedRating.rating.should.be.equal(ratingAntoine1.rating);

      // on check que les valeurs du rating enregistré dans le producteur ont bien été mises à jour
      antoineProducer = (await producersService.getProducerById(antoine.id)).toObject();
      antoineProducer.rating.rating.should.be.equal(2);
      antoineProducer.rating.nbRatings.should.be.equal(1);

      deletedRating = await personRatingProducerService.deletePersonRatingProducer(ratingAntoine1.id);
      expect(deletedRating).to.be.null;
    });

    it('should delete the last personRatingProducer about a producer', async() => {
      // on check les valeurs du rating enregistré dans le producteur avant de supprimer un rating
      let benoitProducer = (await producersService.getProducerById(benoit.id)).toObject();
      benoitProducer.rating.rating.should.be.equal(5);
      benoitProducer.rating.nbRatings.should.be.equal(1);

      // on supprime un rating
      let deletedRating = (await personRatingProducerService.deletePersonRatingProducer(ratingBenoit5.id)).toObject();
      // on test le contenu du rating supprimé
      deletedRating.should.be.not.null;
      deletedRating.id.should.be.eql(ratingBenoit5.id);
      deletedRating.producerId.should.be.eql(ratingBenoit5.producerId);
      deletedRating.personId.should.be.eql(ratingBenoit5.personId);
      deletedRating.rating.should.be.equal(ratingBenoit5.rating);

      // on check que les valeurs du rating enregistré dans le producteur ont bien été mises à jour
      benoitProducer = (await producersService.getProducerById(benoit.id)).toObject();
      expect(benoitProducer.rating).to.be.null;

      deletedRating = await personRatingProducerService.deletePersonRatingProducer(ratingBenoit5.id);
      expect(deletedRating).to.be.null;
    });
  });
});
